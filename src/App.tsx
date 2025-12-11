// src/App.tsx
import React from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { CanvasContainer } from "./components/layout/CanvasContainer";
import { NodeConfigPanel } from "./components/layout/NodeConfigPanel";
import { SimulationDialog } from "./components/simulation/SimulationDialog";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0e1117] text-slate-200">

      {/* TOP HEADER */}
      <header className="px-6 py-3 border-b border-slate-700 bg-slate-900/90 backdrop-blur flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-wide">FlowStudio</h1>
          <p className="text-xs opacity-70">Visual workflow designer for HR automation</p>
        </div>
        <div className="text-xs flex gap-2">
          <span className="px-2 py-1 rounded bg-slate-800 border border-slate-600">React + Vite</span>
          <span className="px-2 py-1 rounded bg-slate-800 border border-slate-600">ReactFlow</span>
          <span className="px-2 py-1 rounded bg-slate-800 border border-slate-600">MSW Mock APIs</span>
          <span className="px-2 py-1 rounded bg-slate-800 border border-slate-600">Zustand</span>
        </div>
      </header>

      {/* MAIN APP LAYOUT */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL */}
        <aside className="w-60 border-r border-slate-800 bg-slate-950/90">
          <Sidebar />
        </aside>

        {/* CANVAS CENTER */}
        <main className="flex-1 relative overflow-hidden">
          <CanvasContainer />
          <SimulationDialog />
        </main>

        {/* RIGHT PANEL NODE CONFIG */}
        <aside className="w-80 border-l border-slate-800 bg-slate-950/90">
          <NodeConfigPanel />
        </aside>
      </div>
    </div>
  );
};

export default App;
