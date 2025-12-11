// src/components/layout/ThemeToggle.tsx
import React from "react";
import { useThemeStore } from "../../store/useThemeStore";

export const ThemeToggle: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded-lg border transition-colors ${
        theme === "light"
          ? "border-slate-400 bg-slate-200 hover:bg-slate-300 text-slate-800"
          : "border-slate-600 bg-slate-800 hover:bg-slate-700 text-slate-100"
      }`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <span className="text-xl">☀️</span>
      ) : (
        <span className="text-xl">🌙</span>
      )}
    </button>
  );
};
