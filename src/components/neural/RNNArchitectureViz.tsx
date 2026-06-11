"use client";

import { useState } from "react";

type TimeStep = {
  t: number;
  input: string;
  inputValue: number;
  hiddenState: number;
  output: number;
};

export function RNNArchitectureViz() {
  const [showWeights, setShowWeights] = useState(true);
  const [currentStep, setCurrentStep] = useState(2); // Show all 3 time steps by default

  // Example sequence: "The cat sat"
  const sequence: TimeStep[] = [
    { t: 0, input: "The", inputValue: 0.8, hiddenState: 0.65, output: 0.72 },
    { t: 1, input: "cat", inputValue: 0.6, hiddenState: 0.82, output: 0.68 },
    { t: 2, input: "sat", inputValue: 0.9, hiddenState: 0.71, output: 0.85 },
  ];

  // Weights (simplified for visualization)
  const weights = {
    input_to_hidden: 0.75,
    hidden_to_hidden: 0.85, // Recurrent weight
    hidden_to_output: 0.62,
  };

  const visibleSteps = sequence.slice(0, currentStep + 1);

  return (
    <div className="glass-panel p-4 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
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
        <div className="flex items-center gap-3">
          <span className="text-sm text-[color:var(--color-text-secondary)]">Time steps:</span>
          <div className="flex gap-2">
            {[0, 1, 2].map((step) => (
              <button
                key={step}
                type="button"
                onClick={() => setCurrentStep(step)}
                className={`px-3 py-1 rounded text-sm transition-all ${
                  currentStep === step
                    ? "bg-[rgba(107,140,174,0.15)] border-2 border-[rgba(107,140,174,1)] text-[rgba(107,140,174,1)]"
                    : "bg-white border border-gray-300 text-[color:var(--color-text-secondary)] hover:border-gray-400"
                }`}
              >
                t={step}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RNN Unfolded Architecture - Horizontal Layout */}
      <p className="mb-2 text-xs text-[color:var(--color-text-secondary)] lg:hidden">
        Swipe sideways to see all time steps →
      </p>
      <div className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-8 overflow-x-auto">
        <div className="min-w-[900px]">

          {/* Time step columns flowing left to right */}
          <div className="flex gap-16 justify-center items-center">
            {visibleSteps.map((step, idx) => (
              <div key={step.t} className="relative flex flex-col items-center">
                {/* Time step label at top */}
                <div className="mb-6 text-sm font-semibold text-[color:var(--color-text-primary)]">
                  t = {step.t}
                </div>

                {/* Vertical stack for this time step: Output → Hidden → Input */}
                <div className="relative flex flex-col items-center gap-8" style={{ width: "140px", height: "400px" }}>

                  {/* Output Layer */}
                  <div className="flex items-center gap-3">
                    {idx === 0 && (
                      <div className="text-xs font-semibold text-[rgba(255,200,87,1)] w-20 text-right">
                        Output<br/>Layer
                      </div>
                    )}
                    <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-[rgba(255,200,87,1)] bg-[rgba(255,200,87,0.15)]">
                      <div className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                        y<sub>{step.t}</sub>
                      </div>
                      <div className="text-xs text-[rgba(255,200,87,1)] font-mono">
                        {step.output.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Connection: Hidden → Output */}
                  <div className="relative -my-6">
                    <svg width="140" height="40" className="absolute" style={{ left: "-10px", top: "-20px" }}>
                      <line x1="70" y1="0" x2="70" y2="40" stroke="rgba(125,163,198,0.4)" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Hidden Layer with recurrent connection */}
                  <div className="flex items-center gap-3 relative">
                    {idx === 0 && (
                      <div className="text-xs font-semibold text-[rgba(125,163,198,1)] w-20 text-right">
                        Hidden<br/>Layer
                      </div>
                    )}

                    {/* Recurrent connection from previous time step */}
                    {idx > 0 && (
                      <svg width="120" height="60" className="absolute" style={{ left: "-168px", top: "-20px" }}>
                        <defs>
                          <marker
                            id={`arrow-${step.t}`}
                            markerWidth="10"
                            markerHeight="10"
                            refX="9"
                            refY="3"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 3, 0 6" fill="rgba(91,156,245,1)" />
                          </marker>
                        </defs>
                        <path
                          d="M 15 30 Q 60 10, 105 30"
                          stroke="rgba(91,156,245,0.8)"
                          strokeWidth="2.5"
                          fill="none"
                          markerEnd={`url(#arrow-${step.t})`}
                        />
                      </svg>
                    )}

                    <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-[rgba(125,163,198,1)] bg-[rgba(125,163,198,0.15)]">
                      <div className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                        h<sub>{step.t}</sub>
                      </div>
                      <div className="text-xs text-[rgba(125,163,198,1)] font-mono">
                        {step.hiddenState.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Connection: Input → Hidden */}
                  <div className="relative -my-6">
                    <svg width="140" height="40" className="absolute" style={{ left: "-10px", top: "-20px" }}>
                      <line x1="70" y1="0" x2="70" y2="40" stroke="rgba(107,140,174,0.4)" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Input Layer */}
                  <div className="flex items-center gap-3">
                    {idx === 0 && (
                      <div className="text-xs font-semibold text-[rgba(107,140,174,1)] w-20 text-right">
                        Input<br/>Layer
                      </div>
                    )}
                    <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-[rgba(107,140,174,1)] bg-[rgba(107,140,174,0.15)]">
                      <div className="text-xs font-semibold text-[color:var(--color-text-primary)]">
                        x<sub>{step.t}</sub>
                      </div>
                      <div className="text-xs text-[rgba(107,140,174,1)] font-semibold">
                        {step.input}
                      </div>
                      <div className="text-xs text-[color:var(--color-text-secondary)] font-mono">
                        {step.inputValue.toFixed(1)}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Formula under each time step */}
                <div className="mt-4 text-xs text-center text-[color:var(--color-text-secondary)]">
                  <div className="font-mono text-[rgba(125,163,198,1)]">
                    h<sub>{step.t}</sub> = σ(W<sub>x</sub>x<sub>{step.t}</sub> + W<sub>h</sub>h<sub>{step.t > 0 ? step.t-1 : 0}</sub>)
                  </div>
                </div>

                {/* Weight legend below each time step */}
                {showWeights && (
                  <div className="mt-3 bg-white border border-gray-300 rounded-lg p-3 text-xs space-y-1 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-[rgba(107,140,174,1)]"></div>
                      <span className="text-[rgba(107,140,174,1)] font-mono font-semibold">W<sub>x</sub>: {weights.input_to_hidden}</span>
                    </div>
                    {idx > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-0.5 bg-[rgba(91,156,245,1)]"></div>
                        <span className="text-[rgba(91,156,245,1)] font-mono font-semibold">W<sub>h</sub>: {weights.hidden_to_hidden}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-[rgba(125,163,198,1)]"></div>
                      <span className="text-[rgba(125,163,198,1)] font-mono font-semibold">W<sub>y</sub>: {weights.hidden_to_output}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Show continuation dots if not all steps visible */}
            {currentStep < 2 && (
              <div className="flex items-center justify-center" style={{ height: "400px" }}>
                <div className="text-4xl text-[color:var(--color-text-secondary)] opacity-40">
                  ...
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-12 pt-6 border-t border-gray-300">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-[rgba(107,140,174,0.3)] border border-[rgba(107,140,174,1)]"></div>
                  <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">Input Layer</span>
                </div>
                <p className="text-xs text-[color:var(--color-text-secondary)]">
                  Each word in the sequence (tokenized and embedded)
                </p>
              </div>

              <div className="bg-[rgba(125,163,198,0.08)] border border-[rgba(125,163,198,0.3)] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-[rgba(125,163,198,0.3)] border border-[rgba(125,163,198,1)]"></div>
                  <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">Hidden Layer</span>
                </div>
                <p className="text-xs text-[color:var(--color-text-secondary)]">
                  Memory that carries information forward through time
                </p>
              </div>

              <div className="bg-[rgba(255,200,87,0.08)] border border-[rgba(255,200,87,0.3)] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-[rgba(255,200,87,0.3)] border border-[rgba(255,200,87,1)]"></div>
                  <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">Output Layer</span>
                </div>
                <p className="text-xs text-[color:var(--color-text-secondary)]">
                  Prediction at each time step
                </p>
              </div>
            </div>

            {/* Key insight about recurrent connections */}
            <div className="mt-4 bg-[rgba(91,156,245,0.08)] border border-[rgba(91,156,245,0.3)] rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl text-[rgba(91,156,245,1)]">→</div>
                <div>
                  <div className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-1">
                    Recurrent Connections (Pink Arrows)
                  </div>
                  <p className="text-xs text-[color:var(--color-text-secondary)]">
                    The hidden state h<sub>t-1</sub> from the previous time step feeds into the current time step.
                    This is what gives RNNs their memory and allows them to process sequences. Notice how information
                    flows horizontally through time (t=0 → t=1 → t=2).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison with Feed-Forward */}
      <div className="mt-8 bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-6">
        <h4 className="text-lg font-semibold text-[color:var(--color-text-primary)] mb-3">
          Key Difference from Feed-Forward Networks
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-2">
              Feed-Forward (No Memory)
            </div>
            <ul className="text-xs text-[color:var(--color-text-secondary)] space-y-1">
              <li>• Processes each input independently</li>
              <li>• No connections between time steps</li>
              <li>• Cannot remember previous inputs</li>
              <li>• Works great for: images, fixed-size data</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-[rgba(125,163,198,1)] mb-2">
              RNN (With Memory)
            </div>
            <ul className="text-xs text-[color:var(--color-text-secondary)] space-y-1">
              <li>• Hidden state carries information forward</li>
              <li>• Recurrent connections link time steps</li>
              <li>• Maintains context from previous inputs</li>
              <li>• Works for: text, speech, time series</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
