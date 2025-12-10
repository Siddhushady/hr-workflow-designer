import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";


export const CustomEndNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="px-3 py-2 rounded-2xl border border-purple-400/60 bg-purple-900/40 shadow-md text-xs text-purple-50 w-44">

      <div className="font-semibold text-[11px] uppercase tracking-wide flex items-center">
        🔚 End
      </div>

      <div className="mt-1 font-medium truncate text-xs">
        {data.label ?? "End Node"}
      </div>

      <div className="text-[10px] text-purple-200 mt-1">
        {data.endMessage ?? "Workflow Complete"}
      </div>

      {data.summaryEnabled && (
        <div className="text-[10px] text-purple-300 mt-1 italic">
          Summary enabled
        </div>
      )}

      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-purple-300 border-2 border-purple-900" />
    </div>
  );
};
