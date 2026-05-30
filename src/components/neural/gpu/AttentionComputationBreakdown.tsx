'use client';

import React, { useState } from 'react';
import { BlockMath } from 'react-katex';

type Step = 'qk' | 'softmax' | 'value' | null;

export function AttentionComputationBreakdown() {
  const [activeStep, setActiveStep] = useState<Step>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const matrixSize = 16; // Representing a simplified attention matrix

  const startAnimation = () => {
    setIsAnimating(true);
    const steps: Step[] = ['qk', 'softmax', 'value', null];
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setActiveStep(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 1500);
  };

  const getIntensity = (row: number, col: number): number => {
    // Simple pattern for visualization
    const distance = Math.abs(row - col);
    return Math.max(0, 1 - distance / matrixSize);
  };

  return (
    <div className="space-y-6">
      {/* Formula */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 border-l-4 border-l-purple-500">
        <h4 className="text-lg font-semibold text-[color:var(--color-text-primary)] mb-4">Attention Mechanism Formula</h4>
        <div className="my-6 flex justify-center">
          <div className="bg-white rounded-lg p-8 border-2 border-purple-300 shadow-lg">
            <BlockMath math="\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) \times V" />
          </div>
        </div>

        {/* Formula Breakdown */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h5 className="text-sm font-semibold text-purple-600 mb-2">Matrix Inputs</h5>
            <ul className="text-sm text-[color:var(--color-text-secondary)] space-y-1">
              <li><strong className="text-purple-600">Q</strong> (Query): "What am I looking for?"</li>
              <li><strong className="text-purple-600">K</strong> (Key): "What do I contain?"</li>
              <li><strong className="text-purple-600">V</strong> (Value): "What information do I have?"</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h5 className="text-sm font-semibold text-amber-600 mb-2">Three Steps</h5>
            <ul className="text-sm text-[color:var(--color-text-secondary)] space-y-1">
              <li><strong className="text-amber-600">1.</strong> QK<sup>T</sup> → Compute similarity scores</li>
              <li><strong className="text-orange-500">2.</strong> softmax(…/√d<sub>k</sub>) → Normalize to probabilities</li>
              <li><strong className="text-green-600">3.</strong> × V → Weighted sum of values</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Visual Breakdown */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h4 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">Computational Breakdown for GPT-3</h4>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[color:var(--color-text-secondary)]">Sequence length (n):</span>
              <span className="font-semibold text-[color:var(--color-text-primary)]">2,048 tokens</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[color:var(--color-text-secondary)]">Hidden dimension (d):</span>
              <span className="font-semibold text-[color:var(--color-text-primary)]">12,288</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[color:var(--color-text-secondary)]">Number of layers:</span>
              <span className="font-semibold text-[color:var(--color-text-primary)]">96 layers</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[color:var(--color-text-secondary)]">Attention heads per layer:</span>
              <span className="font-semibold text-[color:var(--color-text-primary)]">96 heads</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-[color:var(--color-text-secondary)]">QK<sup>T</sup> matrix size:</span>
              <span className="font-semibold text-amber-600">2,048 × 2,048</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-[color:var(--color-text-secondary)]">Operations per head:</span>
              <span className="font-semibold text-amber-600">~52M operations</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-[color:var(--color-text-secondary)]">Total per forward pass:</span>
              <span className="font-semibold text-red-600">~314 TFLOPS</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-[color:var(--color-text-secondary)]">H100 throughput (FP16):</span>
              <span className="font-semibold text-green-600">1,000 TFLOPS</span>
            </div>
          </div>
        </div>

      </div>

      {/* GPU Advantage Panel */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 border-l-4 border-l-orange-500">
          <h5 className="text-lg font-semibold text-orange-600 mb-3">CPU Processing</h5>
          <div className="space-y-2 text-sm text-[color:var(--color-text-secondary)]">
            <div className="flex justify-between">
              <span>Processing time:</span>
              <span className="font-semibold text-orange-600">~30 seconds</span>
            </div>
            <div className="flex justify-between">
              <span>Throughput:</span>
              <span className="font-semibold text-orange-600">~10 TFLOPS</span>
            </div>
            <div className="flex justify-between">
              <span>Bottleneck:</span>
              <span className="font-semibold text-red-600">Sequential execution</span>
            </div>
          </div>
        </div>

        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6 border-l-4 border-l-cyan-500">
          <h5 className="text-lg font-semibold text-cyan-600 mb-3">GPU Processing (H100)</h5>
          <div className="space-y-2 text-sm text-[color:var(--color-text-secondary)]">
            <div className="flex justify-between">
              <span>Processing time:</span>
              <span className="font-semibold text-green-600">~0.3 seconds</span>
            </div>
            <div className="flex justify-between">
              <span>Throughput:</span>
              <span className="font-semibold text-green-600">1,000 TFLOPS</span>
            </div>
            <div className="flex justify-between">
              <span>Advantage:</span>
              <span className="font-semibold text-green-600">100x faster</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
