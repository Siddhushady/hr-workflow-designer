// src/components/simulation/SimulationLog.tsx
import React from "react";
import type { SimulationResult } from "../../core/types/simulation";

interface Props {
  result: SimulationResult;
}

export const SimulationLog: React.FC<Props> = ({ result }) => {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <span className="font-semibold text-slate-200">Validity:</span>{" "}
        {result.valid ? (
          <span className="text-emerald-400">Valid workflow</span>
        ) : (
          <span className="text-danger">Invalid workflow</span>
        )}
      </div>

      {result.errors.length > 0 && (
        <div>
          <div className="text-[11px] font-semibold text-danger mb-1">
            Structural Issues
          </div>
          <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-300">
            {result.errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <div className="text-[11px] font-semibold text-slate-300 mb-1">
          Execution Trace
        </div>
        {result.logs.length === 0 ? (
          <p className="text-[11px] text-slate-500">
            No steps executed due to validation errors.
          </p>
        ) : (
          <ol className="space-y-1">
            {result.logs.map((log) => (
              <li
                key={log.stepIndex}
                className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[11px] text-sky-300">
                    Step {log.stepIndex}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {log.nodeType.toUpperCase()} • {log.nodeId}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-100">
                  {log.nodeLabel}
                </div>
                <div className="text-[11px] text-slate-300">
                  {log.message}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};
