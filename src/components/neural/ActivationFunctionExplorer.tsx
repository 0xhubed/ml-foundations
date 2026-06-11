"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { lightThemeLayout2D, PLOTLY_COLORS } from "@/lib/plotlyLightTheme";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export function ActivationFunctionExplorer() {
  // Generate data for plots
  const xValues = useMemo(() => {
    const arr = [];
    for (let x = -5; x <= 5; x += 0.1) {
      arr.push(x);
    }
    return arr;
  }, []);

  const plotData = useMemo(() => {
    return [
      // Shaded area for ReLU "dead zone" (negative inputs)
      {
        x: [-5, 0, 0, -5],
        y: [-1, -1, 5.5, 5.5],
        fill: "toself",
        fillcolor: "rgba(255,105,180,0.05)",
        line: { width: 0 },
        type: "scatter" as const,
        mode: "lines" as const,
        showlegend: false,
        hoverinfo: "skip" as const,
      },
      // Linear function
      {
        x: xValues,
        y: xValues.map((x) => x),
        type: "scatter" as const,
        mode: "lines" as const,
        name: "Linear",
        line: {
          width: 3,
          color: "rgba(148,163,184,1)",
          dash: "dash",
        },
      },
      // ReLU function
      {
        x: xValues,
        y: xValues.map((x) => Math.max(0, x)),
        type: "scatter" as const,
        mode: "lines" as const,
        name: "ReLU",
        line: {
          width: 5,
          color: "rgba(255,200,87,1)",
        },
      },
      // Marker at the critical point (0,0) - the "kink"
      {
        x: [0],
        y: [0],
        type: "scatter" as const,
        mode: "markers" as const,
        marker: {
          size: 12,
          color: "rgba(255,200,87,1)",
          symbol: "circle",
          line: {
            width: 3,
            color: "#1A1A1A",
          },
        },
        showlegend: false,
        hoverinfo: "text" as const,
        text: "Critical point: x=0",
      },
    ];
  }, [xValues]);

  return (
    <div className="glass-panel p-4 sm:p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Plot on the left */}
        <div className="h-[320px] sm:h-[420px] lg:h-[450px]">
          <Plot
            data={plotData}
            layout={{
              ...lightThemeLayout2D,
              autosize: true,
              xaxis: {
                ...lightThemeLayout2D.xaxis,
                title: { text: "Input", font: { size: 14, color: "#1A1A1A" } },
                zerolinewidth: 2,
              },
              yaxis: {
                ...lightThemeLayout2D.yaxis,
                title: { text: "Output", font: { size: 14, color: "#1A1A1A" } },
                zerolinewidth: 2,
                range: [-1, 5.5],
              },
              margin: { l: 55, r: 30, t: 30, b: 55 },
              showlegend: true,
              legend: {
                x: 0.98,
                xanchor: "right",
                y: 0.98,
                yanchor: "top",
                bgcolor: "rgba(255,255,255,0.95)",
                bordercolor: "#E0E0E0",
                borderwidth: 1,
                font: { size: 13, color: "#1A1A1A" },
              },
            }}
            config={{ displayModeBar: false, responsive: true }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Descriptions on the right */}
        <div className="space-y-4">
          <div className="bg-[rgba(148,163,184,0.08)] border-2 border-[rgba(148,163,184,0.3)] rounded-lg p-4">
            <h4 className="font-semibold text-[color:var(--color-text-primary)] mb-2 flex items-center gap-2">
              <span className="text-[rgba(148,163,184,1)]">✗</span> Linear: f(x) = x
            </h4>
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              No transformation. Stacking multiple linear layers collapses into a single linear function.
              <strong className="block mt-2 text-[rgba(148,163,184,1)]">Cannot learn curves or complex patterns!</strong>
            </p>
          </div>

          <div className="bg-[rgba(255,200,87,0.08)] border-2 border-[rgba(255,200,87,0.4)] rounded-lg p-4">
            <h4 className="font-semibold text-[color:var(--color-text-primary)] mb-2 flex items-center gap-2">
              <span className="text-[rgba(255,200,87,1)]">✓</span> ReLU: f(x) = max(0, x)
            </h4>
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              Simple and powerful: outputs zero for negative inputs, passes through positive values unchanged.
              <strong className="block mt-2 text-[rgba(255,200,87,1)]">The non-linearity enables learning complex patterns!</strong>
            </p>
          </div>

          <div className="bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-4">
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              <strong className="text-[color:var(--color-text-primary)]">Key insight:</strong> The "kink" at x=0 in ReLU is what makes neural networks powerful.
              This non-linearity allows networks to approximate any function, learn curves, and detect complex patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
