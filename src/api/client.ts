// src/api/client.ts
import type { AutomationDefinition } from "../core/types/automation";
import type { SimulationRequest, SimulationResult } from "../core/types/simulation";

export const api = {
  async getAutomations(): Promise<AutomationDefinition[]> {
    const res = await fetch("/automations");
    if (!res.ok) throw new Error("Failed to fetch automations");
    return res.json();
  },

  async simulateWorkflow(payload: SimulationRequest): Promise<SimulationResult> {
    const res = await fetch("/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to simulate workflow");
    return res.json();
  },
};
