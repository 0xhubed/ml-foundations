"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, useCallback } from "react";
import type { Config, Data, Layout } from "plotly.js";
import { FullScreenCard } from "@/components/ui/FullScreenCard";
import { BlockMath } from "react-katex";
import { lightThemeLayout2D, lightThemeLayout3D, lightSurfaceColorscale, PLOTLY_COLORS } from "@/lib/plotlyLightTheme";
import {
  calculateMSE,
  calculatePredictions,
  calculateOptimalParameters,
  type DataPoint,
} from "@/lib/costFunctions";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center text-sm text-[color:var(--color-text-secondary)]">
      Loading visualization…
    </div>
  ),
});

// Seeded RNG for consistent data generation
function createRng(seed: number) {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

// Generate simple linear dataset: y = 5x + 50 + noise
// x: 0-10, y: 50-100 (keeps MSE small for visualization)
function generateData(count: number, seed: number): DataPoint[] {
  const rng = createRng(seed);
  const points: DataPoint[] = [];

  for (let i = 0; i < count; i++) {
    const x = (i / count) * 10;        // Hours studied: 0-10
    const noise = (rng() - 0.5) * 6;   // ±3 points noise
    const y = 5 * x + 50 + noise;      // Score: 50-100
    points.push({ x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) });
  }

  return points;
}

export function CostFunctionDualPanel() {
  const data = useMemo(() => generateData(50, 42), []);
  const optimal = useMemo(() => calculateOptimalParameters(data), [data]);

  // Start with suboptimal parameters to show improvement
  // Optimal is ~5 for w and ~50 for b
  const [w, setW] = useState(2.5);
  const [b, setB] = useState(60);
  const [showErrorBars, setShowErrorBars] = useState(false);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");

  const currentCost = useMemo(() => calculateMSE(data, w, b), [data, w, b]);
  const predictions = useMemo(() => calculatePredictions(data, w, b), [data, w, b]);

  const animateToOptimal = useCallback(() => {
    const steps = 50;
    const wStep = (optimal.w - w) / steps;
    const bStep = (optimal.b - b) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        clearInterval(interval);
        setW(optimal.w);
        setB(optimal.b);
      } else {
        setW((prev) => prev + wStep);
        setB((prev) => prev + bStep);
      }
    }, 20);
  }, [w, b, optimal]);

  // Left panel: Predictions with error bars
  const predictionPlot = useMemo(() => {
    const dataTrace: Partial<Data> = {
      type: "scatter",
      mode: "markers",
      x: data.map((d) => d.x),
      y: data.map((d) => d.y),
      marker: {
        size: 6,
        color: PLOTLY_COLORS.primary,
      },
      name: "Actual",
    };

    const predictionLine: Partial<Data> = {
      type: "scatter",
      mode: "lines",
      x: [0, 10],
      y: [b, w * 10 + b],
      line: {
        color: PLOTLY_COLORS.secondary,
        width: 3,
      },
      name: "Prediction",
    };

    const errorBars: Partial<Data>[] = showErrorBars
      ? predictions.map((pred) => {
          const errorMagnitude = Math.abs(pred.error);
          const maxError = Math.max(...predictions.map((p) => Math.abs(p.error)));
          const normalizedError = errorMagnitude / maxError;

          let color;
          if (normalizedError < 0.33) color = PLOTLY_COLORS.accent; // green
          else if (normalizedError < 0.67) color = PLOTLY_COLORS.secondary; // amber
          else color = PLOTLY_COLORS.danger; // red

          return {
            type: "scatter",
            mode: "lines",
            x: [pred.x, pred.x],
            y: [pred.actual, pred.predicted],
            line: {
              color,
              width: 2,
            },
            showlegend: false,
            hoverinfo: "text",
            text: `Error: ${pred.error.toFixed(2)}`,
          } as Partial<Data>;
        })
      : [];

    const layout: Partial<Layout> = {
      ...lightThemeLayout2D,
      autosize: true,
      height: 400,
      margin: { l: 60, r: 20, t: 40, b: 60 },
      title: {
        text: "Predictions vs Actual",
        font: { size: 14 },
      },
      xaxis: {
        ...lightThemeLayout2D.xaxis,
        title: "x",
        range: [-0.5, 10.5],
      },
      yaxis: {
        ...lightThemeLayout2D.yaxis,
        title: "y",
      },
      showlegend: true,
      legend: {
        ...lightThemeLayout2D.legend,
        x: 0.02,
        y: 0.98,
      },
    };

    return {
      data: [dataTrace, predictionLine, ...errorBars],
      layout,
    };
  }, [data, w, b, showErrorBars, predictions]);

  // Right panel: Cost landscape
  const costPlot = useMemo(() => {
    if (viewMode === "2d") {
      // Focused ranges around the optimal region for better color scaling
      const wRange = Array.from({ length: 60 }, (_, i) => 0 + i * 0.167); // 0 to 10
      const bRange = Array.from({ length: 60 }, (_, i) => 30 + i * 0.67); // 30 to 70
      const zValues = wRange.map((wi) => bRange.map((bi) => calculateMSE(data, wi, bi)));

      // Calculate min/max for better colorbar scaling
      const allCosts = zValues.flat();
      const minCost = Math.min(...allCosts);
      const maxCost = Math.max(...allCosts);

      const contourTrace: Partial<Data> = {
        type: "contour",
        x: wRange,
        y: bRange,
        z: zValues,
        colorscale: lightSurfaceColorscale,
        contours: {
          coloring: "heatmap",
        },
        showscale: false,
        zmin: minCost,
        zmax: maxCost,
      };

      const currentPosTrace: Partial<Data> = {
        type: "scatter",
        mode: "markers",
        x: [w],
        y: [b],
        marker: {
          size: 15,
          color: PLOTLY_COLORS.secondary,
          symbol: "circle",
          line: { width: 2, color: "#FFFFFF" },
        },
        name: "Current",
      };

      const optimalTrace: Partial<Data> = {
        type: "scatter",
        mode: "markers",
        x: [optimal.w],
        y: [optimal.b],
        marker: {
          size: 12,
          color: PLOTLY_COLORS.accent,
          symbol: "star",
          line: { width: 2, color: "#FFFFFF" },
        },
        name: "Optimal",
      };

      const layout: Partial<Layout> = {
        ...lightThemeLayout2D,
        autosize: true,
        height: 400,
        margin: { l: 60, r: 20, t: 40, b: 60 },
        title: {
          text: "Cost Landscape",
          font: { size: 14 },
        },
        xaxis: {
          ...lightThemeLayout2D.xaxis,
          title: "w (slope)",
        },
        yaxis: {
          ...lightThemeLayout2D.yaxis,
          title: "b (intercept)",
        },
        showlegend: false,
      };

      return {
        data: [contourTrace, currentPosTrace, optimalTrace],
        layout,
      };
    } else {
      // 3D view with higher resolution for accurate surface rendering
      // Focused ranges around the optimal region for better color scaling
      const wRange = Array.from({ length: 60 }, (_, i) => 0 + i * 0.167); // 0 to 10
      const bRange = Array.from({ length: 60 }, (_, i) => 30 + i * 0.67); // 30 to 70
      // Note: z[i][j] corresponds to position (x[j], y[i]) in Plotly surface plots
      const zValues = bRange.map((bi) => wRange.map((wi) => calculateMSE(data, wi, bi)));

      // Calculate min/max for better colorbar scaling
      const allCosts = zValues.flat();
      const minCost = Math.min(...allCosts);
      const maxCost = Math.max(...allCosts);

      const surfaceTrace: Partial<Data> = {
        type: "surface",
        x: wRange,
        y: bRange,
        z: zValues,
        colorscale: lightSurfaceColorscale,
        showscale: false,
        opacity: 0.9,
        lighting: {
          ambient: 0.6,
          diffuse: 0.8,
          specular: 0.3,
          roughness: 0.5,
          fresnel: 0.2,
        },
        cmin: 0,
        cmax: 300,
      };

      const currentPosTrace: Partial<Data> = {
        type: "scatter3d",
        mode: "markers",
        x: [w],
        y: [b],
        z: [currentCost],
        marker: {
          size: 12,
          color: PLOTLY_COLORS.secondary,
          symbol: "circle",
          line: { width: 3, color: "#FFFFFF" },
        },
        name: "Current",
      };

      const optimalPosTrace: Partial<Data> = {
        type: "scatter3d",
        mode: "markers",
        x: [optimal.w],
        y: [optimal.b],
        z: [optimal.cost],
        marker: {
          size: 12,
          color: PLOTLY_COLORS.accent,
          symbol: "diamond",
          line: { width: 3, color: "#FFFFFF" },
        },
        name: "Optimal",
      };

      const layout: Partial<Layout> = {
        ...lightThemeLayout3D,
        autosize: true,
        height: 500,
        margin: { l: 80, r: 80, t: 80, b: 80 },
        title: {
          text: "Cost Landscape",
          font: { size: 14 },
        },
        scene: {
          ...lightThemeLayout3D.scene,
          xaxis: {
            ...lightThemeLayout3D.scene?.xaxis,
            title: "w",
            titlefont: { size: 16, color: "#1A1A1A" },
          },
          yaxis: {
            ...lightThemeLayout3D.scene?.yaxis,
            title: "b",
            titlefont: { size: 16, color: "#1A1A1A" },
          },
          zaxis: {
            ...lightThemeLayout3D.scene?.zaxis,
            title: "J(w,b)",
            titlefont: { size: 16, color: "#1A1A1A" },
            range: [0, 500],
          },
          aspectratio: { x: 2, y: 2, z: 0.6 },
          camera: {
            eye: { x: 0.5, y: 2.6, z: 1.2 },
            center: { x: 0, y: 0, z: 0 },
            up: { x: 0, y: 0, z: 1 },
          },
        },
      };

      return {
        data: [surfaceTrace, currentPosTrace, optimalPosTrace],
        layout,
      };
    }
  }, [data, w, b, currentCost, optimal, viewMode]);

  const config: Partial<Config> = {
    displaylogo: false,
    responsive: true,
  };

  return (
    <FullScreenCard className="glass-panel p-6" title="Interactive Cost Function Explorer">
      {/* Mathematical Formula */}
      <div className="mb-6 bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-4">
        <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
          Mean Squared Error (MSE) Cost Function
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-[color:var(--color-text-secondary)] mb-2">General form:</div>
            <BlockMath math="J(w,b) = \frac{1}{m} \sum_{i=1}^{m} (f_{w,b}(x^{(i)}) - y^{(i)})^2" />
          </div>
          <div>
            <div className="text-xs text-[color:var(--color-text-secondary)] mb-2">Substituting f(x) = wx + b:</div>
            <BlockMath math="J(w,b) = \frac{1}{m} \sum_{i=1}^{m} (wx^{(i)} + b - y^{(i)})^2" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Weight slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-[color:var(--color-text-primary)]">
                Weight (w): slope
              </label>
              <span className="text-sm text-[color:var(--color-text-secondary)] font-mono">
                {w.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={w}
              onChange={(e) => setW(parseFloat(e.target.value))}
              className="w-full appearance-none cursor-pointer slider"
            />
          </div>

          {/* Bias slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-[color:var(--color-text-primary)]">
                Bias (b): intercept
              </label>
              <span className="text-sm text-[color:var(--color-text-secondary)] font-mono">
                {b.toFixed(0)}
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="70"
              step="1"
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value))}
              className="w-full appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={animateToOptimal}
            className="px-4 py-2 bg-[rgba(34,197,94,0.2)] hover:bg-[rgba(34,197,94,0.3)] border border-[rgba(34,197,94,0.5)] rounded-lg text-sm font-medium text-[color:var(--color-text-primary)] transition-colors"
          >
            Animate to Optimal
          </button>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showErrorBars}
              onChange={(e) => setShowErrorBars(e.target.checked)}
              className="w-4 h-4 accent-[rgba(255,200,87,1)]"
            />
            <span className="text-[color:var(--color-text-secondary)]">Show Error Bars</span>
          </label>
        </div>

        {/* Cost display */}
        <div className="bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-3">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-[color:var(--color-text-secondary)]">Current MSE:</span>
              <span className="ml-2 text-lg font-mono font-bold text-[rgba(255,200,87,1)]">
                {currentCost.toFixed(3)}
              </span>
            </div>
            <div>
              <span className="text-sm text-[color:var(--color-text-secondary)]">Optimal MSE:</span>
              <span className="ml-2 text-lg font-mono font-bold text-[rgba(34,197,94,1)]">
                {optimal.cost.toFixed(3)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Predictions plot */}
      <div className="rounded-lg p-2">
        <Plot
          data={predictionPlot.data}
          layout={predictionPlot.layout}
          config={config}
          useResizeHandler
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Explanation */}
      <div className="mt-6 bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-4">
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          <strong className="text-[color:var(--color-text-primary)]">
            See the Connection:
          </strong>{" "}
          Adjust w (slope) and b (intercept) to fit the line to the data points.
          The MSE measures how wrong your predictions are: lower is better.
        </p>
      </div>
    </FullScreenCard>
  );
}
