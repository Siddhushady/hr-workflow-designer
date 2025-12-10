// src/store/useWorkflowStore.ts
import { create } from "zustand";
import { nanoid } from "nanoid";
import type {
  WorkflowNode,
  WorkflowEdge,
  WorkflowNodeType,
  WorkflowGraph,
} from "../core/types/workflow";
import { produce } from "immer";


interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;

  setGraph: (graph: WorkflowGraph) => void;

  addNode: (type: WorkflowNodeType, position: { x: number; y: number }) => void;
  updateNodeData: (id: string, data: any) => void;
  updateNodePosition: (id: string, position: { x: number; y: number }) => void;
  deleteNode: (id: string) => void;

  setEdges: (edges: WorkflowEdge[]) => void;
  addEdge: (edge: WorkflowEdge) => void;
  deleteEdge: (id: string) => void;

  selectNode: (id: string | null) => void;

  toGraph: () => WorkflowGraph;
}

const defaultDataForType = (type: WorkflowNodeType): any => {
  switch (type) {
    case "start":
      return {
        label: "Start",
        metadata: {},
      };
    case "task":
      return {
        label: "Task",
        description: "",
        assignee: "",
        dueDate: "",
        customFields: {},
      };
    case "approval":
      return {
        label: "Approval",
        approverRole: "Manager",
        autoApproveThreshold: 0,
      };
    case "automation":
      return {
        label: "Automation",
        actionId: "",
        params: {},
      };
    case "end":
      return {
        label: "End",
        endMessage: "Workflow completed",
        summaryEnabled: true,
      };
    default:
      return { label: "Node" };
  }
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  setGraph: (graph) =>
    set({
      nodes: graph.nodes,
      edges: graph.edges,
    }),

  addNode: (type, position) =>
    set(
      produce((state: WorkflowState) => {
        const id = nanoid(8);
        state.nodes.push({
          id,
          type,
          position,
          data: defaultDataForType(type),
        });
        state.selectedNodeId = id;
      })
    ),

  updateNodeData: (id, data) =>
    set(
      produce((state: WorkflowState) => {
        const node = state.nodes.find((n) => n.id === id);
        if (node) {
          node.data = { ...node.data, ...data };
        }
      })
    ),

  updateNodePosition: (id, position) =>
    set(
      produce((state: WorkflowState) => {
        const node = state.nodes.find((n) => n.id === id);
        if (node) {
          node.position = position;
        }
      })
    ),

  deleteNode: (id) =>
    set(
      produce((state: WorkflowState) => {
        state.nodes = state.nodes.filter((n) => n.id !== id);
        state.edges = state.edges.filter(
          (e) => e.source !== id && e.target !== id
        );
        if (state.selectedNodeId === id) {
          state.selectedNodeId = null;
        }
      })
    ),

  setEdges: (edges) => set({ edges }),

  addEdge: (edge) =>
    set(
      produce((state: WorkflowState) => {
        state.edges.push(edge);
      })
    ),

  deleteEdge: (id) =>
    set(
      produce((state: WorkflowState) => {
        state.edges = state.edges.filter((e) => e.id !== id);
      })
    ),

  selectNode: (id) => set({ selectedNodeId: id }),

  toGraph: () => {
    const { nodes, edges } = get();
    return { nodes, edges };
  },
}));
