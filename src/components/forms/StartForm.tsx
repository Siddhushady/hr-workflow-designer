// src/components/forms/StartForm.tsx
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import type { WorkflowNode } from "../../core/types/workflow";
import { useWorkflowStore } from "../../store/useWorkflowStore";

interface StartFormProps {
  node: WorkflowNode;
}

type MetadataEntry = { key: string; value: string };

interface StartFormValues {
  label: string;
  metadata: MetadataEntry[];
}

export const StartForm: React.FC<StartFormProps> = ({ node }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);

  const metadataArray =
    node.data && "metadata" in node.data
      ? Object.entries(node.data.metadata ?? {}).map(([key, value]) => ({
          key,
          value,
        }))
      : [];

  const { register, control, handleSubmit, reset } = useForm<StartFormValues>({
    defaultValues: {
      label: (node.data as any).label ?? "Start",
      metadata: metadataArray,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "metadata",
    control,
  });

  useEffect(() => {
    reset({
      label: (node.data as any).label ?? "Start",
      metadata: metadataArray,
    });
  }, [node.id]);

  const onSubmit = (values: StartFormValues) => {
    const metadata: Record<string, string> = {};
    values.metadata.forEach((entry) => {
      if (entry.key.trim()) {
        metadata[entry.key.trim()] = entry.value;
      }
    });

    updateNodeData(node.id, {
      label: values.label,
      metadata,
    });
  };

  return (
    <form
      onBlur={handleSubmit(onSubmit)}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">
          Start title
        </label>
        <input
          {...register("label")}
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
            onClick={() => append({ key: "", value: "" })}
            className="text-[11px] text-accent hover:underline"
          >
            + Add
          </button>
        </div>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-1">
              <input
                placeholder="Key"
                {...register(`metadata.${index}.key` as const)}
                className="w-1/2 px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-[11px]"
              />
              <input
                placeholder="Value"
                {...register(`metadata.${index}.value` as const)}
                className="w-1/2 px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-[11px]"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-[10px] text-slate-400 hover:text-danger"
              >
                ✕
              </button>
            </div>
          ))}
          {fields.length === 0 && (
            <p className="text-[11px] text-slate-500">
              No metadata yet. Add key-value pairs if needed.
            </p>
          )}
        </div>
      </div>
    </form>
  );
};
