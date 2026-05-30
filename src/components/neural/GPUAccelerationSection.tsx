'use client';

import React from 'react';
import { CPUvsGPUArchitecture } from './gpu/CPUvsGPUArchitecture';
import { MatrixMultiplicationVisualizer } from './gpu/MatrixMultiplicationVisualizer';
import { PerformanceBenchmarkPanel } from './gpu/PerformanceBenchmarkPanel';
import { AttentionComputationBreakdown } from './gpu/AttentionComputationBreakdown';
import { AITimelineVisualizer } from './gpu/AITimelineVisualizer';

export function GPUAccelerationSection() {
  return (
    <section className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-[color:var(--color-text-primary)]">Why Modern AI Requires GPUs</h2>
        <p className="text-xl text-[color:var(--color-text-secondary)]">
          Understanding the hardware revolution that made transformers and large language models possible
        </p>
      </div>

      {/* CPU vs GPU Architecture */}
      <div className="space-y-6">
        <h3 className="text-3xl font-semibold text-[color:var(--color-text-primary)]">CPU vs GPU: Architecture Comparison</h3>
        <CPUvsGPUArchitecture />
      </div>

      {/* Matrix Multiplication */}
      <div className="space-y-6">
        <h3 className="text-3xl font-semibold text-[color:var(--color-text-primary)]">Why ML Needs Parallelism: Matrix Multiplication</h3>
        <MatrixMultiplicationVisualizer />
      </div>

      {/* Performance Benchmarks */}
      <div className="space-y-6">
        <h3 className="text-3xl font-semibold text-[color:var(--color-text-primary)]">Real-World Performance Benchmarks</h3>
        <PerformanceBenchmarkPanel />
      </div>

      {/* Attention Mechanism */}
      <div className="space-y-6">
        <h3 className="text-3xl font-semibold text-[color:var(--color-text-primary)]">Why Transformers Especially Need GPUs</h3>
        <AttentionComputationBreakdown />
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        <h3 className="text-3xl font-semibold text-[color:var(--color-text-primary)]">Practical Implications for Modern AI</h3>
        <AITimelineVisualizer />
      </div>

      {/* Key Takeaways */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-8 space-y-6 shadow-sm">
        <h3 className="text-3xl font-semibold text-[color:var(--color-text-primary)]">Key Takeaways: Why GPUs Power Modern AI</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-xl font-medium text-cyan-600">Technical Advantages</h4>
            <ul className="space-y-2 text-[color:var(--color-text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 mt-1">•</span>
                <span><strong className="text-[color:var(--color-text-primary)]">Massive Parallelism:</strong> ML is fundamentally parallel (millions of independent calculations)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 mt-1">•</span>
                <span><strong className="text-[color:var(--color-text-primary)]">Memory Bandwidth:</strong> Fast access to billions of parameters</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 mt-1">•</span>
                <span><strong className="text-[color:var(--color-text-primary)]">Specialized Hardware:</strong> Tensor cores optimized for FP16/BF16 matrix operations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 mt-1">•</span>
                <span><strong className="text-[color:var(--color-text-primary)]">Economic Necessity:</strong> 100-1000x speedup makes research and deployment viable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 mt-1">•</span>
                <span><strong className="text-[color:var(--color-text-primary)]">Enabling Innovation:</strong> Without GPUs, transformers and modern LLMs would not exist</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-medium text-orange-500">What This Means for You</h4>
            <ul className="space-y-2 text-[color:var(--color-text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span><strong className="text-[color:var(--color-text-primary)]">Learning ML:</strong> Can start with CPU, but GPU needed for real models (Google Colab offers free GPUs)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span><strong className="text-[color:var(--color-text-primary)]">Research:</strong> Even small improvements need GPUs to iterate quickly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span><strong className="text-[color:var(--color-text-primary)]">Production:</strong> Inference at scale requires GPU infrastructure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span><strong className="text-[color:var(--color-text-primary)]">Costs:</strong> Cloud GPUs (~$1-5/hour) vs purchasing ($5k-15k for consumer/pro GPUs)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
