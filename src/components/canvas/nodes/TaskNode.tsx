// src/components/canvas/nodes/TaskNode.tsx
import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";


export const CustomTaskNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="px-3 py-2 rounded-2xl border border-accent bg-accentSoft shadow-md text-xs text-slate-100 max-w-xs">
      <div className="flex justify-between items-center gap-2">
        <span className="font-semibold text-[11px] uppercase tracking-wide">
          TASK
        </span>
        {data.assignee && (
          <span className="text-[10px] text-slate-300 truncate">
            👤 {data.assignee}
          </span>
        )}
      </div>
      <div className="mt-1 text-xs font-medium truncate">
        {data.label ?? "Task"}
      </div>
      {data.description && (
        <div className="mt-1 text-[11px] text-slate-300 line-clamp-2">
          {data.description}
        </div>
      )}
      {data.dueDate && (
        <div className="mt-1 text-[10px] text-slate-400">
          ⏰ Due: {data.dueDate}
        </div>
      )}
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 bg-slate-200 border-2 border-slate-900"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 bg-slate-200 border-2 border-slate-900"
      />
    </div>
  );
};
