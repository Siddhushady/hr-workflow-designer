// src/core/types/simulation.ts
import type { WorkflowGraph } from "./workflow";

export type SimulationStatus = "idle" | "running" | "success" | "error";

export interface SimulationStepLog {
  stepIndex: number;
  nodeId: string;
  nodeLabel: string;
  nodeType: string;
  message: string;
}

export interface SimulationResult {
  valid: boolean;
  errors: string[];
  logs: SimulationStepLog[];
}

export interface SimulationRequest {
  workflow: WorkflowGraph;
}
