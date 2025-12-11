// src/components/layout/Sidebar.tsx
import React from "react";
import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useThemeStore } from "../../store/useThemeStore";
import type { WorkflowNodeType } from "../../core/types/workflow";

const NODE_TYPES: { type: WorkflowNodeType; label: string; description: string }[] = [
  { type: "start", label: "Start", description: "Entry point for the workflow" },
  { type: "task", label: "Task", description: "Human task step" },
  { type: "approval", label: "Approval", description: "Manager/HR approval node" },
  { type: "automation", label: "Automation", description: "System-triggered step" },
  { type: "end", label: "End", description: "Marks the completion" },
];

export const Sidebar: React.FC = () => {
  const addNode = useWorkflowStore((state) => state.addNode);
  const theme = useThemeStore((state) => state.theme);

  const handleAddNode = (type: WorkflowNodeType) => {
    // default position; user can drag later
    addNode(type, { x: 100 + Math.random() * 150, y: 100 + Math.random() * 150 });
  };

  return (
    <div className="h-full flex flex-col">
      <div
        className={`px-4 py-3 border-b-2 transition-colors ${
          theme === "light"
            ? "border-slate-300 text-slate-900 bg-white"
            : "border-slate-800 text-slate-200"
        }`}
      >
        <h2 className="text-sm font-semibold">Node Palette</h2>
        <p
          className={`text-xs mt-1 ${
            theme === "light" ? "text-slate-600" : "text-slate-400"
          }`}
        >
          Click a node type to add it to the canvas.
        </p>
      </div>
      <div className={`flex-1 overflow-y-auto px-3 py-3 space-y-2 transition-colors ${
          theme === "light"
            ? "bg-slate-50"
            : "bg-slate-900"
        }`}>
        {NODE_TYPES.map((node) => (
          <button
            key={node.type}
            onClick={() => handleAddNode(node.type)}
            className={`w-full text-left px-3 py-2 rounded-xl border transition flex flex-col ${
              theme === "light"
                ? "border-slate-300 bg-slate-200 hover:bg-slate-300 text-slate-900"
                : "border-slate-700 bg-slate-900/80 hover:bg-slate-800/90 text-slate-100"
            }`}
          >
            <span className="text-xs font-semibold">{node.label}</span>
            <span
              className={`text-[11px] ${
                theme === "light" ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {node.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
