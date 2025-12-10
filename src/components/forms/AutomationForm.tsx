// src/components/forms/AutomationForm.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { WorkflowNode } from "../../core/types/workflow.ts";
import { useWorkflowStore } from "../../store/useWorkflowStore.ts";
import { useAutomationAPI } from "../../hooks/useAutomationAPI.ts";
import type { AutomationDefinition } from "../../core/types/automation.ts";

interface AutomationFormProps {
  node: WorkflowNode;
}

interface AutomationFormValues {
  label: string;
  actionId: string;
  params: Record<string, string>;
}

export const AutomationForm: React.FC<AutomationFormProps> = ({ node }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const { actions, loadActions } = useAutomationAPI();

  const { register, watch, handleSubmit } = useForm<AutomationFormValues>({
    defaultValues: {
      label: (node.data as any).label ?? "Automation Step",
      actionId: (node.data as any).actionId ?? "",
      params: (node.data as any).params ?? {},
    },
  });

  useEffect(() => {
    loadActions();
  }, [loadActions]);

  const selectedActionId = watch("actionId");
  const selectedAction: AutomationDefinition | undefined = actions.find(
    (a: AutomationDefinition) => a.id === selectedActionId
  );

  const onSubmit = (values: AutomationFormValues) => {
    updateNodeData(node.id, values);
  };

  return (
    <form
      onBlur={handleSubmit(onSubmit)}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
      className="space-y-4"
    >
      <div>
        <label className="text-xs font-semibold text-slate-300 mb-1 block">
          Title
        </label>
        <input
          {...register("label")}
          className="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded-md text-xs"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-300 mb-1 block">
          Automation Action
        </label>
        <select
          {...register("actionId")}
          className="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded-md text-xs"
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
                className="w-full text-xs bg-slate-900 border border-slate-700 px-2 py-1 rounded-md"
                {...register(`params.${param}` as const)}
              />
            </div>
          ))}
        </div>
      )}
    </form>
  );
};
