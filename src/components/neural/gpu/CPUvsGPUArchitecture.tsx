'use client';

import React, { useState, useEffect } from 'react';

export function CPUvsGPUArchitecture() {
  const [animating, setAnimating] = useState(false);
  const [cpuActiveCores, setCpuActiveCores] = useState<number[]>([]);
  const [gpuActiveCores, setGpuActiveCores] = useState<number[]>([]);

  const cpuCoreCount = 16;
  const gpuCoreCount = 100; // Simplified representation

  useEffect(() => {
    if (!animating) return;

    let cpuIndex = 0;
    const cpuInterval = setInterval(() => {
      if (cpuIndex < cpuCoreCount) {
        setCpuActiveCores(prev => [...prev, cpuIndex]);
        cpuIndex++;
      } else {
        clearInterval(cpuInterval);
      }
    }, 100);

    // GPU processes all at once
    setTimeout(() => {
      setGpuActiveCores(Array.from({ length: gpuCoreCount }, (_, i) => i));
    }, 200);

    const resetTimeout = setTimeout(() => {
      setCpuActiveCores([]);
      setGpuActiveCores([]);
      setAnimating(false);
    }, 3000);

    return () => {
      clearInterval(cpuInterval);
      clearTimeout(resetTimeout);
    };
  }, [animating]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* CPU Architecture */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
          <div className="space-y-2">
            <h4 className="text-2xl font-semibold text-orange-500">CPU Architecture</h4>
            <p className="text-sm text-[color:var(--color-text-secondary)]">Few powerful cores</p>
          </div>

          <div className="border-2 border-orange-300 rounded-lg p-6 bg-orange-50">
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: cpuCoreCount }).map((_, i) => (
                <div
                  key={i}
                  className={`
                    aspect-square rounded-md border-2 flex items-center justify-center
                    text-sm font-mono transition-all duration-300
                    ${cpuActiveCores.includes(i)
                      ? 'border-orange-400 bg-orange-500/30 shadow-lg shadow-orange-500/50'
                      : 'border-orange-500/30 bg-orange-500/10'
                    }
                  `}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1 text-sm text-[color:var(--color-text-secondary)]">
            <div className="flex justify-between">
              <span>Core count:</span>
              <span className="font-semibold text-orange-600">8-16 cores</span>
            </div>
            <div className="flex justify-between">
              <span>Clock speed:</span>
              <span className="font-semibold text-orange-600">~3-5 GHz</span>
            </div>
            <div className="flex justify-between">
              <span>Cache:</span>
              <span className="font-semibold text-orange-600">Large (32-128 MB)</span>
            </div>
            <div className="flex justify-between">
              <span>Design:</span>
              <span className="font-semibold text-orange-600">Complex control logic</span>
            </div>
          </div>
        </div>

        {/* GPU Architecture */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
          <div className="space-y-2">
            <h4 className="text-2xl font-semibold text-cyan-600">GPU Architecture</h4>
            <p className="text-sm text-[color:var(--color-text-secondary)]">Thousands of simple cores</p>
          </div>

          <div className="border-2 border-cyan-300 rounded-lg p-6 bg-cyan-50">
            <div className="grid grid-cols-10 gap-1">
              {Array.from({ length: gpuCoreCount }).map((_, i) => (
                <div
                  key={i}
                  className={`
                    aspect-square rounded-sm border transition-all duration-300
                    ${gpuActiveCores.includes(i)
                      ? 'border-cyan-400 bg-cyan-500/40 shadow-sm shadow-cyan-500/50'
                      : 'border-cyan-500/30 bg-cyan-500/10'
                    }
                  `}
                />
              ))}
            </div>
            <p className="text-center text-xs text-[color:var(--color-text-muted)] mt-2">
              (Showing 100 cores; actual: 10,000+)
            </p>
          </div>

          <div className="space-y-1 text-sm text-[color:var(--color-text-secondary)]">
            <div className="flex justify-between">
              <span>Core count:</span>
              <span className="font-semibold text-cyan-600">10,000+ cores</span>
            </div>
            <div className="flex justify-between">
              <span>Clock speed:</span>
              <span className="font-semibold text-cyan-600">~1-2 GHz</span>
            </div>
            <div className="flex justify-between">
              <span>Memory:</span>
              <span className="font-semibold text-cyan-600">High bandwidth VRAM</span>
            </div>
            <div className="flex justify-between">
              <span>Design:</span>
              <span className="font-semibold text-cyan-600">Optimized for parallel math</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 border-l-4 border-l-blue-500">
        <h5 className="text-lg font-semibold text-[color:var(--color-text-primary)] mb-3">Why the difference?</h5>
        <div className="space-y-3 text-[color:var(--color-text-secondary)]">
          <div>
            <strong className="text-orange-600">CPU:</strong> General-purpose processor.
            Optimized for sequential tasks, branching logic, and low-latency single-thread performance.
          </div>
          <div>
            <strong className="text-cyan-600">GPU:</strong> Specialized for <strong className="text-[color:var(--color-text-primary)]">massive parallelism</strong>.
            Originally designed for graphics (millions of pixels), now perfect for ML (millions of parameters).
          </div>
        </div>
      </div>
    </div>
  );
}
