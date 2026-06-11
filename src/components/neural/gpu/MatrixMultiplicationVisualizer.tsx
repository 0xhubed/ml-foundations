'use client';

import React from 'react';

export function MatrixMultiplicationVisualizer() {
  return (
    <div className="space-y-6">
      {/* Comparison Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h4 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">Performance Comparison</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-4 text-[color:var(--color-text-primary)]">Operation</th>
                <th className="text-center py-2 px-4 text-orange-600">CPU (Sequential)</th>
                <th className="text-center py-2 px-4 text-cyan-600">GPU (Parallel)</th>
                <th className="text-center py-2 px-4 text-[color:var(--color-text-primary)]">Speedup</th>
              </tr>
            </thead>
            <tbody className="text-[color:var(--color-text-secondary)]">
              <tr className="border-b border-gray-100">
                <td className="py-2 px-4">Single dot product</td>
                <td className="text-center py-2 px-4">1 μs</td>
                <td className="text-center py-2 px-4">1 μs</td>
                <td className="text-center py-2 px-4 text-[color:var(--color-text-muted)]">1x</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-4">1000 dot products</td>
                <td className="text-center py-2 px-4">1000 μs</td>
                <td className="text-center py-2 px-4">1 μs</td>
                <td className="text-center py-2 px-4 text-green-600 font-bold">1000x</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Full matrix multiply (1000×1000)</td>
                <td className="text-center py-2 px-4">~1 ms</td>
                <td className="text-center py-2 px-4">~0.001 ms</td>
                <td className="text-center py-2 px-4 text-green-600 font-bold">1000x</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 border-l-4 border-l-purple-500">
        <h5 className="text-lg font-semibold text-[color:var(--color-text-primary)] mb-3">What Happens in a Transformer Layer</h5>
        <pre className="text-sm text-[color:var(--color-text-secondary)] overflow-x-auto bg-white p-4 rounded-lg border border-gray-200">
{`# Input shape: [batch=32, seq=512, dim=768]
# Weight matrix: [768, 768]

# CPU: loops through each of 32×512 = 16,384 vectors
for batch in range(32):
    for position in range(512):
        output[batch][position] = matmul(X[batch][position], W)
        # Takes: 16,384 sequential operations

# GPU: processes all 16,384 in parallel
output = matmul(X, W)  # Single parallel operation`}
        </pre>
      </div>
    </div>
  );
}
