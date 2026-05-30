"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { Data, Layout } from "plotly.js";
import { lightThemeLayout2D, PLOTLY_COLORS } from "@/lib/plotlyLightTheme";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] items-center justify-center text-sm text-[color:var(--color-text-secondary)]">
      Loading visualization…
    </div>
  ),
});

export function DistributedRepresentationDemo() {
  const weights = ["w₁", "w₂", "w₃", "w₄"];
  const features = ["Location", "Metro Dist.", "School Rating", "Neighborhood"];

  const colors = ["#0F4C81", "#D97706", "#059669", "#DC2626"];

  // Generate traces for parallel coordinates
  const visualizationData = useMemo(() => {
    // Interpretable: clean 1-to-1 mapping
    const interpretableTraces: Data[] = weights.map((weight, i) => ({
      type: "scatter",
      mode: "lines+markers",
      x: [0, 1],
      y: [i, i],
      line: { color: colors[i], width: 4 },
      marker: { size: 12, color: colors[i] },
      hovertemplate: `${weight} → ${features[i]}<br>Weight: 1.0<extra></extra>`,
      showlegend: false,
      xaxis: "x",
      yaxis: "y",
    }));

    // Entangled: each weight connects to multiple features with varying strengths
    const entangledConnections = [
      { from: 0, to: [0, 1, 2, 3], weights: [0.72, 0.31, -0.28, 0.15] },
      { from: 1, to: [0, 1, 2, 3], weights: [0.28, 0.65, 0.42, -0.22] },
      { from: 2, to: [0, 1, 2, 3], weights: [-0.31, 0.19, 0.71, 0.34] },
      { from: 3, to: [0, 1, 2, 3], weights: [0.18, -0.24, 0.31, 0.68] },
    ];

    const entangledTraces: Data[] = entangledConnections.flatMap(({ from, to, weights: ws }) =>
      to.map((target, idx) => {
        const weight = ws[idx];
        const absWeight = Math.abs(weight);

        // Only show connections with meaningful weight (above 0.1)
        if (absWeight < 0.1) return null;

        return {
          type: "scatter",
          mode: "lines",
          x: [0, 1],
          y: [from, target],
          line: {
            color: weight > 0 ? colors[from] : `${colors[from]}80`,
            width: absWeight * 6, // Line thickness shows strength
            dash: weight < 0 ? "dash" : "solid",
          },
          hovertemplate: `${weights[from]} → ${features[target]}<br>Weight: ${weight.toFixed(2)}<extra></extra>`,
          showlegend: false,
          opacity: 0.7,
          xaxis: "x2",
          yaxis: "y2",
        };
      })
    ).filter(Boolean) as Data[];

    // Add node markers for entangled side
    const entangledNodes: Data[] = [
      {
        type: "scatter",
        mode: "markers",
        x: Array(4).fill(0),
        y: [0, 1, 2, 3],
        marker: { size: 12, color: colors, line: { color: "#fff", width: 2 } },
        hoverinfo: "skip",
        showlegend: false,
        xaxis: "x2",
        yaxis: "y2",
      },
      {
        type: "scatter",
        mode: "markers",
        x: Array(4).fill(1),
        y: [0, 1, 2, 3],
        marker: { size: 12, color: "#666", line: { color: "#fff", width: 2 } },
        hoverinfo: "skip",
        showlegend: false,
        xaxis: "x2",
        yaxis: "y2",
      },
    ];

    return {
      interpretableTraces,
      entangledTraces: [...entangledTraces, ...entangledNodes],
    };
  }, []);

  const layout: Partial<Layout> = {
    ...lightThemeLayout2D,
    title: undefined,
    showlegend: false,
    grid: {
      rows: 1,
      columns: 2,
      pattern: "independent",
      xgap: 0.12,
    },
    annotations: [
      // Left title
      {
        text: "<b>What We Want: Interpretable</b>",
        xref: "x domain",
        yref: "paper",
        x: 0.5,
        y: 1.08,
        showarrow: false,
        font: { size: 15, color: "#059669" },
        xanchor: "center",
      },
      // Right title
      {
        text: "<b>What Gradient Descent Creates: Entangled</b>",
        xref: "x2 domain",
        yref: "paper",
        x: 0.5,
        y: 1.08,
        showarrow: false,
        font: { size: 15, color: "#B2182B" },
        xanchor: "center",
      },
      // Left axis labels
      ...weights.map((w, i) => ({
        text: `<b>${w}</b>`,
        xref: "x" as const,
        yref: "y" as const,
        x: -0.05,
        y: i,
        showarrow: false,
        font: { size: 13, color: colors[i] },
        xanchor: "right" as const,
      })),
      ...features.map((f, i) => ({
        text: `<b>${f}</b>`,
        xref: "x" as const,
        yref: "y" as const,
        x: 1.05,
        y: i,
        showarrow: false,
        font: { size: 13, color: "#333" },
        xanchor: "left" as const,
      })),
      // Right axis labels
      ...weights.map((w, i) => ({
        text: `<b>${w}</b>`,
        xref: "x2" as const,
        yref: "y2" as const,
        x: -0.05,
        y: i,
        showarrow: false,
        font: { size: 13, color: colors[i] },
        xanchor: "right" as const,
      })),
      ...features.map((f, i) => ({
        text: `<b>${f}</b>`,
        xref: "x2" as const,
        yref: "y2" as const,
        x: 1.05,
        y: i,
        showarrow: false,
        font: { size: 13, color: "#333" },
        xanchor: "left" as const,
      })),
    ],
    // Left plot axes
    xaxis: {
      range: [-0.15, 1.15],
      showgrid: false,
      showticklabels: false,
      zeroline: false,
      domain: [0, 0.44],
    },
    yaxis: {
      range: [-0.5, 3.5],
      showgrid: false,
      showticklabels: false,
      zeroline: false,
      domain: [0.1, 0.9],
    },
    // Right plot axes
    xaxis2: {
      range: [-0.15, 1.15],
      showgrid: false,
      showticklabels: false,
      zeroline: false,
      domain: [0.56, 1],
      anchor: "y2",
    },
    yaxis2: {
      range: [-0.5, 3.5],
      showgrid: false,
      showticklabels: false,
      zeroline: false,
      domain: [0.1, 0.9],
      anchor: "x2",
    },
    margin: { l: 80, r: 80, t: 60, b: 40 },
    height: 450,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "#ffffff",
  };

  return (
    <div className="space-y-6">
      {/* Main visualization */}
      <div className="glass-panel p-6">
        <Plot
          data={[
            ...visualizationData.interpretableTraces,
            ...visualizationData.entangledTraces,
          ]}
          layout={layout}
          config={{ displayModeBar: false, responsive: true }}
          className="w-full"
        />
      </div>

      {/* Simple two-column explanation */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="p-5 bg-[rgba(5,150,105,0.08)] border-l-4 border-[rgba(5,150,105,1)] rounded">
          <div className="text-xs font-semibold text-[rgba(5,150,105,1)] mb-2 uppercase tracking-wide">
            Interpretable: 92% Accurate
          </div>
          <p className="text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
            Clean, parallel connections. Each parameter controls exactly one feature.
            Easy to explain: <em>"w₁ is the location coefficient."</em>
          </p>
        </div>
        <div className="p-5 bg-[rgba(178,24,43,0.08)] border-l-4 border-[rgba(178,24,43,1)] rounded">
          <div className="text-xs font-semibold text-[rgba(178,24,43,1)] mb-2 uppercase tracking-wide">
            Entangled: 95% Accurate
          </div>
          <p className="text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
            Tangled, crossing connections. Each parameter affects multiple features.
            Better performance, but <em>impossible to interpret</em>.
          </p>
        </div>
      </div>

      {/* Key insight - compact */}
      <div className="p-5 bg-[rgba(178,24,43,0.08)] border-2 border-[rgba(178,24,43,0.3)] rounded-lg max-w-4xl mx-auto text-center">
        <p className="text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
          <strong className="text-[color:var(--color-text-primary)]">Gradient descent optimizes for accuracy, not interpretability.</strong>
          {" "}With billions of parameters, this entanglement is why even model creators can't explain how reasoning emerges.
        </p>
      </div>
    </div>
  );
}
