import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";


export const CustomEndNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="w-56 h-32 px-4 py-3 rounded-lg border border-purple-500 bg-purple-900/30 shadow-md text-xs text-purple-50 flex flex-col justify-between">
      <div>
        <div className="font-semibold text-sm uppercase tracking-wider">End</div>
        <div className="mt-2 font-medium text-xs line-clamp-1">
          {data.label ?? "End"}
        </div>
        <div className="text-[10px] text-purple-200 mt-1 line-clamp-2">
          {data.endMessage ?? "Workflow Complete"}
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-purple-300 border border-purple-900" />
    </div>
  );
};
