// src/core/types/workflow.ts
export type WorkflowNodeType =
  | "start"
  | "task"
  | "approval"
  | "automation"
  | "end";

export interface BaseNodeData {
  label: string;
}

export interface StartNodeData extends BaseNodeData {
  metadata: Record<string, string>;
}

export interface TaskNodeData extends BaseNodeData {
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields?: Record<string, string>;
}

export interface ApprovalNodeData extends BaseNodeData {
  approverRole: string;
  autoApproveThreshold?: number;
}

export interface AutomationNodeData extends BaseNodeData {
  actionId?: string;
  params: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  endMessage: string;
  summaryEnabled: boolean;
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomationNodeData
  | EndNodeData;

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  position: { x: number; y: number };
  data: WorkflowNodeData;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export interface WorkflowGraph {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}
