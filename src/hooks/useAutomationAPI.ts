import { useState, useEffect, useCallback } from "react";
import { api } from "../api/client";
import type { AutomationDefinition } from "../core/types/automation";

export function useAutomationAPI() {
  const [actions, setActions] = useState<AutomationDefinition[]>([]);
  const [loading, setLoading] = useState(false);

  const loadActions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getAutomations();
      setActions(res);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActions();
  }, [loadActions]);

  return { actions, loadActions, loading };
}
