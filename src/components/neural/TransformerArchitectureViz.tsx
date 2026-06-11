"use client";

import { useState } from "react";

export function TransformerArchitectureViz() {
  const [showWeights, setShowWeights] = useState(false);
  const [showAttention, setShowAttention] = useState(true);
  const [selectedToken, setSelectedToken] = useState<number | null>(1); // "cat" selected by default

  const tokens = ["The", "cat", "sat"];
  const tokenEmbeddings = [0.8, 0.6, 0.9];

  // Simulated attention scores (how much each token attends to others)
  const attentionMatrix = [
    [0.2, 0.3, 0.5], // "The" attends to: The(0.2), cat(0.3), sat(0.5)
    [0.1, 0.6, 0.3], // "cat" attends to: The(0.1), cat(0.6), sat(0.3)
    [0.4, 0.4, 0.2], // "sat" attends to: The(0.4), cat(0.4), sat(0.2)
  ];

  const getAttentionOpacity = (from: number, to: number) => {
    if (selectedToken === null) return 0.3;
    if (selectedToken !== from) return 0.1;
    return attentionMatrix[from][to];
  };

  const getAttentionColor = (from: number, to: number) => {
    const score = attentionMatrix[from][to];
    if (score > 0.4) return "rgba(91,156,245,0.8)"; // Strong attention
    if (score > 0.25) return "rgba(125,163,198,0.8)"; // Medium attention
    return "rgba(107,140,174,0.6)"; // Weak attention
  };

  return (
    <div className="glass-panel p-4 sm:p-8">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
            <input
              type="checkbox"
              checked={showAttention}
              onChange={(e) => setShowAttention(e.target.checked)}
              className="w-4 h-4"
            />
            Show Attention Connections
          </label>
          <label className="flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
            <input
              type="checkbox"
              checked={showWeights}
              onChange={(e) => setShowWeights(e.target.checked)}
              className="w-4 h-4"
            />
            Show Weights
          </label>
        </div>
        <button
          type="button"
          onClick={() => setSelectedToken(null)}
          className="text-xs px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 border border-gray-300 text-[color:var(--color-text-secondary)]"
        >
          Clear Selection
        </button>
      </div>

      {/* Main Transformer Architecture */}
      <p className="mb-2 text-xs text-[color:var(--color-text-secondary)] lg:hidden">
        Swipe sideways to see the full architecture →
      </p>
      <div className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-8 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Architecture Layers */}
          <div className="relative" style={{ height: "600px" }}>
            {/* Layer Labels */}
            <div className="absolute top-0 left-0 right-0 grid grid-cols-3 gap-8 text-center mb-4">
              <div className="text-sm font-semibold text-[rgba(107,140,174,1)]">Input + Positional Encoding</div>
              <div className="text-sm font-semibold text-[rgba(91,156,245,1)]">Self-Attention Layer</div>
              <div className="text-sm font-semibold text-[rgba(255,200,87,1)]">Feed-Forward + Output</div>
            </div>

            <svg width="100%" height="600" className="absolute inset-0">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="rgba(125,163,198,0.6)" />
                </marker>
              </defs>

              {/* Connections: Input to Attention */}
              {tokens.map((_, idx) => {
                const inputX = 150;
                const inputY = 150 + idx * 100;
                const attnX = 400;
                const attnY = 150 + idx * 100;

                return (
                  <line
                    key={`input-attn-${idx}`}
                    x1={inputX + 40}
                    y1={inputY}
                    x2={attnX - 40}
                    y2={attnY}
                    stroke="rgba(107,140,174,0.3)"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                );
              })}

              {/* Attention Connections (all-to-all) */}
              {showAttention && tokens.map((_, fromIdx) => {
                return tokens.map((_, toIdx) => {
                  const fromX = 400;
                  const fromY = 150 + fromIdx * 100;
                  const toX = 400;
                  const toY = 150 + toIdx * 100;

                  if (fromIdx === toIdx) return null; // Skip self-connections for clarity

                  // Create curved path
                  const midX = fromX - 80;
                  const path = `M ${fromX - 35} ${fromY} Q ${midX} ${(fromY + toY) / 2} ${toX - 35} ${toY}`;

                  return (
                    <path
                      key={`attn-${fromIdx}-${toIdx}`}
                      d={path}
                      stroke={getAttentionColor(fromIdx, toIdx)}
                      strokeWidth="2"
                      fill="none"
                      opacity={getAttentionOpacity(fromIdx, toIdx)}
                      markerEnd="url(#arrowhead)"
                    />
                  );
                });
              })}

              {/* Connections: Attention to Output */}
              {tokens.map((_, idx) => {
                const attnX = 400;
                const attnY = 150 + idx * 100;
                const outX = 650;
                const outY = 150 + idx * 100;

                return (
                  <line
                    key={`attn-out-${idx}`}
                    x1={attnX + 40}
                    y1={attnY}
                    x2={outX - 40}
                    y2={outY}
                    stroke="rgba(125,163,198,0.3)"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                );
              })}

              {/* Weight labels */}
              {showWeights && (
                <>
                  <text x="270" y="145" fill="rgba(107,140,174,1)" fontSize="11" fontWeight="bold">
                    W<tspan fontSize="8" dy="3">embed</tspan>
                  </text>
                  <text x="520" y="145" fill="rgba(125,163,198,1)" fontSize="11" fontWeight="bold">
                    W<tspan fontSize="8" dy="3">out</tspan>
                  </text>
                </>
              )}
            </svg>

            {/* Input Layer Nodes */}
            <div className="absolute" style={{ left: "110px", top: "50px" }}>
              {tokens.map((token, idx) => (
                <div
                  key={`input-${idx}`}
                  className="flex flex-col items-center mb-12"
                  style={{ marginTop: idx === 0 ? "0" : "0" }}
                >
                  <div
                    className="relative flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-[rgba(107,140,174,1)] bg-[rgba(107,140,174,0.15)] cursor-pointer hover:bg-[rgba(107,140,174,0.25)] transition-all"
                    style={{ marginBottom: "28px" }}
                  >
                    <div className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                      {token}
                    </div>
                    <div className="text-xs text-[rgba(107,140,174,1)] font-mono">
                      {tokenEmbeddings[idx].toFixed(1)}
                    </div>
                    <div className="absolute -bottom-6 text-xs text-[color:var(--color-text-secondary)]">
                      + pos[{idx}]
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Attention Layer Nodes */}
            <div className="absolute" style={{ left: "360px", top: "50px" }}>
              {tokens.map((token, idx) => (
                <div
                  key={`attn-${idx}`}
                  className="flex flex-col items-center mb-12"
                >
                  <div
                    className={`relative flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 cursor-pointer transition-all ${
                      selectedToken === idx
                        ? "border-[rgba(91,156,245,1)] bg-[rgba(91,156,245,0.25)] shadow-[0_0_20px_rgba(91,156,245,0.4)]"
                        : "border-[rgba(91,156,245,0.6)] bg-[rgba(91,156,245,0.15)] hover:bg-[rgba(91,156,245,0.25)]"
                    }`}
                    style={{ marginBottom: "28px" }}
                    onClick={() => setSelectedToken(selectedToken === idx ? null : idx)}
                  >
                    <div className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                      a<sub>{idx}</sub>
                    </div>
                    <div className="text-xs text-[rgba(91,156,245,1)]">
                      Attention
                    </div>
                    <div className="absolute -bottom-6 text-xs text-[rgba(91,156,245,1)] font-mono">
                      Q·K·V
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Output Layer Nodes */}
            <div className="absolute" style={{ left: "610px", top: "50px" }}>
              {tokens.map((token, idx) => (
                <div
                  key={`output-${idx}`}
                  className="flex flex-col items-center mb-12"
                >
                  <div
                    className="relative flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-[rgba(255,200,87,1)] bg-[rgba(255,200,87,0.15)]"
                    style={{ marginBottom: "28px" }}
                  >
                    <div className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                      y<sub>{idx}</sub>
                    </div>
                    <div className="text-xs text-[rgba(255,200,87,1)]">
                      {token}
                    </div>
                    <div className="absolute -bottom-6 text-xs text-[color:var(--color-text-secondary)]">
                      Output
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Instruction */}
          {showAttention && (
            <div className="mt-8 bg-[rgba(91,156,245,0.08)] border border-[rgba(91,156,245,0.3)] rounded-lg p-4">
              <div className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-2">
                Click on any attention node to see its attention pattern
              </div>
              <p className="text-xs text-[color:var(--color-text-secondary)]">
                {selectedToken !== null ? (
                  <>
                    <strong className="text-[rgba(91,156,245,1)]">"{tokens[selectedToken]}"</strong> is attending to:{" "}
                    {tokens.map((t, idx) => (
                      <span key={idx}>
                        <strong>{t}</strong> ({(attentionMatrix[selectedToken][idx] * 100).toFixed(0)}%)
                        {idx < tokens.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </>
                ) : (
                  "Select a token in the attention layer to see how it attends to all other tokens"
                )}
              </p>
            </div>
          )}

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-gray-300">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-[rgba(107,140,174,0.3)] border border-[rgba(107,140,174,1)]"></div>
                  <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">Input + Positional</span>
                </div>
                <p className="text-xs text-[color:var(--color-text-secondary)]">
                  Token embeddings + position information. All tokens processed in parallel.
                </p>
              </div>

              <div className="bg-[rgba(91,156,245,0.08)] border border-[rgba(91,156,245,0.3)] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-[rgba(91,156,245,0.3)] border border-[rgba(91,156,245,1)]"></div>
                  <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">Self-Attention</span>
                </div>
                <p className="text-xs text-[color:var(--color-text-secondary)]">
                  Each token attends to all others. Query, Key, Value mechanism.
                </p>
              </div>

              <div className="bg-[rgba(255,200,87,0.08)] border border-[rgba(255,200,87,0.3)] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-[rgba(255,200,87,0.3)] border border-[rgba(255,200,87,1)]"></div>
                  <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">Feed-Forward + Output</span>
                </div>
                <p className="text-xs text-[color:var(--color-text-secondary)]">
                  Non-linear transformation and final predictions per token.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attention Matrix Visualization */}
      <div className="mt-6 bg-[rgba(91,156,245,0.08)] border border-[rgba(91,156,245,0.3)] rounded-lg p-4">
        <div className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
          Attention Matrix (Simplified)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="p-2 text-left text-[color:var(--color-text-secondary)]">Token</th>
                {tokens.map((token, idx) => (
                  <th key={idx} className="p-2 text-center text-[rgba(107,140,174,1)]">
                    {token}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, fromIdx) => (
                <tr key={fromIdx}>
                  <td className="p-2 font-semibold text-[rgba(107,140,174,1)]">{token}</td>
                  {tokens.map((_, toIdx) => {
                    const score = attentionMatrix[fromIdx][toIdx];
                    const bgOpacity = score;
                    return (
                      <td
                        key={toIdx}
                        className="p-2 text-center font-mono"
                        style={{
                          background: `rgba(91,156,245,${bgOpacity})`,
                          color: score > 0.4 ? "white" : "rgba(255,255,255,0.7)"
                        }}
                      >
                        {(score * 100).toFixed(0)}%
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[color:var(--color-text-secondary)] mt-3">
          Each row shows how much that token attends to every other token. This is computed in parallel for all tokens.
        </p>
      </div>
    </div>
  );
}
