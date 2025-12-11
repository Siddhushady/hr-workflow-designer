import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import { useThemeStore } from "../../../store/useThemeStore";

export const CustomAutomationNode: React.FC<NodeProps> = ({ data }) => {
  const theme = useThemeStore((s: any) => s.theme);
  return (
    <div className={`w-48 h-24 px-3 py-2 rounded-lg border shadow-md text-xs flex flex-col items-center justify-center ${
      theme === "light"
        ? "border-yellow-700 bg-yellow-600 text-yellow-100"
        : "border-amber-500 bg-amber-900/30 text-amber-50"
    }`}>
      <div className="text-center">
        <div className="font-semibold text-sm uppercase tracking-wider">Automation</div>
        <div className="mt-1 text-xs font-medium line-clamp-1">
          {data.label ?? "Automation"}
        </div>
        {data.actionId ? (
          <div className="text-[9px] text-amber-200 mt-0.5">
            {data.actionId}
          </div>
        ) : (
          <div className="text-[9px] text-amber-300 mt-0.5">
            No action
          </div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-yellow-400 border border-yellow-950" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-yellow-400 border border-yellow-950" />
    </div>
  );
};
