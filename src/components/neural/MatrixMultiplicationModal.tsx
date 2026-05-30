"use client";

import { useEffect } from "react";
import { MathCopyBlock } from "@/components/ui/MathCopyBlock";

type MatrixMultiplicationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: MatrixClickData | null;
};

export type MatrixClickData = {
  type: "node" | "edge";
  nodeId?: string;
  nodeLabel?: string;
  layerType?: "input" | "hidden" | "output";
  fromNode?: string;
  toNode?: string;
  weight?: number;
  fromLabel?: string;
  toLabel?: string;
};

export function MatrixMultiplicationModal({ isOpen, onClose, data }: MatrixMultiplicationModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-panel p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-[color:var(--color-text-primary)]">
            {data.type === "node" && data.layerType === "hidden"
              ? "Hidden Node Computation"
              : "Matrix Multiplication Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {data.type === "node" && data.nodeId && <NodeMatrixView data={data} />}
        {data.type === "edge" && data.weight !== undefined && <EdgeMatrixView data={data} />}

        <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.1)]">
          <p className="text-sm text-[color:var(--color-text-secondary)] text-center">
            Click outside or press ESC to close
          </p>
        </div>
      </div>
    </div>
  );
}

function NodeMatrixView({ data }: { data: MatrixClickData }) {
  const isInput = data.layerType === "input";
  const isHidden = data.layerType === "hidden";
  const isOutput = data.layerType === "output";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-4">
        <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)] mb-2">
          Node: {data.nodeLabel}
        </h3>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          {isInput && "Input nodes receive raw feature values from your dataset."}
          {isHidden && "Hidden nodes perform linear transformations (weighted sums) followed by non-linear activations (ReLU). The activation function is what gives neural networks their power."}
          {isOutput && "Output node produces the final prediction."}
        </p>
      </div>

      {/* Matrix operation for hidden/output nodes */}
      {(isHidden || isOutput) && (
        <>
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-[color:var(--color-text-primary)]">
              Forward Pass Computation
            </h4>

            {isHidden && (
              <>
                <p className="text-sm text-[color:var(--color-text-secondary)] mb-4">
                  Hidden nodes perform <strong className="text-[color:var(--color-text-primary)]">two operations</strong>:
                </p>

                {/* Step 1: Linear Transformation */}
                <div className="bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-5 mb-4">
                  <h5 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3 flex items-center gap-2">
                    <span className="bg-[rgba(107,140,174,0.3)] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">1</span>
                    Linear Transformation
                  </h5>

                  <div className="bg-[rgba(12,18,26,0.8)] border border-[rgba(107,140,174,0.2)] rounded-lg p-4 mb-3">
                    <div className="font-mono text-sm text-[color:var(--color-text-secondary)]">
                      <div>z = w₁×x₁ + w₂×x₂ + b</div>
                      <div className="text-xs mt-2 text-[color:var(--color-text-secondary)] opacity-70">
                        Weighted sum of inputs
                      </div>
                    </div>
                  </div>

                  <MathCopyBlock
                    expression="z = W \cdot x + b"
                    caption="Matrix form: weighted sum"
                  />
                </div>

                {/* Step 2: Non-Linear Activation (ReLU) */}
                <div className="bg-[rgba(255,140,107,0.08)] border border-[rgba(255,140,107,0.3)] rounded-lg p-5 mb-4">
                  <h5 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3 flex items-center gap-2">
                    <span className="bg-[rgba(255,140,107,0.5)] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</span>
                    Non-Linear Activation (ReLU)
                  </h5>

                  <div className="bg-[rgba(12,18,26,0.8)] border border-[rgba(255,140,107,0.2)] rounded-lg p-4 mb-4">
                    <div className="font-mono text-sm text-[color:var(--color-accent)]">
                      <div>a = ReLU(z) = max(0, z)</div>
                      <div className="text-xs mt-2 text-[color:var(--color-text-secondary)] opacity-70">
                        Removes negative values
                      </div>
                    </div>
                  </div>

                  {/* ReLU Graph */}
                  <div className="bg-[rgba(255,255,255,0.03)] rounded-lg p-4 mb-3">
                    <svg viewBox="0 0 200 120" className="w-full max-w-xs mx-auto" role="img" aria-label="ReLU activation function">
                      {/* Grid */}
                      <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                      <line x1="60" y1="0" x2="60" y2="120" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                      {/* Axes */}
                      <line x1="60" y1="0" x2="60" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                      <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

                      {/* ReLU function: flat at 0 for negative, then linear */}
                      <line x1="0" y1="80" x2="60" y2="80" stroke="rgba(255,140,107,1)" strokeWidth="3" />
                      <line x1="60" y1="80" x2="180" y2="20" stroke="rgba(255,140,107,1)" strokeWidth="3" />

                      {/* Origin point */}
                      <circle cx="60" cy="80" r="3" fill="rgba(255,140,107,1)" />

                      {/* Labels */}
                      <text x="100" y="15" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle">a</text>
                      <text x="185" y="95" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle">z</text>
                      <text x="50" y="95" fill="rgba(255,255,255,0.5)" fontSize="9">0</text>

                      {/* Annotations */}
                      <text x="30" y="73" fill="rgba(255,255,255,0.4)" fontSize="8">a = 0</text>
                      <text x="130" y="40" fill="rgba(255,140,107,0.9)" fontSize="8">a = z</text>
                    </svg>
                    <p className="text-xs text-center text-[color:var(--color-text-secondary)] mt-2">
                      ReLU(z) = max(0, z)
                    </p>
                  </div>
                </div>

                {/* Critical Insight */}
                <div className="bg-[rgba(255,200,87,0.08)] border-l-4 border-[rgba(255,200,87,1)] p-5">
                  <div className="mb-3">
                    <h5 className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                      Critical Insight: Why ReLU Matters
                    </h5>
                  </div>

                  <p className="text-sm text-[color:var(--color-text-secondary)] mb-3">
                    <strong className="text-[color:var(--color-text-primary)]">Without this ReLU activation</strong>, stacking multiple layers would collapse into a single linear regression:
                  </p>

                  <div className="bg-[rgba(12,18,26,0.9)] border border-[rgba(255,200,87,0.2)] rounded-lg p-4 mb-3 font-mono text-xs overflow-x-auto">
                    <div className="text-[color:var(--color-text-secondary)] space-y-1">
                      <div>Layer 1: z₁ = W₁x + b₁</div>
                      <div>Layer 2: y = W₂z₁ + b₂</div>
                      <div className="opacity-50">─────────────────────────</div>
                      <div>Substituting:</div>
                      <div className="text-[rgba(255,200,87,0.9)]">y = W₂(W₁x + b₁) + b₂</div>
                      <div className="text-[rgba(255,200,87,0.9)]">y = (W₂W₁)x + (W₂b₁ + b₂)</div>
                      <div className="text-[rgba(255,200,87,1)] font-semibold mt-2">y = W_combined·x + b_combined</div>
                    </div>
                  </div>

                  <div className="bg-[rgba(255,255,255,0.05)] rounded p-3">
                    <p className="text-sm text-[color:var(--color-text-secondary)]">
                      <strong className="text-[color:var(--color-accent)]">ReLU breaks this linearity</strong>, enabling the network to learn complex, non-linear patterns!
                    </p>
                  </div>
                </div>
              </>
            )}

            {isOutput && (
              <>
                <p className="text-sm text-[color:var(--color-text-secondary)]">
                  The output node combines all hidden layer activations:
                </p>

                <div className="bg-[rgba(12,18,26,0.8)] border border-[rgba(107,140,174,0.2)] rounded-lg p-6 font-mono text-sm overflow-x-auto">
                  <div className="space-y-2 text-[color:var(--color-text-secondary)]">
                    <div>y = w₁×h₁ + w₂×h₂ + w₃×h₃ + w₄×h₄ + b</div>
                    <div className="text-xs pt-2 border-t border-[rgba(255,255,255,0.1)] text-[color:var(--color-text-secondary)]">
                      where h₁, h₂, h₃, h₄ are hidden layer outputs and b is the output bias
                    </div>
                  </div>
                </div>

                <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-2">Matrix Form</h5>
                  <div className="grid grid-cols-[auto_auto_auto_auto_auto] gap-2 items-center justify-center font-mono text-sm mb-3">
                    <div className="text-center">
                      <div className="text-[color:var(--color-text-secondary)]">Weights</div>
                      <div className="mt-2 border border-[rgba(107,140,174,0.3)] rounded p-3 bg-[rgba(107,140,174,0.05)]">
                        <div>[1×4]</div>
                      </div>
                    </div>
                    <div className="text-2xl text-[color:var(--color-text-secondary)]">×</div>
                    <div className="text-center">
                      <div className="text-[color:var(--color-text-secondary)]">Hidden</div>
                      <div className="mt-2 border border-[rgba(125,163,198,0.3)] rounded p-3 bg-[rgba(125,163,198,0.05)]">
                        <div>[4×1]</div>
                      </div>
                    </div>
                    <div className="text-2xl text-[color:var(--color-text-secondary)]">=</div>
                    <div className="text-center">
                      <div className="text-[color:var(--color-text-secondary)]">Output</div>
                      <div className="mt-2 border border-[rgba(255,200,87,0.3)] rounded p-3 bg-[rgba(255,200,87,0.05)]">
                        <div>[1×1]</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[color:var(--color-text-secondary)]">
                    1 output neuron combining 4 hidden activations
                  </p>
                </div>
              </>
            )}
          </div>

        </>
      )}

      {isInput && (
        <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4">
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            Input nodes don't perform matrix multiplication. They simply pass their values to the next layer.
            The matrix multiplication happens at the receiving layer (hidden layer), where each hidden neuron
            computes a weighted sum of all inputs.
          </p>
        </div>
      )}
    </div>
  );
}

function EdgeMatrixView({ data }: { data: MatrixClickData }) {
  const weight = data.weight!;
  const isPositive = weight > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-4">
        <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)] mb-2">
          Connection: {data.fromLabel} → {data.toLabel}
        </h3>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          This connection has a weight of <strong className="text-[color:var(--color-text-primary)]">{weight.toFixed(3)}</strong>
        </p>
      </div>

      {/* Weight visualization */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-[color:var(--color-text-primary)]">
          Single Weight Contribution
        </h4>

        <div className="bg-[rgba(12,18,26,0.8)] border border-[rgba(107,140,174,0.2)] rounded-lg p-6">
          <div className="font-mono text-sm space-y-3">
            <div className="text-[color:var(--color-text-secondary)]">
              contribution = {weight.toFixed(3)} × {data.fromLabel}_value
            </div>
            <div className="text-xs text-[color:var(--color-text-secondary)] pt-2 border-t border-[rgba(255,255,255,0.1)]">
              {isPositive ? (
                <span className="text-[rgba(107,140,174,1)]">Positive weight: strengthens the signal</span>
              ) : (
                <span className="text-[rgba(91,156,245,1)]">Negative weight: suppresses the signal</span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4">
          <h5 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
            Position in Weight Matrix
          </h5>
          <p className="text-sm text-[color:var(--color-text-secondary)] mb-3">
            This weight is one element in the weight matrix W:
          </p>

          <div className="bg-[rgba(12,18,26,0.8)] rounded p-4 font-mono text-xs overflow-x-auto">
            <div className="text-[color:var(--color-text-secondary)]">
              <div className="mb-2">W = [</div>
              <div className="ml-6 space-y-1">
                <div>[w₁₁  w₁₂]</div>
                <div>[w₂₁  w₂₂]</div>
                <div>[w₃₁  w₃₂]</div>
                <div>[w₄₁  w₄₂]</div>
              </div>
              <div>]</div>
            </div>
          </div>

          <p className="text-xs text-[color:var(--color-text-secondary)] mt-3">
            Each row corresponds to one output neuron. Each column corresponds to one input value. This network has 2 inputs and 4 hidden neurons.
          </p>
        </div>

        <MathCopyBlock
          expression="z_j = \sum_{i=1}^{n} w_{ji} x_i + b_j"
          caption="This weight (w) is one term in the summation"
        />
      </div>

      <div className="bg-[rgba(255,200,87,0.08)] border border-[rgba(255,200,87,0.3)] rounded-lg p-4">
        <h5 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-2">
          Training Updates This Weight
        </h5>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          During backpropagation, gradient descent adjusts this weight to minimize the cost function.
          If the network makes errors, this weight will be updated: <code className="font-mono">w := w - α × ∂L/∂w</code>
        </p>
      </div>
    </div>
  );
}
