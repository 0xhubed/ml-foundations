'use client';

import React from 'react';

export function CPUvsGPUArchitecture() {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-6">
        {/* CPU Architecture */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-orange-600">CPU</h4>
            <p className="text-xs text-[color:var(--color-text-secondary)]">Few powerful cores</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="shrink-0 rounded-lg border-2 border-orange-300 bg-orange-50 p-3">
              <div className="grid w-28 grid-cols-4 gap-1.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-sm border border-orange-500/40 bg-orange-500/15"
                  />
                ))}
              </div>
              <p className="mt-2 text-center text-[10px] text-[color:var(--color-text-muted)]">
                8–16 cores
              </p>
            </div>
            <div className="flex-1 space-y-1.5 text-sm text-[color:var(--color-text-secondary)]">
              <div className="flex justify-between gap-2">
                <span>Clock speed:</span>
                <span className="font-semibold text-orange-600">~3–5 GHz</span>
              </div>
              <div className="flex justify-between gap-2">
                <span>Cache:</span>
                <span className="font-semibold text-orange-600">32–128 MB</span>
              </div>
              <div className="flex justify-between gap-2">
                <span>Design:</span>
                <span className="font-semibold text-orange-600 text-right">Complex control logic</span>
              </div>
            </div>
          </div>
        </div>

        {/* GPU Architecture */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-cyan-600">GPU</h4>
            <p className="text-xs text-[color:var(--color-text-secondary)]">Thousands of simple cores</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="shrink-0 rounded-lg border-2 border-cyan-300 bg-cyan-50 p-3">
              <div className="grid w-28 grid-cols-10 gap-0.5">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-[1px] border border-cyan-500/40 bg-cyan-500/15"
                  />
                ))}
              </div>
              <p className="mt-2 text-center text-[10px] text-[color:var(--color-text-muted)]">
                100 of 10,000+ cores
              </p>
            </div>
            <div className="flex-1 space-y-1.5 text-sm text-[color:var(--color-text-secondary)]">
              <div className="flex justify-between gap-2">
                <span>Clock speed:</span>
                <span className="font-semibold text-cyan-600">~1–2 GHz</span>
              </div>
              <div className="flex justify-between gap-2">
                <span>Memory:</span>
                <span className="font-semibold text-cyan-600">High-bandwidth VRAM</span>
              </div>
              <div className="flex justify-between gap-2">
                <span>Design:</span>
                <span className="font-semibold text-cyan-600 text-right">Optimized for parallel math</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="rounded-xl border border-blue-200 border-l-4 border-l-blue-500 bg-blue-50 p-5">
        <div className="space-y-2 text-sm text-[color:var(--color-text-secondary)]">
          <div>
            <strong className="text-orange-600">CPU:</strong> general-purpose, optimized for
            sequential tasks, branching logic, and low-latency single-thread performance.
          </div>
          <div>
            <strong className="text-cyan-600">GPU:</strong> specialized for{' '}
            <strong className="text-[color:var(--color-text-primary)]">massive parallelism</strong>:
            originally built for graphics (millions of pixels), now perfect for ML (millions of
            parameters).
          </div>
        </div>
      </div>
    </div>
  );
}
