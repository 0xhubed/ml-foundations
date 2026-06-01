'use client';

import React, { useState } from 'react';

type TabType = 'training' | 'inference';
type ModelSize = '117M' | '350M' | '1.5B' | '7B' | '13B' | '70B';

const trainingBenchmarks = {
  '117M': { cpu: 168, rtx4090: 4, a100: 2, h100: 1 },
  '350M': { cpu: 504, rtx4090: 12, a100: 6, h100: 3 },
  '1.5B': { cpu: 2160, rtx4090: 48, a100: 24, h100: 12 },
  '7B': { cpu: 10080, rtx4090: 168, a100: 84, h100: 42 },
  '13B': { cpu: 18720, rtx4090: 312, a100: 156, h100: 78 },
  '70B': { cpu: 100800, rtx4090: 1680, a100: 840, h100: 420 },
};

const inferenceBenchmarks = {
  '117M': { cpu: 5, rtx4090: 100, a100: 300, h100: 600 },
  '350M': { cpu: 3, rtx4090: 80, a100: 250, h100: 500 },
  '1.5B': { cpu: 2, rtx4090: 60, a100: 200, h100: 400 },
  '7B': { cpu: 1, rtx4090: 40, a100: 150, h100: 300 },
  '13B': { cpu: 0.5, rtx4090: 25, a100: 100, h100: 200 },
  '70B': { cpu: 0.1, rtx4090: 10, a100: 50, h100: 100 },
};

export function PerformanceBenchmarkPanel() {
  const [activeTab, setActiveTab] = useState<TabType>('training');
  const [selectedModel, setSelectedModel] = useState<ModelSize>('117M');

  const modelSizes: ModelSize[] = ['117M', '350M', '1.5B', '7B', '13B', '70B'];

  const formatTime = (hours: number): string => {
    if (hours < 1) return `${Math.round(hours * 60)} min`;
    if (hours < 24) return `${hours} hrs`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days} days`;
  };

  const currentBenchmarks = activeTab === 'training'
    ? trainingBenchmarks[selectedModel]
    : inferenceBenchmarks[selectedModel];

  const speedup = activeTab === 'training'
    ? Math.round(currentBenchmarks.cpu / currentBenchmarks.h100)
    : Math.round(currentBenchmarks.h100 / currentBenchmarks.cpu);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-[rgba(0,0,0,0.05)] rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('training')}
          className={`px-6 py-2 rounded-md font-semibold transition-all ${
            activeTab === 'training'
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Training
        </button>
        <button
          onClick={() => setActiveTab('inference')}
          className={`px-6 py-2 rounded-md font-semibold transition-all ${
            activeTab === 'inference'
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Inference
        </button>
      </div>

      {/* Model Size Selector */}
      <div className="glass-panel p-6">
        <label className="block text-sm font-semibold mb-3">Model Size (Parameters)</label>
        <div className="flex flex-wrap gap-2">
          {modelSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedModel(size)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedModel === size
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Results Panel */}
      {activeTab === 'training' ? (
        <div className="glass-panel p-6">
          <h4 className="text-xl font-semibold mb-4">
            Training Time: GPT-2 {selectedModel} (1 epoch on 1M samples)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4">Hardware</th>
                  <th className="text-center py-3 px-4">Training Time</th>
                  <th className="text-center py-3 px-4">Use Case</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-semibold text-orange-400">CPU (16-core Xeon)</td>
                  <td className="text-center py-3 px-4">{formatTime(currentBenchmarks.cpu)}</td>
                  <td className="text-center py-3 px-4 text-red-400">Not practical</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-semibold text-cyan-400">GPU (NVIDIA RTX 4090)</td>
                  <td className="text-center py-3 px-4">{formatTime(currentBenchmarks.rtx4090)}</td>
                  <td className="text-center py-3 px-4 text-yellow-400">Research/Development</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-semibold text-cyan-400">GPU (NVIDIA A100)</td>
                  <td className="text-center py-3 px-4">{formatTime(currentBenchmarks.a100)}</td>
                  <td className="text-center py-3 px-4 text-green-400">Enterprise</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-cyan-400">GPU (NVIDIA H100)</td>
                  <td className="text-center py-3 px-4">{formatTime(currentBenchmarks.h100)}</td>
                  <td className="text-center py-3 px-4 text-green-400">Cutting-edge</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="text-center">
              <span className="text-sm text-gray-400">Speedup with H100: </span>
              <span className="text-2xl font-bold text-green-400">{speedup}x faster</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel p-6">
          <h4 className="text-xl font-semibold mb-4">
            Inference Performance: {selectedModel} Model
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4">Hardware</th>
                  <th className="text-center py-3 px-4">Tokens/Second</th>
                  <th className="text-center py-3 px-4">Response Time (100 tokens)</th>
                  <th className="text-center py-3 px-4">Use Case</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-semibold text-orange-400">CPU</td>
                  <td className="text-center py-3 px-4">{currentBenchmarks.cpu} t/s</td>
                  <td className="text-center py-3 px-4">{Math.round(100 / currentBenchmarks.cpu)}s</td>
                  <td className="text-center py-3 px-4 text-red-400">Not practical</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-semibold text-cyan-400">GPU (RTX 4090)</td>
                  <td className="text-center py-3 px-4">{currentBenchmarks.rtx4090} t/s</td>
                  <td className="text-center py-3 px-4">{(100 / currentBenchmarks.rtx4090).toFixed(1)}s</td>
                  <td className="text-center py-3 px-4 text-yellow-400">Local development</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-semibold text-cyan-400">GPU (A100)</td>
                  <td className="text-center py-3 px-4">{currentBenchmarks.a100} t/s</td>
                  <td className="text-center py-3 px-4">{(100 / currentBenchmarks.a100).toFixed(2)}s</td>
                  <td className="text-center py-3 px-4 text-green-400">Production API</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-cyan-400">GPU (H100)</td>
                  <td className="text-center py-3 px-4">{currentBenchmarks.h100} t/s</td>
                  <td className="text-center py-3 px-4">{(100 / currentBenchmarks.h100).toFixed(2)}s</td>
                  <td className="text-center py-3 px-4 text-green-400">High-throughput</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="text-center">
              <span className="text-sm text-gray-400">Speedup with H100: </span>
              <span className="text-2xl font-bold text-green-400">{speedup}x faster</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
