import React from "react";
import type { WorkflowNode, ApprovalNodeData } from "../../core/types/workflow";
import { useWorkflowStore } from "../../store/useWorkflowStore";

interface ApprovalFormProps {
  node: WorkflowNode;
}

export const ApprovalForm: React.FC<ApprovalFormProps> = ({ node }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const data = node.data as ApprovalNodeData;

  const handleChange = (field: keyof ApprovalNodeData, value: any) => {
    updateNodeData(node.id, { [field]: value });
  };

  return (
    <form className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-slate-300 mb-1 block">Title</label>
        <input
          value={data.label ?? ""}
          onChange={(e) => handleChange("label", e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-300 mb-1 block">Approver Role</label>
        <input
          value={data.approverRole ?? "Manager"}
          onChange={(e) => handleChange("approverRole", e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-300 mb-1 block">Auto-Approve Threshold (optional)</label>
        <input
          type="number"
          value={data.autoApproveThreshold ?? 0}
          onChange={(e) => handleChange("autoApproveThreshold", parseInt(e.target.value, 10) || 0)}
          className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>
    </form>
  );
};
