// src/App.tsx
import React from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { CanvasContainer } from "./components/layout/CanvasContainer";
import { NodeConfigPanel } from "./components/layout/NodeConfigPanel";
import { SimulationDialog } from "./components/simulation/SimulationDialog";
import { ThemeProvider } from "./components/layout/ThemeProvider";
import { ThemeToggle } from "./components/layout/ThemeToggle";
import { useThemeStore } from "./store/useThemeStore";
import "./index.css";

const AppContent: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        theme === "light"
          ? "bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 text-slate-900"
          : "bg-gradient-to-br from-[#0e1117] via-slate-900 to-[#0d0d14] text-slate-200"
      }`}
    >
      {/* TOP HEADER */}
      <header
        className={`px-6 py-3 border-b-2 flex justify-between items-center transition-colors ${
          theme === "light"
            ? "border-slate-300 bg-white"
            : "border-slate-700 bg-slate-900/90"
        }`}
      >
        <div>
          <h1 className="text-xl font-bold tracking-wide">FlowStudio</h1>
          <p className={`text-xs opacity-70 ${theme === "light" ? "text-slate-600" : ""}`}>
            Visual workflow designer for HR automation
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* MAIN APP LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL */}
        <aside
          className={`w-60 border-r-2 transition-colors ${
            theme === "light"
              ? "border-slate-300 bg-slate-50"
              : "border-slate-700 bg-slate-950/90"
          }`}
        >
          <Sidebar />
        </aside>

        {/* CANVAS CENTER */}
        <main className="flex-1 relative overflow-hidden">
          <CanvasContainer />
          <SimulationDialog />
        </main>

        {/* RIGHT PANEL NODE CONFIG */}
        <aside
          className={`w-80 border-l-2 transition-colors ${
            theme === "light"
              ? "border-slate-300 bg-slate-50"
              : "border-slate-700 bg-slate-950/90"
          }`}
        >
          <NodeConfigPanel />
        </aside>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
