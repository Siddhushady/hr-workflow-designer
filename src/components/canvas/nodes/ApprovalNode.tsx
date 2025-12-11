import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import { useThemeStore } from "../../../store/useThemeStore";

export const CustomApprovalNode: React.FC<NodeProps> = ({ data }) => {
  const theme = useThemeStore((s: any) => s.theme);
  return (
    <div className={`w-48 h-24 px-3 py-2 rounded-lg border shadow-md text-xs flex flex-col items-center justify-center ${
      theme === "light"
        ? "border-green-700 bg-green-600 text-green-100"
        : "border-emerald-500 bg-emerald-900/30 text-emerald-50"
    }`}>
      <div className="text-center">
        <div className="font-semibold text-sm uppercase tracking-wider">Approval</div>
        <div className="mt-1 text-xs font-medium line-clamp-1">
          {data.label ?? "Approval"}
        </div>
        <div className="text-[9px] text-emerald-200 mt-0.5">
          Role: {data.approverRole || "N/A"}
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-green-400 border border-green-950" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-green-400 border border-green-950" />
    </div>
  );
};
