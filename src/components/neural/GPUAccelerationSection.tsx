'use client';

import React from 'react';
import { CPUvsGPUArchitecture } from './gpu/CPUvsGPUArchitecture';
import { MatrixMultiplicationVisualizer } from './gpu/MatrixMultiplicationVisualizer';
import { PerformanceBenchmarkPanel } from './gpu/PerformanceBenchmarkPanel';

export function GPUAccelerationSection() {
  return (
    <section className="space-y-12">
      {/* CPU vs GPU Architecture */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)]">CPU vs GPU: Architecture Comparison</h3>
        <CPUvsGPUArchitecture />
      </div>

      {/* Matrix Multiplication */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)]">Why ML Needs Parallelism: Matrix Multiplication</h3>
        <MatrixMultiplicationVisualizer />
      </div>

      {/* Performance Benchmarks */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)]">Real-World Performance Benchmarks</h3>
        <PerformanceBenchmarkPanel />
      </div>
    </section>
  );
}
