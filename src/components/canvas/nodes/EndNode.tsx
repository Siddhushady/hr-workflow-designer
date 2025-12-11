import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import { useThemeStore } from "../../../store/useThemeStore";

export const CustomEndNode: React.FC<NodeProps> = ({ data }) => {
  const theme = useThemeStore((s: any) => s.theme);
  return (
    <div className={`w-48 h-24 px-3 py-2 rounded-lg border shadow-md text-xs flex flex-col items-center justify-center ${
      theme === "light"
        ? "border-red-700 bg-red-600 text-red-100"
        : "border-red-500 bg-red-900/30 text-red-50"
    }`}>
      <div className="text-center">
        <div className="font-semibold text-sm uppercase tracking-wider">End</div>
        <div className="mt-1 font-medium text-xs line-clamp-1">
          {data.label ?? "End"}
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-red-300 border border-red-900" />
    </div>
  );
};
