// src/components/simulation/SimulationDialog.tsx
import React, { useState } from "react";
import { api } from "../../api/client";
import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useSimulationStore } from "../../store/useSimulationStore";
import { useThemeStore } from "../../store/useThemeStore";
import { SimulationLog } from "./SimulationLog";

export const SimulationDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toGraph = useWorkflowStore((s) => s.toGraph);
  const status = useSimulationStore((s) => s.status);
  const result = useSimulationStore((s) => s.result);
  const setStatus = useSimulationStore((s) => s.setStatus);
  const setResult = useSimulationStore((s) => s.setResult);
  const setError = useSimulationStore((s) => s.setError);
  const theme = useThemeStore((s) => s.theme);

  const handleRun = async () => {
    setStatus("running");
    setError(undefined);
    try {
      const graph = toGraph();
      const simulationResult = await api.simulateWorkflow({ workflow: graph });
      setResult(simulationResult);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err.message ?? "Simulation failed");
    }
  };

  return (
    <>
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setOpen(true)}
          className="px-5 py-3 rounded-lg bg-blue-400 text-sm font-semibold shadow-lg hover:bg-blue-300 transition border border-blue-500 flex items-center gap-2 text-slate-900"
        >
          ▶ Run Simulation
        </button>
      </div>

      {open && (
        <div
          className={`absolute inset-0 backdrop-blur-sm flex items-center justify-center z-30 ${
            theme === "light" ? "bg-black/30" : "bg-black/40"
          }`}
        >
          <div
            className={`w-[480px] max-h-[70vh] border rounded-2xl shadow-xl flex flex-col transition-colors ${
              theme === "light"
                ? "bg-slate-100 border-slate-300"
                : "bg-slate-950 border-slate-700"
            }`}
          >
            <div
              className={`flex items-center justify-between px-4 py-2 border-b transition-colors ${
                theme === "light"
                  ? "border-slate-300 text-slate-900"
                  : "border-slate-800 text-slate-100"
              }`}
            >
              <div>
                <div className="text-sm font-semibold">
                  Workflow Simulation
                </div>
                <div
                  className={`text-[11px] ${
                    theme === "light" ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  Serializes the current graph and executes step-by-step.
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className={`text-sm transition-colors ${
                  theme === "light"
                    ? "text-slate-500 hover:text-slate-700"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                ✕
              </button>
            </div>

            <div
              className={`px-4 py-3 border-b flex items-center justify-between transition-colors ${
                theme === "light"
                  ? "border-slate-300"
                  : "border-slate-800"
              }`}
            >
              <button
                onClick={handleRun}
                disabled={status === "running"}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 text-xs font-semibold hover:bg-indigo-500 disabled:opacity-60 text-white transition-colors"
              >
                {status === "running" ? "Running..." : "Run Simulation"}
              </button>
              <span className="text-[11px] text-slate-400">
                Status:{" "}
                <span className="font-mono text-sky-300">{status}</span>
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3">
              {result ? (
                <SimulationLog result={result} />
              ) : (
                <p className="text-[11px] text-slate-500">
                  No simulation result yet. Click{" "}
                  <span className="font-semibold">Run Simulation</span> to see
                  the execution log.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
