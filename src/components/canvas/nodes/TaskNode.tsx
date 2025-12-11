// src/components/canvas/nodes/TaskNode.tsx
import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";


export const CustomTaskNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="w-56 h-32 px-4 py-3 rounded-lg border border-indigo-500 bg-indigo-900/30 shadow-md text-xs text-slate-100 flex flex-col justify-between">
      <div>
        <div className="font-semibold text-sm uppercase tracking-wider">Task</div>
        <div className="mt-2 text-xs font-medium line-clamp-1">
          {data.label ?? "Task"}
        </div>
        {data.assignee && (
          <div className="text-[10px] text-slate-400 mt-1">
            Assignee: {data.assignee}
          </div>
        )}
        {data.description && (
          <div className="text-[10px] text-slate-300 mt-1 line-clamp-1">
            {data.description}
          </div>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 bg-indigo-300 border border-indigo-900"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 bg-indigo-300 border border-indigo-900"
      />
    </div>
  );
};
