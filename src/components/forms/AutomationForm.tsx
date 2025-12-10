// src/components/forms/AutomationForm.tsx
import React, { useEffect } from "react";
import type { WorkflowNode, AutomationNodeData } from "../../core/types/workflow";
import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useAutomationAPI } from "../../hooks/useAutomationAPI";
import type { AutomationDefinition } from "../../core/types/automation";

interface AutomationFormProps {
  node: WorkflowNode;
}

export const AutomationForm: React.FC<AutomationFormProps> = ({ node }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const { actions, loadActions } = useAutomationAPI();
  const data = node.data as AutomationNodeData;

  useEffect(() => {
    loadActions();
  }, [loadActions]);

  const handleChange = (field: keyof AutomationNodeData, value: any) => {
    updateNodeData(node.id, { [field]: value });
  };

  const handleParamChange = (paramName: string, value: string) => {
    const updatedParams = {
      ...data.params,
      [paramName]: value,
    };
    handleChange("params", updatedParams);
  };

  const selectedAction: AutomationDefinition | undefined = actions.find(
    (a: AutomationDefinition) => a.id === data.actionId
  );

  return (
    <form className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-slate-300 mb-1 block">
          Title
        </label>
        <input
          value={data.label ?? ""}
          onChange={(e) => handleChange("label", e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-300 mb-1 block">
          Automation Action
        </label>
        <select
          value={data.actionId ?? ""}
          onChange={(e) => handleChange("actionId", e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="">-- Select Action --</option>
          {actions.map((a: AutomationDefinition) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </select>
      </div>

      {selectedAction && (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">
            Parameters
          </label>
          {selectedAction.params.map((param: string) => (
            <div key={param}>
              <label className="text-[11px] text-slate-400">{param}</label>
              <input
                value={(data.params?.[param] as string) ?? ""}
                onChange={(e) => handleParamChange(param, e.target.value)}
                className="w-full text-xs bg-slate-900 border border-slate-700 px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          ))}
        </div>
      )}
    </form>
  );
};
