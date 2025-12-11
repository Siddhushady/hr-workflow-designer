import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";

export const CustomApprovalNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="w-56 h-32 px-4 py-3 rounded-lg border border-emerald-500 bg-emerald-900/30 shadow-md text-xs text-emerald-50 flex flex-col justify-between">
      <div>
        <div className="font-semibold text-sm uppercase tracking-wider">Approval</div>
        <div className="mt-2 text-xs font-medium line-clamp-1">
          {data.label ?? "Approval"}
        </div>
        <div className="text-[10px] text-emerald-200 mt-1">
          Role: {data.approverRole || "N/A"}
        </div>
        {data.autoApproveThreshold > 0 && (
          <div className="text-[10px] text-emerald-300 mt-1">
            Threshold: {data.autoApproveThreshold}
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-emerald-300 border border-emerald-900" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-emerald-300 border border-emerald-900" />
    </div>
  );
};
