// src/components/layout/CanvasContainer.tsx
import React, { useCallback, useMemo } from "react";
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
} from "reactflow";


const nodeTypes = {
  start: CustomStartNode,
  task: CustomTaskNode,
  approval: CustomApprovalNode,
  automation: CustomAutomationNode,
  end: CustomEndNode,
};

export const CanvasContainer: React.FC = () => {
  const { nodes, edges, setEdges, selectNode, deleteNode } = useWorkflowStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
      setEdges: state.setEdges,
      selectNode: state.selectNode,
      deleteNode: state.deleteNode,
    })
  );

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

  const rfEdges: RFEdge[] = useMemo(
    () =>
      edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
      })),
    [edges]
  );

  const [localNodes, , onNodesChange] = useNodesState(rfNodes);
  const [localEdges, , onEdgesChange] = useEdgesState(rfEdges);

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

  const onNodeClick = useCallback(
    (_: any, node: RFNode) => {
      selectNode(node.id);
    },
    [selectNode]
  );

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
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
