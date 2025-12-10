import { useState } from "react";
import { api } from "../api/client";
import type { AutomationDefinition } from "../core/types/automation";

export function useAutomationAPI() {
  const [actions, setActions] = useState<AutomationDefinition[]>([]);

  async function loadActions() {
    const res = await api.getAutomations();
    setActions(res);
  }

  return { actions, loadActions };
}
