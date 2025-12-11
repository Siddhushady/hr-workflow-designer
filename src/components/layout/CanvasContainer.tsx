// src/components/layout/CanvasContainer.tsx
import React, { useCallback, useMemo, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useSimulationStore } from "../../store/useSimulationStore";
import { useThemeStore } from "../../store/useThemeStore";
import type { WorkflowEdge } from "../../core/types/workflow";

import { CustomStartNode } from "../canvas/nodes/StartNode";
import { CustomTaskNode } from "../canvas/nodes/TaskNode";
import { CustomApprovalNode } from "../canvas/nodes/ApprovalNode";
import { CustomAutomationNode } from "../canvas/nodes/AutomationNode";
import { CustomEndNode } from "../canvas/nodes/EndNode";
import { ContextMenu } from "./ContextMenu";

import type {
  Connection,
  Edge as RFEdge,
  Node as RFNode,
  OnConnect,
  NodeChange,
  EdgeChange,
} from "reactflow";

// Define nodeTypes OUTSIDE the component to prevent recreation
const nodeTypes = {
  start: CustomStartNode,
  task: CustomTaskNode,
  approval: CustomApprovalNode,
  automation: CustomAutomationNode,
  end: CustomEndNode,
};

// MiniMap node color mapping based on node type
const getNodeColor = (node: RFNode): string => {
  switch (node.type) {
    case "start":
      return "#a855f7"; // purple-500
    case "task":
      return "#6366f1"; // indigo-500
    case "approval":
      return "#10b981"; // emerald-500
    case "automation":
      return "#f59e0b"; // amber-500
    case "end":
      return "#ef4444"; // red-500
    default:
      return "#64748b"; // slate-500
  }
};

export const CanvasContainer: React.FC = () => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    nodeId: string;
  } | null>(null);

  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const setEdges = useWorkflowStore((state) => state.setEdges);
  const updateNodePosition = useWorkflowStore((state) => state.updateNodePosition);
  const selectNode = useWorkflowStore((state) => state.selectNode);
  const deleteNode = useWorkflowStore((state) => state.deleteNode);
  const deleteEdge = useWorkflowStore((state) => state.deleteEdge);
  const clearResult = useSimulationStore((state) => state.clearResult);
  const theme = useThemeStore((state) => state.theme);

  // Convert store nodes to ReactFlow nodes
  const rfNodes: RFNode[] = useMemo(
    () =>
      nodes.map((n) => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: { ...n.data },
      })),
    [nodes]
  );

  // Convert store edges to ReactFlow edges
  const rfEdges: RFEdge[] = useMemo(
    () =>
      edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
      })),
    [edges]
  );

  // Initialize ReactFlow state with converted nodes and edges
  const [localNodes, setLocalNodes, onNodesChange] = useNodesState(rfNodes);
  const [localEdges, setLocalEdges, onEdgesChange] = useEdgesState(rfEdges);

  // CRITICAL: Sync external store changes into local React Flow state
  useEffect(() => {
    setLocalNodes(rfNodes);
  }, [rfNodes, setLocalNodes]);

  useEffect(() => {
    setLocalEdges(rfEdges);
  }, [rfEdges, setLocalEdges]);

  // Clear simulation result when workflow changes
  useEffect(() => {
    clearResult();
  }, [nodes, edges, clearResult]);

  // Sync localNodes changes back to Zustand store
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
      
      // Persist position changes to the store
      changes.forEach((change) => {
        if (change.type === "position" && change.position) {
          updateNodePosition(change.id, change.position);
        }
      });
    },
    [onNodesChange, updateNodePosition]
  );

  // Sync localEdges changes back to Zustand store
  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onEdgesChange(changes);
      
      // Handle edge deletion
      changes.forEach((change) => {
        if (change.type === "remove") {
          deleteEdge(change.id);
        }
      });
    },
    [onEdgesChange, deleteEdge]
  );

  // Handle new edge connections
  const handleConnect: OnConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return;
      const newEdge: WorkflowEdge = {
        id: `${connection.source}-${connection.target}-${Date.now()}`,
        source: connection.source,
        target: connection.target,
      };
      setEdges([...edges, newEdge]);
    },
    [edges, setEdges]
  );

  // Handle node click to select it
  const onNodeClick = useCallback(
    (_: any, node: RFNode) => {
      selectNode(node.id);
    },
    [selectNode]
  );

  // Handle right-click to show context menu
  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: RFNode) => {
      event.preventDefault();
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        nodeId: node.id,
      });
    },
    []
  );

  // Handle context menu delete action
  const handleContextMenuDelete = useCallback(() => {
    if (contextMenu) {
      deleteNode(contextMenu.nodeId);
      setContextMenu(null);
    }
  }, [contextMenu, deleteNode]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={localNodes}
        edges={localEdges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onNodeContextMenu={onNodeContextMenu}
        fitView
        className={
          theme === "light"
            ? "bg-gradient-to-b from-slate-100 to-slate-200"
            : "bg-gradient-to-b from-slate-900 to-slate-950"
        }
      >
        <Background gap={18} size={1} />
        <MiniMap
          pannable
          zoomable
          nodeColor={getNodeColor}
          className={
            theme === "light"
              ? "bg-slate-200/80 rounded-xl border border-slate-300"
              : "bg-slate-900/80 rounded-xl border border-slate-700"
          }
        />
        <Controls />
      </ReactFlow>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onDelete={handleContextMenuDelete}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};
