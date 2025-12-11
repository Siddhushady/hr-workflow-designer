// src/components/canvas/nodes/StartNode.tsx
import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";


export const CustomStartNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="w-56 h-32 px-4 py-3 rounded-lg border border-emerald-500 bg-emerald-900/30 shadow-md text-xs text-emerald-50 flex flex-col justify-between">
      <div>
        <div className="font-semibold text-sm uppercase tracking-wider">Start</div>
        <div className="text-xs mt-2 line-clamp-2">{data.label ?? "Start"}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 bg-emerald-400 border border-emerald-900"
      />
    </div>
  );
};
