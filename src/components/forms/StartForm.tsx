// src/components/forms/StartForm.tsx
import React, { useState } from "react";
import type { WorkflowNode, StartNodeData } from "../../core/types/workflow";
import { useWorkflowStore } from "../../store/useWorkflowStore";

interface StartFormProps {
  node: WorkflowNode;
}

export const StartForm: React.FC<StartFormProps> = ({ node }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
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
        <label className="block text-xs font-semibold text-slate-300 mb-1">
          Start title
        </label>
        <input
          value={data.label ?? ""}
          onChange={(e) => handleLabelChange(e.target.value)}
          className="w-full px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-slate-300">
            Metadata (optional)
          </span>
          <button
            type="button"
            onClick={handleAddMetadata}
            disabled={!newKeyValue.key.trim()}
            className="text-[11px] text-accent hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="w-1/2 px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-[11px] text-slate-400"
              />
              <input
                value={value}
                onChange={(e) => handleMetadataValueChange(key, e.target.value)}
                placeholder="Value"
                className="w-1/3 px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-[11px] focus:outline-none focus:ring-1 focus:ring-accent"
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
        <div className="flex gap-1 p-2 bg-slate-900/50 rounded-md border border-slate-700 border-dashed">
          <input
            placeholder="Key"
            value={newKeyValue.key}
            onChange={(e) => setNewKeyValue({ ...newKeyValue, key: e.target.value })}
            className="w-1/2 px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-[11px] focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <input
            placeholder="Value"
            value={newKeyValue.value}
            onChange={(e) => setNewKeyValue({ ...newKeyValue, value: e.target.value })}
            className="w-1/2 px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-[11px] focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>
    </form>
  );
};
