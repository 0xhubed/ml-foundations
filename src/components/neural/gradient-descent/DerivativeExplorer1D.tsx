"use client";

import { useState, useMemo } from "react";
import { BlockMath } from "react-katex";

export function DerivativeExplorer1D() {
  const [xPoint, setXPoint] = useState(-1.5);

  // Function: f(x) = x²
  const f = (x: number) => x * x;
  const derivative = (x: number) => 2 * x;

  const currentY = f(xPoint);
  const currentSlope = derivative(xPoint);

  // Generate curve points
  const curvePoints = useMemo(() => {
    const points: { x: number; y: number }[] = [];
    for (let x = -3; x <= 3; x += 0.1) {
      points.push({ x, y: f(x) });
    }
    return points;
  }, []);

  // Generate tangent line points
  const tangentPoints = useMemo(() => {
    const points: { x: number; y: number }[] = [];
    const xStart = xPoint - 1.5;
    const xEnd = xPoint + 1.5;
    for (let x = xStart; x <= xEnd; x += 0.1) {
      const y = currentY + currentSlope * (x - xPoint);
      if (y >= 0 && y <= 10) {
        points.push({ x, y });
      }
    }
    return points;
  }, [xPoint, currentY, currentSlope]);

  // SVG coordinate system (map from data space to SVG space)
  const mapX = (x: number) => ((x + 3) / 6) * 500 + 50;
  const mapY = (y: number) => 450 - (y / 10) * 400;

  return (
    <div className="glass-panel p-6 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[color:var(--color-text-primary)] mb-2">
          1D Derivative Explorer: Understanding Slope
        </h3>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          Drag the point along the curve to see how the derivative (slope) changes. This is the
          foundation of gradient descent.
        </p>
      </div>

      {/* Mathematical Formula */}
      <div className="bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-4">
        <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
          Derivative Definition
        </h4>
        <div className="text-center">
          <BlockMath math="f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}" />
        </div>
        <p className="text-xs text-[color:var(--color-text-secondary)] mt-2 text-center">
          For f(x) = x², the derivative is f&apos;(x) = 2x
        </p>
      </div>

      {/* SVG Visualization */}
      <div className="bg-[#F8FAFC] rounded-lg p-4 border border-[rgba(0,0,0,0.08)]">
        <svg viewBox="0 0 600 500" className="w-full" style={{ maxHeight: "400px" }}>
          <defs>
            <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(91,156,245,0.8)" />
              <stop offset="50%" stopColor="rgba(125,163,198,0.8)" />
              <stop offset="100%" stopColor="rgba(107,140,174,0.8)" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[-2, -1, 0, 1, 2].map((x) => (
            <line
              key={`vline-${x}`}
              x1={mapX(x)}
              y1={mapY(0)}
              x2={mapX(x)}
              y2={mapY(10)}
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="1"
            />
          ))}
          {[0, 2, 4, 6, 8].map((y) => (
            <line
              key={`hline-${y}`}
              x1={mapX(-3)}
              y1={mapY(y)}
              x2={mapX(3)}
              y2={mapY(y)}
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="1"
            />
          ))}

          {/* Axes */}
          <line
            x1={mapX(-3)}
            y1={mapY(0)}
            x2={mapX(3)}
            y2={mapY(0)}
            stroke="rgba(0,0,0,0.25)"
            strokeWidth="2"
          />
          <line
            x1={mapX(0)}
            y1={mapY(0)}
            x2={mapX(0)}
            y2={mapY(10)}
            stroke="rgba(0,0,0,0.25)"
            strokeWidth="2"
          />

          {/* Axis labels */}
          <text x={mapX(3) + 10} y={mapY(0) + 5} fontSize="14" fill="#64748B">
            x
          </text>
          <text x={mapX(0) - 25} y={mapY(10) - 10} fontSize="14" fill="#64748B">
            f(x)
          </text>

          {/* Tick marks and labels */}
          {[-2, -1, 1, 2].map((x) => (
            <g key={`tick-${x}`}>
              <line
                x1={mapX(x)}
                y1={mapY(0) - 5}
                x2={mapX(x)}
                y2={mapY(0) + 5}
                stroke="rgba(0,0,0,0.25)"
                strokeWidth="1"
              />
              <text
                x={mapX(x)}
                y={mapY(0) + 20}
                fontSize="12"
                fill="#94A3B8"
                textAnchor="middle"
              >
                {x}
              </text>
            </g>
          ))}

          {/* Curve f(x) = x² */}
          <path
            d={`M ${curvePoints.map((p) => `${mapX(p.x)},${mapY(p.y)}`).join(" L ")}`}
            fill="none"
            stroke="url(#curve-gradient)"
            strokeWidth="3"
          />

          {/* Tangent line */}
          {tangentPoints.length > 0 && (
            <path
              d={`M ${tangentPoints.map((p) => `${mapX(p.x)},${mapY(p.y)}`).join(" L ")}`}
              fill="none"
              stroke="rgba(107,140,174,0.9)"
              strokeWidth="2"
              strokeDasharray="6 3"
            />
          )}

          {/* Current point (draggable) */}
          <circle
            cx={mapX(xPoint)}
            cy={mapY(currentY)}
            r="10"
            fill="#D97706"
            stroke="#FFFFFF"
            strokeWidth="2"
            style={{ cursor: "grab" }}
            onMouseDown={(e) => {
              const svg = e.currentTarget.ownerSVGElement;
              if (!svg) return;

              const handleMouseMove = (moveEvent: MouseEvent) => {
                const rect = svg.getBoundingClientRect();
                const svgX = moveEvent.clientX - rect.left;
                const dataX = ((svgX - 50) / 500) * 6 - 3;
                const clampedX = Math.max(-3, Math.min(3, dataX));
                setXPoint(clampedX);
              };

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          />

          {/* Labels */}
          <text
            x={mapX(xPoint)}
            y={mapY(currentY) - 20}
            fontSize="12"
            fill="#B45309"
            textAnchor="middle"
            fontWeight="bold"
          >
            ({xPoint.toFixed(2)}, {currentY.toFixed(2)})
          </text>

          {/* Slope indicator */}
          {tangentPoints.length > 0 && (
            <text
              x={mapX(xPoint + 1)}
              y={mapY(currentY + currentSlope * 1) - 10}
              fontSize="11"
              fill="#0F4C81"
              fontWeight="bold"
            >
              slope = {currentSlope.toFixed(2)}
            </text>
          )}
        </svg>
      </div>

      {/* Current state display */}
      <div className="max-w-md">
        <div className="bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-4">
          <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
            Current State
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-[color:var(--color-text-secondary)]">Position x:</span>
              <span className="font-mono text-[#B45309] font-bold">
                {xPoint.toFixed(3)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[color:var(--color-text-secondary)]">
                Value f(x) = x²:
              </span>
              <span className="font-mono text-[color:var(--color-text-primary)]">
                {currentY.toFixed(3)}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-[rgba(0,0,0,0.1)] pt-2">
              <span className="text-[color:var(--color-text-secondary)]">
                Derivative f&apos;(x) = 2x:
              </span>
              <span className="font-mono text-[color:var(--color-accent)] font-bold">
                {currentSlope.toFixed(3)}
              </span>
            </div>
            <div className="mt-3 p-2 bg-[rgba(15,76,129,0.06)] rounded">
              <p className="text-xs text-[color:var(--color-text-secondary)]">
                {currentSlope > 0.01
                  ? "Positive slope → Function increasing → Go left to decrease"
                  : currentSlope < -0.01
                    ? "Negative slope → Function decreasing → Go right to decrease"
                    : "Zero slope → At minimum!"}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Key insight */}
      <div className="bg-[rgba(255,200,87,0.08)] border border-[rgba(255,200,87,0.3)] rounded-lg p-4">
        <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-2">
          Key Insight: Derivative = Direction to Move
        </h4>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          The derivative tells us the slope, and the slope tells us the direction: a{" "}
          <strong>positive</strong> slope means downhill is to the left, a <strong>negative</strong>{" "}
          slope means downhill is to the right, and a slope of <strong>zero</strong> means
          you&apos;re standing at the bottom. How to turn that direction into actual steps toward
          the minimum is the next section: gradient descent.
        </p>
      </div>
    </div>
  );
}
