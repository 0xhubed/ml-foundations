"use client";

import { useState } from "react";
import { MathCopyBlock } from "@/components/ui/MathCopyBlock";

const STEPS = [
  {
    id: 0,
    title: "Initial State",
    description: "A simple 2-layer network with known weights. We'll predict house price from size.",
    phase: "setup",
    formula: undefined
  },
  {
    id: 1,
    title: "Forward Pass: Layer 1",
    description: "Input flows through first layer with weight w₁",
    phase: "forward",
    formula: "z_1 = w_1 \\cdot x = 0.5 \\cdot 4 = 2.0",
    calculation: { input: 4, weight: 0.5, output: 2.0 }
  },
  {
    id: 2,
    title: "Forward Pass: Activation",
    description: "Apply ReLU activation (keeps positive values unchanged)",
    phase: "forward",
    formula: "a_1 = \\text{ReLU}(z_1) = \\max(0, 2.0) = 2.0",
    calculation: { input: 2.0, output: 2.0 }
  },
  {
    id: 3,
    title: "Forward Pass: Layer 2",
    description: "Activated value flows through second layer to produce prediction",
    phase: "forward",
    formula: "\\hat{y} = w_2 \\cdot a_1 = 3.0 \\cdot 2.0 = 6.0",
    calculation: { input: 2.0, weight: 3.0, output: 6.0 }
  },
  {
    id: 4,
    title: "Compute Loss",
    description: "Compare prediction to true value using Mean Squared Error (MSE). The ½ factor is mathematical convenience: it cancels the 2 from differentiation, giving us the clean gradient ∂L/∂ŷ = ŷ - y in the next step.",
    phase: "loss",
    formula: "L = \\frac{1}{2}(\\hat{y} - y)^2 = \\frac{1}{2}(6.0 - 8.0)^2 = 2.0",
    calculation: { prediction: 6.0, actual: 8.0, loss: 2.0 }
  },
  {
    id: 5,
    title: "Backward Pass: Output Gradient",
    description: "Start backpropagation. How does loss change with prediction?",
    phase: "backward",
    formula: "\\frac{\\partial L}{\\partial \\hat{y}} = \\hat{y} - y = 6.0 - 8.0 = -2.0",
    calculation: { gradient: -2.0 },
    chainRule: null
  },
  {
    id: 6,
    title: "Backward Pass: Layer 2 Gradient (Chain Rule)",
    description: "Apply the chain rule: To find ∂L/∂w₂, multiply the gradient from the loss (∂L/∂ŷ = -2.0) by the local gradient (∂ŷ/∂w₂ = a₁ = 2.0). This tells us how changing w₂ affects the loss.",
    phase: "backward",
    formula: "\\frac{\\partial L}{\\partial w_2} = \\frac{\\partial L}{\\partial \\hat{y}} \\times \\frac{\\partial \\hat{y}}{\\partial w_2}",
    calculation: { gradient: -4.0 },
    chainRule: {
      term1: { value: -2.0, label: "∂L/∂ŷ", color: "rgba(255,200,87,1)" },
      term2: { value: 2.0, label: "∂ŷ/∂w₂ = a₁", color: "rgba(91,156,245,1)" },
      result: { value: -4.0, label: "∂L/∂w₂" }
    }
  },
  {
    id: 7,
    title: "Backward Pass: Layer 1 Gradient (Chain Rule Extended)",
    description: "Chain rule chains! We follow the path backward from loss through ŷ → a₁ → w₁. Since ReLU(2.0) has derivative = 1, we simplify: ∂a₁/∂w₁ = ∂a₁/∂z₁ × ∂z₁/∂w₁ = 1 × x = x",
    phase: "backward",
    formula: "\\frac{\\partial L}{\\partial w_1} = \\frac{\\partial L}{\\partial \\hat{y}} \\times \\frac{\\partial \\hat{y}}{\\partial a_1} \\times \\frac{\\partial a_1}{\\partial w_1}",
    calculation: { gradient: -24.0 },
    chainRule: {
      term1: { value: -2.0, label: "∂L/∂ŷ", color: "rgba(255,200,87,1)" },
      term2: { value: 3.0, label: "∂ŷ/∂a₁ = w₂", color: "rgba(91,156,245,1)" },
      term3: { value: 4.0, label: "∂a₁/∂w₁ = x", color: "rgba(107,140,174,1)" },
      result: { value: -24.0, label: "∂L/∂w₁" }
    }
  },
  {
    id: 8,
    title: "Update Weights (Gradient Descent)",
    description: "Use gradients to improve weights. Learning rate α = 0.1",
    phase: "update",
    formula: "w_\\text{new} = w_\\text{old} - \\alpha \\cdot \\frac{\\partial L}{\\partial w}",
    updates: {
      w2: { old: 3.0, gradient: -4.0, new: 3.4 },
      w1: { old: 0.5, gradient: -24.0, new: 2.9 }
    }
  }
];

export function BackpropagationVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);

  const step = STEPS[currentStep];

  const goToNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
  };

  const getNodeHighlight = (nodeId: string) => {
    const highlights: Record<string, number[]> = {
      input: [1],
      z1: [1],
      a1: [2, 3],
      yhat: [3, 4, 5, 6],
      loss: [4, 5, 6, 7, 8],
      w1: [1, 7, 8],
      w2: [3, 6, 8]
    };

    return highlights[nodeId]?.includes(currentStep);
  };

  return (
    <div className="space-y-6">
      {/* Chain Rule Definition */}
      <div className="border border-[rgba(255,255,255,0.2)] rounded-lg p-6 mb-6">
        <h4 className="text-sm font-bold text-[color:var(--color-text-primary)] mb-3 text-center">
          The Chain Rule from Calculus
        </h4>
        <div className="border border-[rgba(255,255,255,0.2)] rounded-lg p-4 mb-3">
          <MathCopyBlock expression={String.raw`\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)`} />
        </div>
        <p className="text-sm text-[color:var(--color-text-secondary)] text-center">
          When functions are composed, the derivative is the <strong>product of derivatives along the path</strong>.
          This is exactly what backpropagation does through neural network layers!
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[color:var(--color-text-secondary)]">
            Step {currentStep} of {STEPS.length - 1}
          </span>
          <span className="text-sm text-[color:var(--color-text-secondary)]">
            {step.phase === "forward" && "Forward Pass"}
            {step.phase === "loss" && "Loss Computation"}
            {step.phase === "backward" && "Backward Pass"}
            {step.phase === "update" && "Weight Update"}
            {step.phase === "setup" && "Setup"}
          </span>
        </div>
        <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[rgba(107,140,174,0.8)] to-[rgba(91,156,245,0.8)] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="border border-[rgba(255,255,255,0.1)] rounded-lg p-8 mb-6 min-h-[400px]">
        {/* Step Title */}
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold text-[color:var(--color-text-primary)] mb-2">
            {step.title}
          </h4>
          <p className="text-[color:var(--color-text-secondary)]">
            {step.description}
          </p>
        </div>

        {/* Network Visualization */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-6">
            {/* Input */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                  getNodeHighlight("input")
                    ? "bg-[rgba(107,140,174,0.3)] border-[rgba(107,140,174,1)] shadow-[0_0_20px_rgba(107,140,174,0.5)]"
                    : "bg-[rgba(107,140,174,0.1)] border-[rgba(107,140,174,0.5)]"
                }`}
              >
                x = 4
              </div>
              <span className="text-xs text-[color:var(--color-text-secondary)]">Input</span>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center">
              <div className={`h-0.5 w-12 transition-all ${currentStep >= 1 ? "bg-[rgba(107,140,174,0.8)]" : "bg-[rgba(255,255,255,0.2)]"}`} />
              <span
                className={`text-xs mt-1 font-bold transition-all ${
                  getNodeHighlight("w1")
                    ? "text-[rgba(107,140,174,1)]"
                    : "text-[color:var(--color-text-secondary)]"
                }`}
              >
                w₁={currentStep >= 8 ? "2.9" : "0.5"}
              </span>
            </div>

            {/* Hidden Layer */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                  getNodeHighlight("a1")
                    ? "bg-[rgba(91,156,245,0.3)] border-[rgba(91,156,245,1)] shadow-[0_0_20px_rgba(91,156,245,0.5)]"
                    : "bg-[rgba(91,156,245,0.1)] border-[rgba(91,156,245,0.5)]"
                }`}
              >
                a₁ = {currentStep >= 2 ? "2.0" : "?"}
              </div>
              <span className="text-xs text-[color:var(--color-text-secondary)]">Hidden</span>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center">
              <div className={`h-0.5 w-12 transition-all ${currentStep >= 3 ? "bg-[rgba(91,156,245,0.8)]" : "bg-[rgba(255,255,255,0.2)]"}`} />
              <span
                className={`text-xs mt-1 font-bold transition-all ${
                  getNodeHighlight("w2")
                    ? "text-[rgba(91,156,245,1)]"
                    : "text-[color:var(--color-text-secondary)]"
                }`}
              >
                w₂={currentStep >= 8 ? "3.4" : "3.0"}
              </span>
            </div>

            {/* Output */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                  getNodeHighlight("yhat")
                    ? "bg-[rgba(46,213,115,0.3)] border-[rgba(46,213,115,1)] shadow-[0_0_20px_rgba(46,213,115,0.5)]"
                    : "bg-[rgba(46,213,115,0.1)] border-[rgba(46,213,115,0.5)]"
                }`}
              >
                ŷ = {currentStep >= 3 ? "6.0" : "?"}
              </div>
              <span className="text-xs text-[color:var(--color-text-secondary)]">Prediction</span>
            </div>

            {/* Arrow to Loss */}
            {currentStep >= 4 && (
              <>
                <div className="h-0.5 w-12 bg-[rgba(255,200,87,0.8)]" />

                {/* Loss */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                      getNodeHighlight("loss")
                        ? "bg-[rgba(255,200,87,0.3)] border-[rgba(255,200,87,1)] shadow-[0_0_20px_rgba(255,200,87,0.5)]"
                        : "bg-[rgba(255,200,87,0.1)] border-[rgba(255,200,87,0.5)]"
                    }`}
                  >
                    L = 2.0
                  </div>
                  <span className="text-xs text-[color:var(--color-text-secondary)]">Loss</span>
                  <span className="text-xs text-[rgba(255,255,255,0.6)]">(y = 8.0)</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Step-specific Content */}
        <div className="max-w-2xl mx-auto">
          {/* Formula Display */}
          {step.formula ? (
            <div className="mb-6">
              <div className="border border-[rgba(255,255,255,0.2)] rounded-lg p-4">
                <MathCopyBlock expression={step.formula} />
              </div>
            </div>
          ) : null}

          {/* Chain Rule Breakdown */}
          {step.chainRule && (
            <div className="border border-[rgba(255,255,255,0.2)] rounded-lg p-6">
              <h5 className="text-sm font-bold text-[color:var(--color-text-primary)] mb-4 text-center">
                Chain Rule Decomposition
              </h5>

              <div className="flex items-center justify-center gap-3 mb-4">
                <div
                  className="px-4 py-2 rounded-lg border-2 font-mono text-sm"
                  style={{
                    backgroundColor: `${step.chainRule.term1.color}20`,
                    borderColor: step.chainRule.term1.color,
                    color: step.chainRule.term1.color
                  }}
                >
                  {step.chainRule.term1.label} = {step.chainRule.term1.value}
                </div>

                <span className="text-2xl text-[color:var(--color-text-primary)]">×</span>

                <div
                  className="px-4 py-2 rounded-lg border-2 font-mono text-sm"
                  style={{
                    backgroundColor: `${step.chainRule.term2.color}20`,
                    borderColor: step.chainRule.term2.color,
                    color: step.chainRule.term2.color
                  }}
                >
                  {step.chainRule.term2.label} = {step.chainRule.term2.value}
                </div>

                {step.chainRule.term3 && (
                  <>
                    <span className="text-2xl text-[color:var(--color-text-primary)]">×</span>
                    <div
                      className="px-4 py-2 rounded-lg border-2 font-mono text-sm"
                      style={{
                        backgroundColor: `${step.chainRule.term3.color}20`,
                        borderColor: step.chainRule.term3.color,
                        color: step.chainRule.term3.color
                      }}
                    >
                      {step.chainRule.term3.label} = {step.chainRule.term3.value}
                    </div>
                  </>
                )}
              </div>

              <div className="text-center">
                <div className="inline-block px-6 py-3 rounded-lg bg-[rgba(46,213,115,0.2)] border-2 border-[rgba(46,213,115,1)]">
                  <span className="font-mono text-lg text-[rgba(46,213,115,1)]">
                    {step.chainRule.result.label} = {step.chainRule.result.value}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Weight Updates */}
          {step.updates && (
            <div className="space-y-4">
              <div className="bg-[rgba(91,156,245,0.1)] border border-[rgba(91,156,245,0.5)] rounded-lg p-4">
                <div className="font-mono text-sm mb-2">
                  w₂: {step.updates.w2.old} - 0.1 × ({step.updates.w2.gradient}) = <span className="text-[rgba(46,213,115,1)] font-bold">{step.updates.w2.new}</span>
                </div>
                <div className="text-xs text-[color:var(--color-text-secondary)]">
                  Gradient is negative (-4.0), so subtracting it increases the weight. This makes sense: we predicted 6.0 but the true value was 8.0, so we need to predict higher.
                </div>
              </div>

              <div className="bg-[rgba(107,140,174,0.1)] border border-[rgba(107,140,174,0.5)] rounded-lg p-4">
                <div className="font-mono text-sm mb-2">
                  w₁: {step.updates.w1.old} - 0.1 × ({step.updates.w1.gradient}) = <span className="text-[rgba(46,213,115,1)] font-bold">{step.updates.w1.new}</span>
                </div>
                <div className="text-xs text-[color:var(--color-text-secondary)]">
                  Gradient is negative (-24.0), so this weight increases dramatically (0.5 → 2.9). This boosts the hidden layer activation, which amplifies through w₂ to increase the final prediction.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          type="button"
          onClick={goToPrevious}
          disabled={currentStep === 0}
          className="button-secondary disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={reset}
          className="button-secondary"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={goToNext}
          disabled={currentStep === STEPS.length - 1}
          className="button-primary disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Key Insights */}
      <div className="mt-8 space-y-4">
        <div className="border border-[rgba(255,255,255,0.2)] rounded-lg p-4">
          <h4 className="font-semibold text-[color:var(--color-text-primary)] mb-2">
            The Chain Rule Makes It Possible
          </h4>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            To find how loss changes with w₁, we multiply three derivatives along the path: ∂L/∂ŷ × ∂ŷ/∂a₁ × ∂a₁/∂w₁.
            This works for ANY network depth - just keep multiplying!
          </p>
        </div>

        <div className="border border-[rgba(255,255,255,0.2)] rounded-lg p-4">
          <h4 className="font-semibold text-[color:var(--color-text-primary)] mb-2">
            Why ½ in the Loss Function?
          </h4>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            The ½ factor is mathematical convenience, not about averaging examples. When we differentiate (ŷ - y)², we get 2(ŷ - y).
            The ½ cancels this 2, giving the clean gradient ∂L/∂ŷ = ŷ - y. For multiple examples, we add 1/m outside: L = (1/2m)Σ(ŷᵢ - yᵢ)².
          </p>
        </div>

        <div className="border border-[rgba(255,255,255,0.2)] rounded-lg p-4">
          <h4 className="font-semibold text-[color:var(--color-text-primary)] mb-2">
            From 2 Weights to Billions
          </h4>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            This example: 2 weights. GPT-4: ~1 trillion weights. Same algorithm - backpropagation computes gradients for ALL of them!
            That is why GPUs are essential: billions of gradient calculations in parallel.
          </p>
        </div>
      </div>
    </div>
  );
}
