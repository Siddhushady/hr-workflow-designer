import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";


export const CustomAutomationNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="w-56 h-32 px-4 py-3 rounded-lg border border-amber-500 bg-amber-900/30 shadow-md text-xs text-amber-50 flex flex-col justify-between">
      <div>
        <div className="font-semibold text-sm uppercase tracking-wider">Automation</div>
        <div className="mt-2 text-xs font-medium line-clamp-1">
          {data.label ?? "Automation"}
        </div>
        {data.actionId ? (
          <div className="text-[10px] text-amber-200 mt-1">
            Action: {data.actionId}
          </div>
        ) : (
          <div className="text-[10px] text-amber-300 mt-1">
            No action selected
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-amber-300 border border-amber-900" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-amber-300 border border-amber-900" />
    </div>
  );
};
