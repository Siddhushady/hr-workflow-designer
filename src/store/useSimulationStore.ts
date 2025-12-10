// src/store/useSimulationStore.ts
import { create } from "zustand";
import type { SimulationResult, SimulationStatus } from "../core/types/simulation";

interface SimulationState {
  status: SimulationStatus;
  result: SimulationResult | null;
  lastError?: string;

  setStatus: (status: SimulationStatus) => void;
  setResult: (result: SimulationResult | null) => void;
  setError: (error?: string) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  status: "idle",
  result: null,
  lastError: undefined,

  setStatus: (status) => set({ status }),
  setResult: (result) => set({ result }),
  setError: (error) => set({ lastError: error }),
}));
