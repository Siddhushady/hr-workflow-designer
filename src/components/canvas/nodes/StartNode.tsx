// src/components/canvas/nodes/StartNode.tsx
import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";


export const CustomStartNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="px-3 py-2 rounded-2xl border border-emerald-500/60 bg-emerald-900/40 shadow-md text-xs text-emerald-50">
      <div className="font-semibold text-[11px] uppercase tracking-wide">
        START
      </div>
      <div className="text-xs mt-1">{data.label ?? "Start"}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 bg-emerald-400 border-2 border-emerald-900"
      />
    </div>
  );
};
