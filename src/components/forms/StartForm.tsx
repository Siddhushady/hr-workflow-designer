// src/components/forms/StartForm.tsx
import React, { useState } from "react";
import type { WorkflowNode, StartNodeData } from "../../core/types/workflow";
import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useThemeStore } from "../../store/useThemeStore";

interface StartFormProps {
  node: WorkflowNode;
}

export const StartForm: React.FC<StartFormProps> = ({ node }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const theme = useThemeStore((s) => s.theme);
  const data = node.data as StartNodeData;
  const [newKeyValue, setNewKeyValue] = useState({ key: "", value: "" });

  const handleLabelChange = (value: string) => {
    updateNodeData(node.id, { label: value });
  };

  const handleAddMetadata = () => {
    if (newKeyValue.key.trim()) {
      const updatedMetadata = {
        ...data.metadata,
        [newKeyValue.key.trim()]: newKeyValue.value,
      };
      updateNodeData(node.id, { metadata: updatedMetadata });
      setNewKeyValue({ key: "", value: "" });
    }
  };

  const handleRemoveMetadata = (key: string) => {
    const updatedMetadata = { ...data.metadata };
    delete updatedMetadata[key];
    updateNodeData(node.id, { metadata: updatedMetadata });
  };

  const handleMetadataValueChange = (key: string, value: string) => {
    const updatedMetadata = {
      ...data.metadata,
      [key]: value,
    };
    updateNodeData(node.id, { metadata: updatedMetadata });
  };

  return (
    <form className="space-y-4">
      <div>
        <label className={`block text-xs font-semibold mb-1 ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}>
          Start title
        </label>
        <input
          value={data.label ?? ""}
          onChange={(e) => handleLabelChange(e.target.value)}
          className={`w-full px-2 py-1 rounded-md border text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
            theme === "light"
              ? "bg-slate-100 border-slate-300 text-slate-900"
              : "bg-slate-900 border-slate-700 text-slate-100"
          }`}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className={`text-xs font-semibold ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}>
            Metadata (optional)
          </span>
          <button
            type="button"
            onClick={handleAddMetadata}
            disabled={!newKeyValue.key.trim()}
            className="text-[11px] text-indigo-400 hover:text-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Add
          </button>
        </div>
        <div className="space-y-2 mb-3">
          {Object.entries(data.metadata || {}).map(([key, value]) => (
            <div key={key} className="flex gap-1">
              <input
                readOnly
                value={key}
                className={`w-1/2 px-2 py-1 rounded-md border text-[11px] ${
                  theme === "light"
                    ? "bg-slate-200 border-slate-300 text-slate-600"
                    : "bg-slate-800 border-slate-700 text-slate-400"
                }`}
              />
              <input
                value={value}
                onChange={(e) => handleMetadataValueChange(key, e.target.value)}
                placeholder="Value"
                className={`w-1/3 px-2 py-1 rounded-md border text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                  theme === "light"
                    ? "bg-slate-100 border-slate-300 text-slate-900"
                    : "bg-slate-900 border-slate-700 text-slate-100"
                }`}
              />
              <button
                type="button"
                onClick={() => handleRemoveMetadata(key)}
                className="text-[11px] text-red-400 hover:text-red-300 px-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className={`flex gap-1 p-2 rounded-md border border-dashed ${
          theme === "light"
            ? "bg-slate-100 border-slate-300"
            : "bg-slate-900/50 border-slate-700"
        }`}>
          <input
            placeholder="Key"
            value={newKeyValue.key}
            onChange={(e) => setNewKeyValue({ ...newKeyValue, key: e.target.value })}
            className={`w-1/2 px-2 py-1 rounded-md border text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
              theme === "light"
                ? "bg-slate-50 border-slate-300 text-slate-900"
                : "bg-slate-800 border-slate-700 text-slate-100"
            }`}
          />
          <input
            placeholder="Value"
            value={newKeyValue.value}
            onChange={(e) => setNewKeyValue({ ...newKeyValue, value: e.target.value })}
            className={`w-1/3 px-2 py-1 rounded-md border text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
              theme === "light"
                ? "bg-slate-50 border-slate-300 text-slate-900"
                : "bg-slate-800 border-slate-700 text-slate-100"
            }`}
          />
        </div>
      </div>
    </form>
  );
};
