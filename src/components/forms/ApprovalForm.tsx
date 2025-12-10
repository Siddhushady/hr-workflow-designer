import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { WorkflowNode } from "../../core/types/workflow";
import { useWorkflowStore } from "../../store/useWorkflowStore";

interface ApprovalFormProps {
  node: WorkflowNode;
}

interface ApprovalFormValues {
  label: string;
  approverRole: string;
  autoApproveThreshold: number;
}

export const ApprovalForm: React.FC<ApprovalFormProps> = ({ node }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);

  const { register, handleSubmit, reset } = useForm<ApprovalFormValues>({
    defaultValues: {
      label: (node.data as any).label ?? "Approval",
      approverRole: (node.data as any).approverRole ?? "Manager",
      autoApproveThreshold: (node.data as any).autoApproveThreshold ?? 0,
    },
  });

  useEffect(() => {
    reset({
      label: (node.data as any).label ?? "Approval",
      approverRole: (node.data as any).approverRole ?? "Manager",
      autoApproveThreshold: (node.data as any).autoApproveThreshold ?? 0,
    });
  }, [node.id]);

  const onSubmit = (values: ApprovalFormValues) => {
    updateNodeData(node.id, values);
  };

  return (
    <form
      onBlur={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label className="text-xs font-semibold text-slate-300 mb-1 block">Title</label>
        <input {...register("label")} className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs"/>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-300 mb-1 block">Approver Role</label>
        <input {...register("approverRole")} className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs"/>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-300 mb-1 block">Auto-Approve Threshold (optional)</label>
        <input type="number" {...register("autoApproveThreshold")} className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs"/>
      </div>
    </form>
  );
};
