**HR Workflow Visual Designer**

An interactive, node-based visual builder for designing, editing, and simulating HR workflows. Build approval chains, task flows and automation steps visually — then validate them with the built-in simulation engine before taking processes live.

**Demo / Live Preview**
- **Local:** After `npm run dev` the app runs at `http://localhost:5173/` by default.

**Features**
- **Interactive Canvas:** Drag-and-drop nodes, pan, zoom and fit view using React Flow.
- **Five Node Types:** `Start`, `Task`, `Approval`, `Automation`, `End` — each with editable properties.
- **Real-time State:** Global state is managed by `Zustand` and persists user actions in-memory.
- **Simulation Engine:** Run mock simulations and receive validations (start/end nodes, connectivity, cycles).
- **Mock API:** Uses MSW (Mock Service Worker) for local simulation/testing flows.
- **Config Panels:** Select a node and edit its properties in the right-side panel; changes are stored immediately.

**Tech Stack**
- **Frontend:** React + TypeScript
- **Canvas / Graph:** React Flow
- **State Management:** Zustand (+ Immer for immutability helpers)
- **Styling:** Tailwind CSS
- **Dev Tooling:** Vite, MSW for mocks

**Quick Start (Windows / PowerShell)**
1. Clone the repo and install dependencies:

```powershell
git clone https://github.com/<your-username>/hr-workflow-designer.git
cd "hr-workflow-designer"
npm install
```

2. Start the dev server:

```powershell
npm run dev
```

3. Open `http://localhost:5173/` in your browser.

4. (Optional) Initialize MSW service worker for local mocks (already included in `public/` in this repo):

```powershell
npx msw init public/ --save
```

**Available NPM Scripts**
- `npm run dev` : Start development server with HMR.
- `npm run build`: Build production assets to `dist/`.
- `npm run preview`: Serve the built `dist/` locally (Vite preview).

**Project Structure (high-level)**
- `src/` : Application source files
	- `api/` : Mock service worker + handlers
	- `components/` : UI parts
		- `canvas/` : React Flow components and custom node renderers (`nodes/`)
		- `forms/` : Node configuration panels
		- `layout/` : Sidebar, topbar, `CanvasContainer`
	- `core/types/` : TypeScript types for nodes/edges/simulations
	- `hooks/` : Custom React hooks (e.g., `useAutomationAPI`)
	- `store/` : `useWorkflowStore.ts` (Zustand store holding nodes/edges/selection)
	- `main.tsx`, `index.css`, `App.tsx`

**How to Use**
- **Add nodes:** Use the left sidebar to drag a node type onto the canvas.
- **Connect nodes:** Drag connection handles to create edges.
- **Select nodes:** Click a node to open its properties in the right-side panel.
- **Edit properties:** Changes are applied live to the global store.
- **Drag nodes:** Node positions are persisted to the store so layout is consistent.
- **Simulate:** Use the simulation panel to run a mock validation — the engine checks for a single `Start` and `End`, reachability, and cycles.

**Important Implementation Notes**
- React Flow maintains local nodes/edges state. This project synchronizes the external `Zustand` store with React Flow local state so UI and store are the single source of truth.
- Forms are implemented as controlled components that update the global store on change to avoid stale UI state.

**Troubleshooting**
- If the canvas appears empty, ensure the page `html`/`body`/`#root` elements have full height (the project includes this in `src/index.css`).
- If nodes appear in store but not on canvas, restart the dev server to ensure HMR picked up changes. Use the browser console to check for React Flow warnings about `nodeTypes` objects being recreated — node types are declared at module scope to avoid this.

**Contributing**
- Fork the repo and open a PR with a clear description.
- Follow the existing TypeScript + React patterns.
- Run `npm install` and `npm run dev` locally to validate your changes.

**Suggested Next Improvements**
- Add persistence (localStorage or backend) to save workflows between sessions.
- Add unit/integration tests for simulation logic.
- Improve accessibility and keyboard interactions for the canvas.

**License & Attribution**
- Add a `LICENSE` file (e.g. MIT) if you want to publish this repository publicly.

**Contact / Author**
- Maintained by `<your-name>` — replace placeholders with your GitHub handle and contact info before publishing.

----

If you want, I can also:
- Add badges (build/preview/coverage) at the top of this `README`.
- Add example screenshots or an animated GIF to illustrate adding nodes and running a simulation.
- Create a short `CONTRIBUTING.md` and a basic `LICENSE` file (MIT) and open a PR with those files.

Replace any `<your-username>` or `<your-name>` placeholders before publishing to GitHub.