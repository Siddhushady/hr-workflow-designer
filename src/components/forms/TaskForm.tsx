// src/components/forms/TaskForm.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { WorkflowNode } from "../../core/types/workflow";
import { useWorkflowStore } from "../../store/useWorkflowStore";

interface TaskFormProps {
  node: WorkflowNode;
}

interface TaskFormValues {
  label: string;
  description: string;
  assignee: string;
  dueDate: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({ node }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);

  const { register, handleSubmit, reset } = useForm<TaskFormValues>({
    defaultValues: {
      label: (node.data as any).label ?? "Task",
      description: (node.data as any).description ?? "",
      assignee: (node.data as any).assignee ?? "",
      dueDate: (node.data as any).dueDate ?? "",
    },
  });

  useEffect(() => {
    reset({
      label: (node.data as any).label ?? "Task",
      description: (node.data as any).description ?? "",
      assignee: (node.data as any).assignee ?? "",
      dueDate: (node.data as any).dueDate ?? "",
    });
  }, [node.id]);

  const onSubmit = (values: TaskFormValues) => {
    updateNodeData(node.id, values);
  };

  return (
    <form
      onBlur={handleSubmit(onSubmit)}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
      className="space-y-3"
    >
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">
          Title
        </label>
        <input
          {...register("label")}
          className="w-full px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Assignee
          </label>
          <input
            {...register("assignee")}
            className="w-full px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Due date
          </label>
          <input
            type="date"
            {...register("dueDate")}
            className="w-full px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs"
          />
        </div>
      </div>
    </form>
  );
};
