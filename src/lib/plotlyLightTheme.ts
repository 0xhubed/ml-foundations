/**
 * Light theme configuration for all Plotly charts
 * Monitor-safe colors that won't shift on poorly calibrated displays
 */

import type { Layout } from "plotly.js";

// Monitor-safe color palette
export const PLOTLY_COLORS = {
  primary: "#0F4C81", // Deep blue (safe)
  secondary: "#D97706", // Amber (safe)
  accent: "#059669", // Green (safe)
  danger: "#DC2626", // Red (safe)
  purple: "#7C3AED", // Purple (safe)

  // Surface/3D colors (saturated, not subtle)
  surface1: "#0F4C81",
  surface2: "#1E6BA8",
  surface3: "#3B82F6",

  // Path/highlight colors
  descentPath: "#D97706", // Amber for paths
  gradient: "#059669", // Green for gradients
  annotation: "#DC2626", // Red for annotations
};

// Base light theme layout for 2D charts
export const lightThemeLayout2D: Partial<Layout> = {
  paper_bgcolor: "#FDFBF7",
  plot_bgcolor: "#F6F3EC",
  font: {
    family: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    size: 13,
    color: "#1A1A1A",
  },
  xaxis: {
    gridcolor: "#E5E7EB",
    linecolor: "#1A1A1A",
    tickcolor: "#1A1A1A",
    zerolinecolor: "#9CA3AF",
  },
  yaxis: {
    gridcolor: "#E5E7EB",
    linecolor: "#1A1A1A",
    tickcolor: "#1A1A1A",
    zerolinecolor: "#9CA3AF",
  },
  legend: {
    bgcolor: "rgba(253, 251, 247, 0.9)",
    bordercolor: "rgba(0, 0, 0, 0.1)",
    borderwidth: 1,
    font: {
      color: "#1A1A1A",
    },
  },
};

// Base light theme layout for 3D charts
export const lightThemeLayout3D: Partial<Layout> = {
  paper_bgcolor: "#FDFBF7",
  plot_bgcolor: "#F6F3EC",
  font: {
    family: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    size: 12,
    color: "#1A1A1A",
  },
  scene: {
    xaxis: {
      backgroundcolor: "#F8FAFC",
      gridcolor: "#D1D5DB",
      zerolinecolor: "#6B7280",
      showticklabels: true,
      tickfont: { color: "#1A1A1A" },
    },
    yaxis: {
      backgroundcolor: "#F8FAFC",
      gridcolor: "#D1D5DB",
      zerolinecolor: "#6B7280",
      showticklabels: true,
      tickfont: { color: "#1A1A1A" },
    },
    zaxis: {
      backgroundcolor: "#F8FAFC",
      gridcolor: "#D1D5DB",
      zerolinecolor: "#6B7280",
      showticklabels: true,
      tickfont: { color: "#1A1A1A" },
    },
  },
  legend: {
    bgcolor: "rgba(253, 251, 247, 0.95)",
    bordercolor: "rgba(0, 0, 0, 0.1)",
    borderwidth: 1,
    font: {
      color: "#1A1A1A",
    },
  },
};

// Surface colorscale for 3D plots (monitor-safe)
export const lightSurfaceColorscale: [number, string][] = [
  [0, "#0F4C81"], // Deep blue
  [0.5, "#3B82F6"], // Medium blue
  [1, "#60A5FA"], // Light blue
];

// Alternative colorscale for heatmaps
export const lightHeatmapColorscale: [number, string][] = [
  [0, "#F3F4F6"], // Very light gray
  [0.25, "#60A5FA"], // Light blue
  [0.5, "#3B82F6"], // Medium blue
  [0.75, "#1E6BA8"], // Deep blue
  [1, "#0F4C81"], // Darkest blue
];
