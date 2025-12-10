// src/api/mock/handler.ts
import { http, HttpResponse } from "msw";
import type { AutomationDefinition } from "../../core/types/automation";
import type {
  SimulationRequest,
  SimulationResult,
  SimulationStepLog,
} from "../../core/types/simulation";
import type { WorkflowNode } from "../../core/types/workflow";

const automations: AutomationDefinition[] = [
  { id: "send_email", label: "Send Email", params: ["to", "subject"] },
  {
    id: "generate_doc",
    label: "Generate Document",
    params: ["template", "recipient"],
  },
];

function simulateWorkflow(payload: SimulationRequest): SimulationResult {
  const { workflow } = payload;
  const logs: SimulationStepLog[] = [];
  const errors: string[] = [];

  if (!workflow.nodes.length) {
    return {
      valid: false,
      errors: ["Workflow contains no nodes"],
      logs: [],
    };
  }

  const startNodes = workflow.nodes.filter((n) => n.type === "start");
  const endNodes = workflow.nodes.filter((n) => n.type === "end");

  if (startNodes.length === 0) {
    errors.push("No Start node found");
  } else if (startNodes.length > 1) {
    errors.push("Multiple Start nodes found (only one allowed)");
  }

  if (endNodes.length === 0) {
    errors.push("No End node found");
  }

  if (errors.length) {
    return {
      valid: false,
      errors,
      logs: [],
    };
  }

  const start = startNodes[0];
  let current: WorkflowNode | undefined = start;
  const visited = new Set<string>();
  let stepIndex = 0;

  while (current) {
    if (visited.has(current.id)) {
      errors.push(
        `Cycle detected at node "${current.data.label}" (${current.id})`
      );
      break;
    }

    visited.add(current.id);

    logs.push({
      stepIndex,
      nodeId: current.id,
      nodeLabel: (current.data as any).label ?? "Node",
      nodeType: current.type,
      message: `Executing ${current.type} node`,
    });

    if (current.type === "end") {
      break;
    }

    const edge = workflow.edges.find((e) => e.source === current?.id);
    if (!edge) {
      errors.push(
        `Node "${(current.data as any).label}" has no outgoing edge but is not an End node`
      );
      break;
    }

    const nextNode = workflow.nodes.find((n) => n.id === edge?.target);
    if (!nextNode) {
      errors.push(`Edge points to missing node with id ${edge.target}`);
      break;
    }

    current = nextNode;
    stepIndex++;
  }

  return {
    valid: errors.length === 0,
    errors,
    logs,
  };
}

export const handlers = [
  http.get("/automations", () => {
    return HttpResponse.json(automations);
  }),

  http.post("/simulate", async ({ request }) => {
    const body = (await request.json()) as SimulationRequest;
    const result = simulateWorkflow(body);
    return HttpResponse.json(result);
  }),
];
