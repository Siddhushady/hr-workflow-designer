import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { WorkflowNode } from "../../core/types/workflow";
import { useWorkflowStore } from "../../store/useWorkflowStore";

interface EndFormProps {
  node: WorkflowNode;
}

interface EndFormValues {
  label: string;
  endMessage: string;
  summaryEnabled: boolean;
}

export const EndForm: React.FC<EndFormProps> = ({ node }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const { register, handleSubmit, reset } = useForm<EndFormValues>({
    defaultValues: {
      label: node.data.label ?? "End",
      endMessage: (node.data as any).endMessage ?? "Workflow Complete",
      summaryEnabled: (node.data as any).summaryEnabled ?? true,
    },
  });

  useEffect(() => {
    reset({
      label: node.data.label,
      endMessage: (node.data as any).endMessage,
      summaryEnabled: (node.data as any).summaryEnabled,
    });
  }, [node.id]);

  const onSubmit = (v: EndFormValues) => updateNodeData(node.id, v);

  return (
    <form onBlur={handleSubmit(onSubmit)} className="space-y-4">
      
      <div>
        <label className="block text-xs font-semibold text-slate-300">Title</label>
        <input {...register("label")} className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded-md text-xs"/>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300">Completion Message</label>
        <textarea {...register("endMessage")} rows={3} className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded-md text-xs"/>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("summaryEnabled")} className="scale-90"/>
        <label className="text-xs text-slate-300">Display summary after completion</label>
      </div>
    </form>
  );
};
