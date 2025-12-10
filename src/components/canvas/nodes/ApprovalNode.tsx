import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";

export const CustomApprovalNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="px-3 py-2 rounded-2xl border border-emerald-500/60 bg-emerald-900/40 shadow-md text-xs text-emerald-50 w-48">
      
      <div className="font-semibold text-[11px] uppercase tracking-wide flex items-center gap-1">
        📝 Approval
      </div>

      <div className="mt-1 text-xs font-medium truncate">
        {data.label ?? "Approval Step"}
      </div>

      <div className="mt-1 text-[11px] text-emerald-200">
        Role: <span className="font-semibold">{data.approverRole || "N/A"}</span>
      </div>

      {data.autoApproveThreshold > 0 && (
        <div className="text-[10px] text-emerald-300 mt-1">
          Auto-approve ≥ {data.autoApproveThreshold}
        </div>
      )}

      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-emerald-300 border-2 border-emerald-900" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-emerald-300 border-2 border-emerald-900" />
    </div>
  );
};
