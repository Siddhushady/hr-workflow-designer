// src/components/simulation/SimulationDialog.tsx
import React, { useState } from "react";
import { api } from "../../api/client";
import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useSimulationStore } from "../../store/useSimulationStore";
import { SimulationLog } from "./SimulationLog";

export const SimulationDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toGraph = useWorkflowStore((s) => s.toGraph);
  const { status, result, setStatus, setResult, setError } = useSimulationStore(
    (s) => ({
      status: s.status,
      result: s.result,
      setStatus: s.setStatus,
      setResult: s.setResult,
      setError: s.setError,
    })
  );

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
      <div className="absolute bottom-4 right-4 z-20">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-2xl bg-accent text-xs font-semibold shadow-lg hover:bg-indigo-500 transition border border-indigo-400"
        >
          ▶ Run Simulation
        </button>
      </div>

      {open && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-30">
          <div className="w-[480px] max-h-[70vh] bg-slate-950 border border-slate-700 rounded-2xl shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
              <div>
                <div className="text-sm font-semibold text-slate-100">
                  Workflow Simulation
                </div>
                <div className="text-[11px] text-slate-400">
                  Serializes the current graph and executes step-by-step.
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <button
                onClick={handleRun}
                disabled={status === "running"}
                className="px-3 py-1.5 rounded-xl bg-accent text-xs font-semibold hover:bg-indigo-500 disabled:opacity-60"
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
