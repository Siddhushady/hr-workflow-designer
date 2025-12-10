import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";


export const CustomAutomationNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="px-3 py-2 rounded-2xl border border-amber-400/70 bg-amber-900/40 shadow-md text-xs text-amber-50 w-52">

      <div className="flex items-center justify-between">
        <span className="font-semibold text-[11px] uppercase tracking-wide">
          ⚙ Automation
        </span>
      </div>

      <div className="mt-1 text-xs font-medium truncate">
        {data.label ?? "Automated Step"}
      </div>

      {data.actionId ? (
        <div className="text-[11px] text-amber-200 mt-1">
          Action: <span className="font-semibold">{data.actionId}</span>
        </div>
      ) : (
        <div className="text-[11px] text-amber-300 mt-1 opacity-70">
          (No automation selected)
        </div>
      )}

      {data.params && Object.keys(data.params).length > 0 && (
        <div className="mt-1 text-[10px] text-amber-200">
          Params: {Object.keys(data.params).length} set
        </div>
      )}

      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-amber-300 border-2 border-amber-900" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-amber-300 border-2 border-amber-900" />
    </div>
  );
};
