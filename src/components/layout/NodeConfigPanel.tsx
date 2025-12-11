// src/components/layout/NodeConfigPanel.tsx
import React from "react";
import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useThemeStore } from "../../store/useThemeStore";
import type { WorkflowNode } from "../../core/types/workflow";
import { StartForm } from "../forms/StartForm";
import { TaskForm } from "../forms/TaskForm";
import { ApprovalForm } from "../forms/ApprovalForm";
import { AutomationForm } from "../forms/AutomationForm";
import { EndForm } from "../forms/EndForm";

export const NodeConfigPanel: React.FC = () => {
  const nodes = useWorkflowStore((state) => state.nodes);
  const selectedNodeId = useWorkflowStore((state) => state.selectedNodeId);
  const theme = useThemeStore((state) => state.theme);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) as
    | WorkflowNode
    | undefined;

  const renderForm = () => {
    if (!selectedNode) {
      return (
        <div
          className={`text-xs ${
            theme === "light" ? "text-slate-600" : "text-slate-400"
          }`}
        >
          Select a node on the canvas to configure its properties.
        </div>
      );
    }

    switch (selectedNode.type) {
      case "start":
        return <StartForm node={selectedNode} />;
      case "task":
        return <TaskForm node={selectedNode} />;
      case "approval":
        return <ApprovalForm node={selectedNode} />;
      case "automation":
        return <AutomationForm node={selectedNode} />;
      case "end":
        return <EndForm node={selectedNode} />;
      default:
        return <div>Unsupported node type</div>;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div
        className={`px-4 py-3 border-b-2 transition-colors ${
          theme === "light"
            ? "border-slate-300 bg-white text-slate-900"
            : "border-slate-700 bg-slate-950 text-slate-200"
        }`}
      >
        <h2 className="text-sm font-semibold">Node Details</h2>
        {selectedNode && (
          <p
            className={`text-xs mt-1 ${
              theme === "light" ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Editing <span className="font-mono">{selectedNode.type}</span> node{" "}
            <span className="font-mono text-sky-400">#{selectedNode.id}</span>
          </p>
        )}
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {renderForm()}
      </div>
    </div>
  );
};
