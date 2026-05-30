'use client';

import React, { useState, useEffect } from 'react';

type ProcessingMode = 'idle' | 'cpu' | 'gpu';

export function MatrixMultiplicationVisualizer() {
  const [mode, setMode] = useState<ProcessingMode>('idle');
  const [activeRow, setActiveRow] = useState<number>(-1);
  const [completedRows, setCompletedRows] = useState<number[]>([]);
  const [operationCount, setOperationCount] = useState(0);

  const matrixSize = 20;

  useEffect(() => {
    if (mode === 'idle') {
      setActiveRow(-1);
      setCompletedRows([]);
      setOperationCount(0);
      return;
    }

    if (mode === 'cpu') {
      // Sequential processing
      let row = 0;
      const interval = setInterval(() => {
        if (row < matrixSize) {
          setActiveRow(row);
          setOperationCount(prev => prev + matrixSize);
          setTimeout(() => {
            setCompletedRows(prev => [...prev, row]);
            setActiveRow(-1);
          }, 80);
          row++;
        } else {
          clearInterval(interval);
          setTimeout(() => setMode('idle'), 1000);
        }
      }, 100);

      return () => clearInterval(interval);
    }

    if (mode === 'gpu') {
      // Parallel processing - all at once
      setTimeout(() => {
        const allRows = Array.from({ length: matrixSize }, (_, i) => i);
        setCompletedRows(allRows);
        setOperationCount(matrixSize * matrixSize);
        setTimeout(() => setMode('idle'), 1500);
      }, 100);
    }
  }, [mode]);

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

      {/* Visual Demonstration */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* CPU Processing */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold text-orange-500">CPU: Sequential</h4>
            <span className="text-sm text-[color:var(--color-text-secondary)]">One row at a time</span>
          </div>

          <div className="border-2 border-orange-300 rounded-lg p-4 bg-orange-50">
            <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${matrixSize}, 1fr)` }}>
              {Array.from({ length: matrixSize * matrixSize }).map((_, i) => {
                const row = Math.floor(i / matrixSize);
                const isActive = mode === 'cpu' && row === activeRow;
                const isCompleted = completedRows.includes(row);

                return (
                  <div
                    key={i}
                    className={`
                      aspect-square rounded-sm transition-all duration-200
                      ${isActive ? 'bg-orange-500 shadow-sm shadow-orange-500' : ''}
                      ${isCompleted && !isActive ? 'bg-orange-500/40' : ''}
                      ${!isActive && !isCompleted ? 'bg-orange-500/10' : ''}
                    `}
                  />
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setMode('cpu')}
            disabled={mode !== 'idle'}
            className="w-full px-4 py-2 bg-orange-500 rounded-lg font-semibold
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-orange-600 transition-colors"
          >
            {mode === 'cpu' ? 'Processing...' : 'Run CPU Mode'}
          </button>
        </div>

        {/* GPU Processing */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold text-cyan-600">GPU: Parallel</h4>
            <span className="text-sm text-[color:var(--color-text-secondary)]">All rows simultaneously</span>
          </div>

          <div className="border-2 border-cyan-300 rounded-lg p-4 bg-cyan-50">
            <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${matrixSize}, 1fr)` }}>
              {Array.from({ length: matrixSize * matrixSize }).map((_, i) => {
                const row = Math.floor(i / matrixSize);
                const isCompleted = mode === 'gpu' && completedRows.includes(row);

                return (
                  <div
                    key={i}
                    className={`
                      aspect-square rounded-sm transition-all duration-200
                      ${isCompleted ? 'bg-cyan-500 shadow-sm shadow-cyan-500' : 'bg-cyan-500/10'}
                    `}
                  />
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setMode('gpu')}
            disabled={mode !== 'idle'}
            className="w-full px-4 py-2 bg-cyan-500 rounded-lg font-semibold
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-cyan-600 transition-colors"
          >
            {mode === 'gpu' ? 'Processing...' : 'Run GPU Mode'}
          </button>
        </div>
      </div>

      {/* Operation Counter */}
      {mode !== 'idle' && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
          <div className="text-sm text-[color:var(--color-text-secondary)]">Operations Completed</div>
          <div className="text-3xl font-bold font-mono text-[color:var(--color-text-primary)]">
            {operationCount.toLocaleString()} / {(matrixSize * matrixSize).toLocaleString()}
          </div>
        </div>
      )}

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
