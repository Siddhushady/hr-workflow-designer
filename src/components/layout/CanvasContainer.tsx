// src/components/layout/CanvasContainer.tsx
import React, { useCallback, useMemo, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import { useWorkflowStore } from "../../store/useWorkflowStore";
import type { WorkflowEdge } from "../../core/types/workflow";

import { CustomStartNode } from "../canvas/nodes/StartNode";
import { CustomTaskNode } from "../canvas/nodes/TaskNode";
import { CustomApprovalNode } from "../canvas/nodes/ApprovalNode";
import { CustomAutomationNode } from "../canvas/nodes/AutomationNode";
import { CustomEndNode } from "../canvas/nodes/EndNode";

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

export const CanvasContainer: React.FC = () => {
  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const setEdges = useWorkflowStore((state) => state.setEdges);
  const updateNodePosition = useWorkflowStore((state) => state.updateNodePosition);
  const selectNode = useWorkflowStore((state) => state.selectNode);
  const deleteNode = useWorkflowStore((state) => state.deleteNode);
  const deleteEdge = useWorkflowStore((state) => state.deleteEdge);

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

  // Handle right-click to delete node
  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: RFNode) => {
      event.preventDefault();
      if (confirm("Delete this node?")) {
        deleteNode(node.id);
      }
    },
    [deleteNode]
  );

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
        className="bg-gradient-to-b from-slate-900 to-slate-950"
      >
        <Background gap={18} size={1} />
        <MiniMap
          pannable
          zoomable
          className="bg-slate-900/80 rounded-xl border border-slate-700"
        />
        <Controls />
      </ReactFlow>
    </div>
  );
};
