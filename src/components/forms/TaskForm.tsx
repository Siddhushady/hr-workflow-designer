// src/components/forms/TaskForm.tsx
import React from "react";
import type { WorkflowNode, TaskNodeData } from "../../core/types/workflow";
import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useThemeStore } from "../../store/useThemeStore";

interface TaskFormProps {
  node: WorkflowNode;
}

export const TaskForm: React.FC<TaskFormProps> = ({ node }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const theme = useThemeStore((s) => s.theme);
  const data = node.data as TaskNodeData;

  const handleChange = (field: keyof TaskNodeData, value: any) => {
    updateNodeData(node.id, { [field]: value });
  };

  return (
    <form className="space-y-3">
      <div>
        <label className={`block text-xs font-semibold mb-1 ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}>
          Title
        </label>
        <input
          value={data.label ?? ""}
          onChange={(e) => handleChange("label", e.target.value)}
          className={`w-full px-2 py-1 rounded-md border text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
            theme === "light"
              ? "bg-slate-100 border-slate-300 text-slate-900"
              : "bg-slate-900 border-slate-700 text-slate-100"
          }`}
        />
      </div>
      <div>
        <label className={`block text-xs font-semibold mb-1 ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}>
          Description
        </label>
        <textarea
          value={data.description ?? ""}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
          className={`w-full px-2 py-1 rounded-md border text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
            theme === "light"
              ? "bg-slate-100 border-slate-300 text-slate-900"
              : "bg-slate-900 border-slate-700 text-slate-100"
          }`}
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className={`block text-xs font-semibold mb-1 ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}>
            Assignee
          </label>
          <input
            value={data.assignee ?? ""}
            onChange={(e) => handleChange("assignee", e.target.value)}
            className={`w-full px-2 py-1 rounded-md border text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
              theme === "light"
                ? "bg-slate-100 border-slate-300 text-slate-900"
                : "bg-slate-900 border-slate-700 text-slate-100"
            }`}
          />
        </div>
        <div className="flex-1">
          <label className={`block text-xs font-semibold mb-1 ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}>
            Due date
          </label>
          <input
            type="date"
            value={data.dueDate ?? ""}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            className={`w-full px-2 py-1 rounded-md border text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
              theme === "light"
                ? "bg-slate-100 border-slate-300 text-slate-900"
                : "bg-slate-900 border-slate-700 text-slate-100"
            }`}
          />
        </div>
      </div>
    </form>
  );
};
