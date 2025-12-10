import React from "react";
import type { WorkflowNode, EndNodeData } from "../../core/types/workflow";
import { useWorkflowStore } from "../../store/useWorkflowStore";

interface EndFormProps {
  node: WorkflowNode;
}

export const EndForm: React.FC<EndFormProps> = ({ node }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const data = node.data as EndNodeData;

  const handleChange = (field: keyof EndNodeData, value: any) => {
    updateNodeData(node.id, { [field]: value });
  };

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
        <input
          value={data.label ?? ""}
          onChange={(e) => handleChange("label", e.target.value)}
          className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Completion Message</label>
        <textarea
          value={data.endMessage ?? ""}
          onChange={(e) => handleChange("endMessage", e.target.value)}
          rows={3}
          className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={data.summaryEnabled ?? true}
          onChange={(e) => handleChange("summaryEnabled", e.target.checked)}
          className="scale-90"
        />
        <label className="text-xs text-slate-300">Display summary after completion</label>
      </div>
    </form>
  );
};
