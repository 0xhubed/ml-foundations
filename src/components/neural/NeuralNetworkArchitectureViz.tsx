"use client";

import { useState, useMemo } from "react";
import { FullScreenCard } from "@/components/ui/FullScreenCard";
import { MatrixMultiplicationModal, type MatrixClickData } from "./MatrixMultiplicationModal";

type LayerNode = {
  id: string;
  x: number;
  y: number;
  value: number;
  label: string;
};

type Connection = {
  from: string;
  to: string;
  weight: number;
};

export function NeuralNetworkArchitectureViz() {
  const [showWeights, setShowWeights] = useState(true);
  const [highlightPath, setHighlightPath] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<MatrixClickData | null>(null);

  // Define network architecture: 2 inputs -> 4 hidden -> 1 output
  const inputNodes: LayerNode[] = useMemo(
    () => [
      { id: "i1", x: 100, y: 150, value: 1.5, label: "x₁" },
      { id: "i2", x: 100, y: 250, value: 2.0, label: "x₂" },
    ],
    []
  );

  const hiddenNodes: LayerNode[] = useMemo(
    () => [
      { id: "h1", x: 350, y: 75, value: 0, label: "h₁" },
      { id: "h2", x: 350, y: 150, value: 0, label: "h₂" },
      { id: "h3", x: 350, y: 225, value: 0, label: "h₃" },
      { id: "h4", x: 350, y: 300, value: 0, label: "h₄" },
    ],
    []
  );

  const outputNodes: LayerNode[] = useMemo(
    () => [{ id: "o1", x: 600, y: 187.5, value: 0, label: "y" }],
    []
  );

  // Define connections with weights
  const connections: Connection[] = useMemo(() => {
    const conns: Connection[] = [];

    // Input to hidden
    inputNodes.forEach((input, i) => {
      hiddenNodes.forEach((hidden, j) => {
        conns.push({
          from: input.id,
          to: hidden.id,
          weight: (Math.sin(i * j + 1) * 0.5 + 0.5) * 2 - 1, // Random-ish weights between -1 and 1
        });
      });
    });

    // Hidden to output
    hiddenNodes.forEach((hidden, i) => {
      conns.push({
        from: hidden.id,
        to: outputNodes[0].id,
        weight: (Math.cos(i + 1) * 0.5 + 0.5) * 2 - 1,
      });
    });

    return conns;
  }, [inputNodes, hiddenNodes, outputNodes]);

  // Get node by id
  const getNode = (id: string): LayerNode | undefined => {
    return [...inputNodes, ...hiddenNodes, ...outputNodes].find((n) => n.id === id);
  };

  // Get layer type for a node
  const getNodeLayerType = (nodeId: string): "input" | "hidden" | "output" | undefined => {
    if (inputNodes.find((n) => n.id === nodeId)) return "input";
    if (hiddenNodes.find((n) => n.id === nodeId)) return "hidden";
    if (outputNodes.find((n) => n.id === nodeId)) return "output";
    return undefined;
  };

  // Handle node click
  const handleNodeClick = (node: LayerNode) => {
    const layerType = getNodeLayerType(node.id);
    setModalData({
      type: "node",
      nodeId: node.id,
      nodeLabel: node.label,
      layerType,
    });
    setModalOpen(true);
  };

  // Handle edge click
  const handleEdgeClick = (conn: Connection) => {
    const fromNode = getNode(conn.from);
    const toNode = getNode(conn.to);
    setModalData({
      type: "edge",
      fromNode: conn.from,
      toNode: conn.to,
      weight: conn.weight,
      fromLabel: fromNode?.label,
      toLabel: toNode?.label,
    });
    setModalOpen(true);
  };

  // Determine connection color based on weight
  const getConnectionColor = (weight: number, isHighlighted: boolean) => {
    if (isHighlighted) {
      return "#0F4C81";
    }
    return "rgba(15,76,129,0.6)";
  };

  const getConnectionWidth = (weight: number, isHighlighted: boolean) => {
    if (isHighlighted) return 3;
    return Math.abs(weight) * 2 + 0.5;
  };

  return (
    <>
      <MatrixMultiplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={modalData}
      />
      <FullScreenCard className="glass-panel p-6" title="Neural Network Architecture">
        <div className="mb-6 flex flex-wrap gap-3 items-center">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={showWeights}
            onChange={(e) => setShowWeights(e.target.checked)}
            className="w-4 h-4 accent-[rgba(107,140,174,1)]"
          />
          <span className="text-[color:var(--color-text-secondary)]">Show Weights</span>
        </label>

        <div className="ml-auto text-sm text-[color:var(--color-text-secondary)]">
          Click on any node or connection to see matrix multiplication details
        </div>
      </div>

      {/* Network Visualization */}
      <div className="bg-[rgba(248,250,252,0.5)] rounded-lg p-8 border border-[rgba(0,0,0,0.08)] mb-6">
        <svg viewBox="0 0 700 400" className="w-full neural-network-viz" style={{ maxHeight: "500px" }}>
          {/* Draw connections */}
          {connections.map((conn, idx) => {
            const fromNode = getNode(conn.from);
            const toNode = getNode(conn.to);
            if (!fromNode || !toNode) return null;

            const isHighlighted = highlightPath === `${conn.from}-${conn.to}` ||
                                 highlightPath === conn.from ||
                                 highlightPath === conn.to;

            return (
              <g key={idx}>
                {/* Forward connection */}
                <line
                  x1={fromNode.x + 25}
                  y1={fromNode.y}
                  x2={toNode.x - 25}
                  y2={toNode.y}
                  stroke={getConnectionColor(conn.weight, isHighlighted)}
                  strokeWidth={getConnectionWidth(conn.weight, isHighlighted)}
                  opacity={isHighlighted ? 1 : 0.6}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdgeClick(conn)}
                  onMouseEnter={() => setHighlightPath(`${conn.from}-${conn.to}`)}
                  onMouseLeave={() => setHighlightPath(null)}
                />

                {/* Weight label */}
                {showWeights && (
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2 - 5}
                    fontSize="10"
                    fill="#1A1A1A"
                    textAnchor="middle"
                    fontWeight="500"
                  >
                    {conn.weight.toFixed(2)}
                  </text>
                )}

              </g>
            );
          })}

          {/* Draw nodes */}
          {[...inputNodes, ...hiddenNodes, ...outputNodes].map((node) => {
            const isInput = inputNodes.includes(node);
            const isOutput = outputNodes.includes(node);
            const isHighlighted = highlightPath === node.id;

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHighlightPath(node.id)}
                onMouseLeave={() => setHighlightPath(null)}
                onClick={() => handleNodeClick(node)}
                style={{ cursor: "pointer" }}
              >
                {/* Node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHighlighted ? 28 : 25}
                  fill={
                    isInput
                      ? "rgba(107,140,174,0.15)"
                      : isOutput
                        ? "rgba(255,200,87,0.15)"
                        : "rgba(168,85,247,0.3)"
                  }
                  stroke={
                    isInput
                      ? "#6B8CAE"
                      : isOutput
                        ? "#FFC857"
                        : "#9333EA"
                  }
                  strokeWidth={isHighlighted ? 3 : 2.5}
                />

                {/* Node label */}
                <text
                  x={node.x}
                  y={node.y - 2}
                  fontSize="14"
                  fill="#1A1A1A"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {node.label}
                </text>

                {/* Node value (for input layer) */}
                {isInput && (
                  <text
                    x={node.x}
                    y={node.y + 12}
                    fontSize="10"
                    fill="#4A5568"
                    textAnchor="middle"
                  >
                    {node.value.toFixed(1)}
                  </text>
                )}
              </g>
            );
          })}

          {/* Layer labels */}
          <text x={100} y={30} fontSize="14" fill="#4A5568" textAnchor="middle" fontWeight="600">
            Input Layer
          </text>
          <text x={350} y={30} fontSize="14" fill="#4A5568" textAnchor="middle" fontWeight="600">
            Hidden Layer
          </text>
          <text x={600} y={30} fontSize="14" fill="#4A5568" textAnchor="middle" fontWeight="600">
            Output Layer
          </text>

          {/* Per-node computation notation */}
          <text x={350} y={370} fontSize="12" fill="#6B7280" textAnchor="middle">
            Wx + b
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full bg-[rgba(107,140,174,0.2)] border-2 border-[rgba(107,140,174,1)]"></div>
            <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)]">Input Layer</h4>
          </div>
          <p className="text-xs text-[color:var(--color-text-secondary)]">
            Raw features from your data (e.g., house size, location, age)
          </p>
        </div>

        <div className="bg-[rgba(168,85,247,0.08)] border border-[rgba(168,85,247,0.3)] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full bg-[rgba(168,85,247,0.2)] border-2 border-[rgba(168,85,247,1)]"></div>
            <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)]">Hidden Layer</h4>
          </div>
          <p className="text-xs text-[color:var(--color-text-secondary)]">
            Learned representations. Each node computes a weighted sum of its inputs, plus a bias.
          </p>
        </div>

        <div className="bg-[rgba(255,200,87,0.08)] border border-[rgba(255,200,87,0.3)] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full bg-[rgba(255,200,87,0.2)] border-2 border-[rgba(255,200,87,1)]"></div>
            <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)]">Output Layer</h4>
          </div>
          <p className="text-xs text-[color:var(--color-text-secondary)]">
            Final prediction (e.g., house price, classification score)
          </p>
        </div>
      </div>

      {/* Forward Pass Explanation */}
      <div className="max-w-md mb-6">
        <div className="bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-4">
          <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-2">
            How Data Flows Through It
          </h4>
          <ul className="text-xs text-[color:var(--color-text-secondary)] space-y-1">
            <li>1. Data flows from input → hidden → output</li>
            <li>2. Each connection has a weight (w)</li>
            <li>3. Each node computes: Σ(w×input) + bias</li>
            <li>4. Output is the prediction</li>
          </ul>
        </div>
      </div>
    </FullScreenCard>
    </>
  );
}
