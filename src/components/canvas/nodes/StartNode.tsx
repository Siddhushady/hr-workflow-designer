// src/components/canvas/nodes/StartNode.tsx
import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import { useThemeStore } from "../../../store/useThemeStore";

export const CustomStartNode: React.FC<NodeProps> = ({ data }) => {
  const theme = useThemeStore((s) => s.theme);
  return (
    <div className={`w-48 h-24 px-3 py-2 rounded-lg border shadow-md text-xs flex flex-col items-center justify-center ${
      theme === "light"
        ? "border-purple-700 bg-purple-600 text-purple-100"
        : "border-purple-500 bg-purple-900/30 text-purple-50"
    }`}>
      <div className="text-center">
        <div className="font-semibold text-sm uppercase tracking-wider">Start</div>
        <div className="text-xs mt-1 line-clamp-1">{data.label ?? "Start"}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 bg-purple-400 border border-purple-950"
      />
    </div>
  );
};
