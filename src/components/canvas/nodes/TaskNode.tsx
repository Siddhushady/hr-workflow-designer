// src/components/canvas/nodes/TaskNode.tsx
import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import { useThemeStore } from "../../../store/useThemeStore";

export const CustomTaskNode: React.FC<NodeProps> = ({ data }) => {
  const theme = useThemeStore((s: any) => s.theme);
  return (
    <div className={`w-48 h-24 px-3 py-2 rounded-lg border shadow-md text-xs flex flex-col items-center justify-center ${
      theme === "light"
        ? "border-blue-700 bg-blue-600 text-blue-100"
        : "border-indigo-500 bg-indigo-900/30 text-slate-100"
    }`}>
      <div className="text-center">
        <div className="font-semibold text-sm uppercase tracking-wider">Task</div>
        <div className="mt-1 text-xs font-medium line-clamp-1">
          {data.label ?? "Task"}
        </div>
        {data.assignee && (
          <div className="text-[9px] text-slate-400 mt-0.5">
            {data.assignee}
          </div>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 bg-blue-400 border border-blue-950"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 bg-blue-400 border border-blue-950"
      />
    </div>
  );
};
