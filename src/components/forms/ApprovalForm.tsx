import React from "react";
import type { WorkflowNode, ApprovalNodeData } from "../../core/types/workflow";
import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useThemeStore } from "../../store/useThemeStore";

interface ApprovalFormProps {
  node: WorkflowNode;
}

export const ApprovalForm: React.FC<ApprovalFormProps> = ({ node }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const theme = useThemeStore((s) => s.theme);
  const data = node.data as ApprovalNodeData;

  const handleChange = (field: keyof ApprovalNodeData, value: any) => {
    updateNodeData(node.id, { [field]: value });
  };

  return (
    <form className="space-y-4">
      <div>
        <label className={`text-xs font-semibold mb-1 block ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}>Title</label>
        <input
          value={data.label ?? ""}
          onChange={(e) => handleChange("label", e.target.value)}
          className={`w-full rounded-md px-2 py-1 border text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
            theme === "light"
              ? "bg-slate-100 border-slate-300 text-slate-900"
              : "bg-slate-900 border-slate-700 text-slate-100"
          }`}
        />
      </div>

      <div>
        <label className={`text-xs font-semibold mb-1 block ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}>Approver Role</label>
        <input
          value={data.approverRole ?? "Manager"}
          onChange={(e) => handleChange("approverRole", e.target.value)}
          className={`w-full rounded-md px-2 py-1 border text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
            theme === "light"
              ? "bg-slate-100 border-slate-300 text-slate-900"
              : "bg-slate-900 border-slate-700 text-slate-100"
          }`}
        />
      </div>

      <div>
        <label className={`text-xs font-semibold mb-1 block ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}>Auto-Approve Threshold (optional)</label>
        <input
          type="number"
          value={data.autoApproveThreshold ?? 0}
          onChange={(e) => handleChange("autoApproveThreshold", parseInt(e.target.value, 10) || 0)}
          className={`w-full rounded-md px-2 py-1 border text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
            theme === "light"
              ? "bg-slate-100 border-slate-300 text-slate-900"
              : "bg-slate-900 border-slate-700 text-slate-100"
          }`}
        />
      </div>
    </form>
  );
};
