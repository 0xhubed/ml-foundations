"use client";

import dynamic from "next/dynamic";
import { useMemo, useState, useEffect } from "react";
import type { Config, Data, Layout } from "plotly.js";
import { BlockMath, InlineMath } from "react-katex";
import { FullScreenCard } from "@/components/ui/FullScreenCard";
import { ViewModeButtons } from "./shared/ViewModeButtons";
import { VCRControls } from "./shared/VCRControls";
import { ParameterSlider } from "./shared/ParameterSlider";
import { lightThemeLayout3D, lightSurfaceColorscale, PLOTLY_COLORS } from "@/lib/plotlyLightTheme";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center text-sm text-[color:var(--color-text-secondary)]">
      Loading gradient descent…
    </div>
  ),
});

type GradientStep = {
  x: number;
  y: number;
  cost: number;
  gradX: number;
  gradY: number;
};

export function GradientDescentExplorer() {
  const [viewMode, setViewMode] = useState<"path" | "steps" | "both">("path");
  const [learningRate, setLearningRate] = useState(0.15);
  const [startPoint, setStartPoint] = useState<"far" | "medium" | "near">("far");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Bowl-shaped cost function centered at (5, 50): f(w,b) = (w-5)² + 0.05*(b-50)²
  // Scaling 0.05 makes b gradient comparable to w gradient visually
  const calculateCost = (w: number, b: number) => {
    return (w - 5) * (w - 5) + 0.05 * (b - 50) * (b - 50);
  };

  // Gradient: [2(w-5), 0.1*(b-50)]
  const calculateGradients = (w: number, b: number) => {
    return {
      gradX: 2 * (w - 5),
      gradY: 0.1 * (b - 50),
    };
  };

  // Generate gradient descent path
  const descentPath = useMemo(() => {
    const steps: GradientStep[] = [];

    // Define starting points: far, medium, or near the minimum (5, 50)
    const startPositions = {
      far: { x: 1.5, y: 60 },
      medium: { x: 3.0, y: 55 },
      near: { x: 4.2, y: 52 },
    };

    let { x, y } = startPositions[startPoint];

    for (let i = 0; i < 100; i++) {
      const cost = calculateCost(x, y);
      const { gradX, gradY } = calculateGradients(x, y);
      steps.push({ x, y, cost, gradX, gradY });

      // Update parameters using gradient descent
      x = x - learningRate * gradX;
      y = y - learningRate * gradY;

      // Stop if converged (very close to minimum)
      if (cost < 0.01) break;
    }

    return steps;
  }, [learningRate, startPoint]);

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= descentPath.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [isPlaying, descentPath.length]);

  // 3D surface data
  const surfaceData = useMemo(() => {
    // Create a nice bowl-shaped surface: w from 0 to 10, b from 35 to 65
    const xRange = Array.from({ length: 50 }, (_, i) => 0 + i * (10 / 49));
    const yRange = Array.from({ length: 50 }, (_, i) => 35 + i * (30 / 49));
    const zValues = yRange.map((y) => xRange.map((x) => calculateCost(x, y)));

    const surface: Partial<Data> = {
      type: "surface",
      x: xRange,
      y: yRange,
      z: zValues,
      colorscale: lightSurfaceColorscale,
      opacity: 0.75,
      showscale: false,
      contours: {
        z: {
          show: true,
          usecolormap: false,
          highlightcolor: "rgba(26,26,26,0.4)",
          width: 1.5,
          start: 0,
          end: 24,
          size: 3,  // Contour line every 3 units (~8 lines total)
        },
      },
    };

    const pathTrace: Partial<Data> = {
      type: "scatter3d",
      mode: "lines+markers",
      x: descentPath.slice(0, currentStep + 1).map((s) => s.x),
      y: descentPath.slice(0, currentStep + 1).map((s) => s.y),
      z: descentPath.slice(0, currentStep + 1).map((s) => s.cost),
      line: {
        color: PLOTLY_COLORS.descentPath,
        width: 6,
      },
      marker: {
        size: 5,
        color: PLOTLY_COLORS.descentPath,
      },
      name: "Descent Path",
    };

    const currentMarker: Partial<Data> = {
      type: "scatter3d",
      mode: "markers",
      x: [descentPath[currentStep].x],
      y: [descentPath[currentStep].y],
      z: [descentPath[currentStep].cost],
      marker: {
        size: 10,
        color: PLOTLY_COLORS.accent,
        symbol: "diamond",
        line: { width: 2, color: "#FFFFFF" },
      },
      name: "Current",
    };

    const layout: Partial<Layout> = {
      ...lightThemeLayout3D,
      autosize: true,
      height: 600,
      margin: { l: 0, r: 0, t: 0, b: 0 },
      scene: {
        ...lightThemeLayout3D.scene,
        aspectratio: { x: 1.6, y: 1.6, z: 0.7 },
        xaxis: {
          ...lightThemeLayout3D.scene?.xaxis,
          title: { text: "w", font: { size: 18, color: "#1A1A1A" } },
        },
        yaxis: {
          ...lightThemeLayout3D.scene?.yaxis,
          title: { text: "b", font: { size: 18, color: "#1A1A1A" } },
        },
        zaxis: {
          ...lightThemeLayout3D.scene?.zaxis,
          title: { text: "J(w,b)", font: { size: 18, color: "#1A1A1A" } },
        },
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.3 },
        },
      },
    };

    return { data: [surface, pathTrace, currentMarker], layout };
  }, [descentPath, currentStep]);

  const config: Partial<Config> = useMemo(
    () => ({
      displaylogo: false,
      responsive: true,
      staticPlot: false,
    }),
    [],
  );

  const currentStepData = descentPath[currentStep];

  const resetPath = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <FullScreenCard className="glass-panel p-6" title="Gradient Descent Explorer">
      {/* Mathematical Formula */}
      <div className="mb-6 bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cost Function */}
          <div>
            <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
              Cost Function
            </h4>
            <div className="flex justify-start">
              <BlockMath math="J(w,b) = \frac{1}{m} \sum_{i=1}^{m} (f_{w,b}(x^{(i)}) - y^{(i)})^2" />
            </div>
          </div>

          {/* Gradient Descent Update Rule */}
          <div>
            <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
              Gradient Descent Update Rule
            </h4>
            <div className="flex flex-wrap justify-start gap-4">
              <BlockMath math="w := w - \alpha \frac{\partial J}{\partial w}" />
              <BlockMath math="b := b - \alpha \frac{\partial J}{\partial b}" />
            </div>
          </div>
        </div>
        <p className="text-xs text-[color:var(--color-text-secondary)] mt-4 text-center">
          where α is the learning rate, J is the cost function
        </p>
      </div>

      <div className="mb-6">
        <ViewModeButtons
          modes={[
            { id: "path", label: "Path on Surface" },
            { id: "steps", label: "Iteration Steps" },
            { id: "both", label: "Both" },
          ]}
          active={viewMode}
          onChange={(mode) => setViewMode(mode as "path" | "steps" | "both")}
        />
      </div>

      {(viewMode === "path" || viewMode === "both") && (
        <div className="relative mb-6 w-full max-w-[1400px] mx-auto">
          <Plot
            data={surfaceData.data}
            layout={surfaceData.layout}
            config={config}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      {(viewMode === "steps" || viewMode === "both") && (
        <div className="mb-6 space-y-3 max-h-[400px] overflow-y-auto">
          {descentPath.slice(0, currentStep + 1).map((step, idx) => {
            // Calculate next step values (if not the last step)
            const nextStep = descentPath[idx + 1];
            const showUpdate = idx < descentPath.length - 1 && nextStep;

            return (
              <div
                key={idx}
                className={`border rounded-lg p-3 text-sm ${
                  idx === currentStep
                    ? "border-[rgba(217,119,6,0.4)] bg-[rgba(217,119,6,0.04)]"
                    : "border-[rgba(0,0,0,0.1)] bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold text-[color:var(--color-text-primary)]">Step {idx + 1}</span>
                  <span className="text-xs text-[color:var(--color-text-secondary)]">
                    <InlineMath math={`f(w, b) = ${step.cost.toFixed(4)}`} />
                  </span>
                </div>

                {/* Current values and gradients */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-2.5 text-xs">
                  <div className="flex items-center gap-1.5">
                    <InlineMath math="w =" />
                    <span className="font-mono text-[color:var(--color-accent)] font-semibold">{step.x.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <InlineMath math="b =" />
                    <span className="font-mono text-[color:var(--color-accent)] font-semibold">{step.y.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <InlineMath math="\frac{\partial f}{\partial w} =" />
                    <span className="font-mono text-[color:var(--color-text-primary)]">{step.gradX.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <InlineMath math="\frac{\partial f}{\partial b} =" />
                    <span className="font-mono text-[color:var(--color-text-primary)]">{step.gradY.toFixed(4)}</span>
                  </div>
                </div>

                {/* Update calculations */}
                {showUpdate && (
                  <div className="border-t border-[rgba(0,0,0,0.08)] pt-2.5 mt-2.5">
                    <div className="text-xs font-semibold text-[#B45309] mb-2">
                      Update (<InlineMath math={`\\alpha = ${learningRate}`} />):
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5">
                        <InlineMath math={`w_{\\text{new}} = ${step.x.toFixed(4)} - ${learningRate} \\times ${step.gradX.toFixed(4)} =`} />
                        <span className="font-mono text-[#B45309] font-bold text-sm">{nextStep.x.toFixed(4)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <InlineMath math={`b_{\\text{new}} = ${step.y.toFixed(4)} - ${learningRate} \\times ${step.gradY.toFixed(4)} =`} />
                        <span className="font-mono text-[#B45309] font-bold text-sm">{nextStep.y.toFixed(4)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Controls Section - Below the plot */}
      <div className="mb-6 space-y-4">
        <ParameterSlider
          label="Learning Rate (α)"
          value={learningRate}
          min={0.05}
          max={0.5}
          step={0.01}
          onChange={(v) => {
            setLearningRate(v);
            setCurrentStep(0);
            setIsPlaying(false);
          }}
        />

        <div className="flex items-center gap-3 text-xs">
          <span className="uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">Starting Point</span>
          {(["far", "medium", "near"] as const).map((point) => (
            <button
              key={point}
              type="button"
              className={`rounded-full border px-3 py-1 transition ${
                startPoint === point
                  ? "border-[rgba(91,156,245,0.65)] bg-[rgba(91,156,245,0.12)] text-[color:var(--color-text-primary)]"
                  : "border-[rgba(255,255,255,0.16)] hover:border-[rgba(255,255,255,0.3)]"
              }`}
              onClick={() => {
                setStartPoint(point);
                setCurrentStep(0);
                setIsPlaying(false);
              }}
            >
              {point.charAt(0).toUpperCase() + point.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* VCR Controls and Network Visualization - Side by Side */}
      <div className="grid lg:grid-cols-[300px_1fr] gap-4 items-start">
        {/* VCR Controls on the left */}
        <div>
          <VCRControls
            current={currentStep}
            total={descentPath.length}
            onStep={setCurrentStep}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onReset={resetPath}
            isPlaying={isPlaying}
          />
        </div>

        {/* Compact Linear Regression Weights Visualization on the right */}
        <div className="border border-[rgba(255,255,255,0.2)] rounded-lg p-3 bg-[rgba(255,255,255,0.02)]">
        <div className="flex items-center justify-center gap-3">
          {/* Input */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border border-[rgba(107,140,174,0.5)] bg-[rgba(107,140,174,0.08)] flex items-center justify-center text-sm">
              <InlineMath math="x" />
            </div>
            <span className="text-[0.6rem] text-[color:var(--color-text-secondary)] mt-0.5">input</span>
          </div>

          {/* Arrow with formula label */}
          <div className="flex flex-col items-center">
            <svg width="48" height="2">
              <line x1="0" y1="1" x2="48" y2="1" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <polygon points="48,1 43,0 43,2" fill="rgba(255,255,255,0.4)" />
            </svg>
            <span className="text-[0.55rem] text-[color:var(--color-text-secondary)] mt-0.5">
              <InlineMath math="w \cdot x + b" />
            </span>
          </div>

          {/* Output */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border border-[rgba(46,213,115,0.5)] bg-[rgba(46,213,115,0.08)] flex items-center justify-center text-sm">
              <InlineMath math="\hat{y}" />
            </div>
            <span className="text-[0.6rem] text-[color:var(--color-text-secondary)] mt-0.5">output</span>
          </div>

          {/* Arrow to cost with MSE label */}
          <div className="flex flex-col items-center">
            <svg width="40" height="2">
              <line x1="0" y1="1" x2="40" y2="1" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <polygon points="40,1 35,0 35,2" fill="rgba(255,255,255,0.4)" />
            </svg>
            <span className="text-[0.55rem] text-[color:var(--color-text-secondary)] mt-0.5">MSE</span>
          </div>

          {/* Cost */}
          <div className="flex flex-col items-center">
            <div className="px-2.5 h-10 rounded border border-[rgba(239,68,68,0.5)] bg-[rgba(239,68,68,0.08)] flex items-center justify-center whitespace-nowrap text-sm">
              <InlineMath math={`J = ${currentStepData.cost.toFixed(2)}`} />
            </div>
            <span className="text-[0.6rem] text-[color:var(--color-text-secondary)] mt-0.5">cost</span>
          </div>

        </div>

        {/* Update Rule and Gradients */}
        <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.1)] space-y-2">
          {/* Current parameter values and gradients */}
          <div className="flex items-center justify-center gap-10">
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-xs font-mono text-[color:var(--color-text-primary)]">
                <InlineMath math={`w = ${currentStepData.x.toFixed(3)}`} />
              </div>
              <div className="text-xs text-[color:var(--color-text-secondary)]">
                <InlineMath math={`\\frac{\\partial J}{\\partial w} = ${currentStepData.gradX.toFixed(3)}`} />
              </div>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-xs font-mono text-[color:var(--color-text-primary)]">
                <InlineMath math={`b = ${currentStepData.y.toFixed(3)}`} />
              </div>
              <div className="text-xs text-[color:var(--color-text-secondary)]">
                <InlineMath math={`\\frac{\\partial J}{\\partial b} = ${currentStepData.gradY.toFixed(3)}`} />
              </div>
            </div>
          </div>

          {/* Update Rule */}
          <div className="flex items-center justify-center gap-5 text-xs text-[color:var(--color-text-secondary)]">
            <div>
              <InlineMath math={`w := w - \\alpha \\frac{\\partial J}{\\partial w}`} />
            </div>
            <div>
              <InlineMath math={`b := b - \\alpha \\frac{\\partial J}{\\partial b}`} />
            </div>
          </div>
        </div>
        </div>
      </div>
    </FullScreenCard>
  );
}
