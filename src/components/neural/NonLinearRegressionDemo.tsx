"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import type { Config, Data, Layout } from "plotly.js";
import { lightThemeLayout3D, PLOTLY_COLORS } from "@/lib/plotlyLightTheme";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center text-sm text-[color:var(--color-text-secondary)]">
      Loading visualization…
    </div>
  ),
});

// Generate 3D non-linear data (surface)
function generateNonLinearData() {
  const points: { x: number; y: number; z: number }[] = [];

  // Seeded random for consistency
  let seed = 42;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // Generate complex 3D surface: saddle-like shape with ripples
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      const x = (i / 14) * 4 - 2; // Range from -2 to 2
      const y = (j / 14) * 4 - 2;
      const z =
        x * x - y * y +                         // Saddle shape
        0.5 * Math.sin(2 * x) * Math.cos(2 * y) + // Ripples
        (random() - 0.5) * 0.2;                   // Noise
      points.push({ x, y, z });
    }
  }

  return points;
}

export function NonLinearRegressionDemo() {
  const [showLinear, setShowLinear] = useState(false);
  const [showNeural, setShowNeural] = useState(false);

  const data = useMemo(() => generateNonLinearData(), []);

  // Linear fit (plane - will fail for non-linear surface)
  const linearFit = useMemo(() => {
    // Fit a plane: z = a*x + b*y + c using least squares
    const n = data.length;
    let sumX = 0, sumY = 0, sumZ = 0, sumXX = 0, sumYY = 0, sumXY = 0, sumXZ = 0, sumYZ = 0;

    data.forEach(p => {
      sumX += p.x;
      sumY += p.y;
      sumZ += p.z;
      sumXX += p.x * p.x;
      sumYY += p.y * p.y;
      sumXY += p.x * p.y;
      sumXZ += p.x * p.z;
      sumYZ += p.y * p.z;
    });

    const det = n * (sumXX * sumYY - sumXY * sumXY) - sumX * (sumX * sumYY - sumY * sumXY) + sumY * (sumX * sumXY - sumY * sumXX);
    const a = ((sumXZ * (n * sumYY - sumY * sumY) - sumYZ * (n * sumXY - sumX * sumY) + sumZ * (sumY * sumXY - sumX * sumYY)) / det);
    const b = ((n * (sumYZ * sumXX - sumXZ * sumXY) - sumX * (sumYZ * sumX - sumXZ * sumY) + sumY * (sumXZ * sumX - sumYZ * sumXX)) / det);
    const c = (sumZ - a * sumX - b * sumY) / n;

    // Create plane mesh as 2D grid
    const resolution = 30;
    const xRange: number[] = [];
    const yRange: number[] = [];

    for (let i = 0; i < resolution; i++) {
      const val = (i / (resolution - 1)) * 4 - 2;
      xRange.push(val);
      yRange.push(val);
    }

    // z[j][i] where j is y-index, i is x-index
    const zGrid: number[][] = [];
    for (let j = 0; j < resolution; j++) {
      const row: number[] = [];
      for (let i = 0; i < resolution; i++) {
        row.push(a * xRange[i] + b * yRange[j] + c);
      }
      zGrid.push(row);
    }

    return { x: xRange, y: yRange, z: zGrid };
  }, [data]);

  // Neural network fit (smooth surface matching the complex pattern)
  const nnFit = useMemo(() => {
    const resolution = 70; // Ultra high resolution for stunning smoothness
    const xRange: number[] = [];
    const yRange: number[] = [];

    for (let i = 0; i < resolution; i++) {
      const val = (i / (resolution - 1)) * 4 - 2;
      xRange.push(val);
      yRange.push(val);
    }

    // z[j][i] where j is y-index, i is x-index
    const zGrid: number[][] = [];
    for (let j = 0; j < resolution; j++) {
      const row: number[] = [];
      for (let i = 0; i < resolution; i++) {
        const x = xRange[i];
        const y = yRange[j];
        const z = x * x - y * y + 0.5 * Math.sin(2 * x) * Math.cos(2 * y);
        row.push(z);
      }
      zGrid.push(row);
    }

    return { x: xRange, y: yRange, z: zGrid };
  }, []);

  // Data trace (3D scatter points) - Blue to match gradient descent surface
  const dataTrace: Data = {
    x: data.map(p => p.x),
    y: data.map(p => p.y),
    z: data.map(p => p.z),
    mode: "markers",
    type: "scatter3d",
    name: "Data Points",
    showlegend: false,
    marker: {
      size: 3,
      color: PLOTLY_COLORS.surface3, // Match the medium blue from gradient descent surface
      opacity: 1,
      line: {
        color: PLOTLY_COLORS.surface3,
        width: 1,
      },
      symbol: "circle",
    },
    hovertemplate: "<b>Data Point</b><br>x₁: %{x:.2f}<br>x₂: %{y:.2f}<br>y: %{z:.2f}<extra></extra>",
  };

  // Linear model trace (flat plane) - Amber gradient
  const linearTrace: Data = {
    x: linearFit.x,
    y: linearFit.y,
    z: linearFit.z,
    type: "surface",
    name: "Linear Model",
    opacity: 0.85,
    colorscale: [
      [0, "#B45309"],     // Dark amber
      [0.5, "#D97706"],   // Medium amber
      [1, "#F59E0B"],     // Light amber
    ],
    showscale: false,
    contours: {
      x: {
        show: true,
        color: "rgba(255,255,255,0.3)",
        width: 1,
        highlightcolor: "rgba(255,255,255,0.5)",
        highlightwidth: 1.5,
      },
      y: {
        show: true,
        color: "rgba(255,255,255,0.3)",
        width: 1,
        highlightcolor: "rgba(255,255,255,0.5)",
        highlightwidth: 1.5,
      },
      z: {
        show: false,
      },
    },
    lighting: {
      ambient: 1.0,
      diffuse: 0,
      specular: 0,
      roughness: 1,
      fresnel: 0,
    },
    hovertemplate: "<b>Linear Model</b><br>x₁: %{x:.2f}<br>x₂: %{y:.2f}<br>Prediction: %{z:.2f}<extra></extra>",
  };

  // Neural network trace (complex surface) - Blue gradient for depth
  const nnTrace: Data = {
    x: nnFit.x,
    y: nnFit.y,
    z: nnFit.z,
    type: "surface",
    name: "Neural Network",
    opacity: 0.92,
    colorscale: [
      [0, "#0F4C81"],     // Dark blue for valleys
      [0.5, "#3B82F6"],   // Medium blue for middle
      [1, "#60A5FA"],     // Light blue for peaks
    ],
    showscale: false,
    contours: {
      x: {
        show: true,
        color: "rgba(255,255,255,0.25)",
        width: 1,
        highlightcolor: "rgba(255,255,255,0.4)",
        highlightwidth: 1.5,
      },
      y: {
        show: true,
        color: "rgba(255,255,255,0.25)",
        width: 1,
        highlightcolor: "rgba(255,255,255,0.4)",
        highlightwidth: 1.5,
      },
      z: {
        show: false,
      },
    },
    lighting: {
      ambient: 1.0,
      diffuse: 0,
      specular: 0,
      roughness: 1,
      fresnel: 0,
    },
    hovertemplate: "<b>Neural Network</b><br>x₁: %{x:.2f}<br>x₂: %{y:.2f}<br>Prediction: %{z:.2f}<extra></extra>",
  };

  const layout3D: Layout = {
    ...lightThemeLayout3D,
    showlegend: true,
    legend: {
      x: 0.02,
      y: 0.98,
      bgcolor: "rgba(255,255,255,0.95)",
      bordercolor: PLOTLY_COLORS.primary,
      borderwidth: 2,
      font: {
        color: "#1A1A1A",
        size: 13,
        family: "var(--font-inter, system-ui)"
      },
    },
    scene: {
      ...lightThemeLayout3D.scene,
      xaxis: {
        ...lightThemeLayout3D.scene?.xaxis,
        title: {
          text: "Feature x₁",
          font: { size: 15, color: "#1A1A1A", family: "var(--font-inter)" }
        },
      },
      yaxis: {
        ...lightThemeLayout3D.scene?.yaxis,
        title: {
          text: "Feature x₂",
          font: { size: 15, color: "#1A1A1A", family: "var(--font-inter)" }
        },
      },
      zaxis: {
        ...lightThemeLayout3D.scene?.zaxis,
        title: {
          text: "Target (y)",
          font: { size: 15, color: "#1A1A1A", family: "var(--font-inter)" }
        },
      },
      aspectmode: "manual",
      aspectratio: { x: 1.3, y: 1.3, z: 0.9 },
      camera: {
        eye: { x: 1.5, y: 1.5, z: 1.35 },
        center: { x: 0, y: 0, z: 0 },
      },
    },
    margin: { t: 20, r: 20, b: 20, l: 20 },
  };

  const config: Partial<Config> = {
    displaylogo: false,
    responsive: true,
    staticPlot: false,
    modeBarButtonsToRemove: ["toImage"],
  };

  // Build data array progressively - data points ALWAYS last for maximum visibility
  const plotData: Data[] = [];
  if (showLinear) plotData.push(linearTrace);
  if (showNeural) plotData.push(nnTrace);
  plotData.push(dataTrace); // Always add data points last so they render on top

  return (
    <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-2">
          Regression: Fitting a Complex 3D Surface
        </h3>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          Compare how linear models vs neural networks handle non-linear data patterns
        </p>
      </div>

      {/* Control Buttons - Using website's design language */}
      <div className="mb-5 flex flex-wrap gap-3">
        <button
          onClick={() => setShowLinear(!showLinear)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            showLinear
              ? "bg-[rgba(217,119,6,0.08)] border-2 border-[rgba(217,119,6,0.4)] text-[#B45309] shadow-[0_2px_8px_rgba(217,119,6,0.15)]"
              : "bg-white border-2 border-[rgba(0,0,0,0.12)] text-[color:var(--color-text-secondary)] hover:border-[rgba(217,119,6,0.3)] hover:bg-[rgba(217,119,6,0.04)]"
          }`}
        >
          {showLinear ? "Hide" : "Show"} Linear Model
        </button>
        <button
          onClick={() => setShowNeural(!showNeural)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            showNeural
              ? "bg-[rgba(59,130,246,0.08)] border-2 border-[rgba(59,130,246,0.4)] text-[#1E40AF] shadow-[0_2px_8px_rgba(59,130,246,0.15)]"
              : "bg-white border-2 border-[rgba(0,0,0,0.12)] text-[color:var(--color-text-secondary)] hover:border-[rgba(59,130,246,0.3)] hover:bg-[rgba(59,130,246,0.04)]"
          }`}
        >
          {showNeural ? "Hide" : "Show"} Neural Network
        </button>
      </div>

      {/* Visualization Container */}
      <div className="mb-6 rounded-xl overflow-hidden border border-[rgba(0,0,0,0.1)] bg-[rgba(248,250,252,0.5)]">
        <Plot
          data={plotData}
          layout={layout3D}
          config={config}
          style={{ width: "100%", height: "580px" }}
        />
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className={`p-5 rounded-lg transition-all duration-300 ${
          showLinear
            ? "bg-[rgba(217,119,6,0.06)] border-2 border-[rgba(217,119,6,0.3)]"
            : "bg-[rgba(0,0,0,0.01)] border border-[rgba(0,0,0,0.08)]"
        }`}>
          <div className={`flex items-start gap-3 mb-3 ${!showLinear && 'opacity-40'}`}>
            <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
              showLinear ? 'bg-[rgba(217,119,6,1)]' : 'bg-[rgba(0,0,0,0.2)]'
            }`}></div>
            <div>
              <strong className={`text-base ${
                showLinear ? 'text-[#B45309]' : 'text-[color:var(--color-text-primary)]'
              }`}>
                Linear Model <span className="font-mono text-xs text-[color:var(--color-text-secondary)] font-normal">(f = w₁x₁ + w₂x₂ + b)</span>
              </strong>
            </div>
          </div>
          <p className={`text-sm text-[color:var(--color-text-secondary)] leading-relaxed ${!showLinear && 'opacity-40'}`}>
            Can only fit a flat plane. High error because it cannot capture the saddle shape and ripples.
            MSE remains high no matter how long we train.
          </p>
        </div>

        <div className={`p-5 rounded-lg transition-all duration-300 ${
          showNeural
            ? "bg-[rgba(59,130,246,0.06)] border-2 border-[rgba(59,130,246,0.3)]"
            : "bg-[rgba(0,0,0,0.01)] border border-[rgba(0,0,0,0.08)]"
        }`}>
          <div className={`flex items-start gap-3 mb-3 ${!showNeural && 'opacity-40'}`}>
            <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
              showNeural ? 'bg-[rgba(59,130,246,1)]' : 'bg-[rgba(0,0,0,0.2)]'
            }`}></div>
            <div>
              <strong className={`text-base ${
                showNeural ? 'text-[#1E40AF]' : 'text-[color:var(--color-text-primary)]'
              }`}>
                Neural Network <span className="text-xs text-[color:var(--color-text-secondary)] font-normal">(with activation functions)</span>
              </strong>
            </div>
          </div>
          <p className={`text-sm text-[color:var(--color-text-secondary)] leading-relaxed ${!showNeural && 'opacity-40'}`}>
            With non-linear activation functions (ReLU, sigmoid), it can learn the complex 3D surface
            and fit the data closely. Low MSE achieved through gradient descent.
          </p>
        </div>
      </div>
    </div>
  );
}
