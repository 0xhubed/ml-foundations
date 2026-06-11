'use client';

import React, { useState } from 'react';

interface MilestoneData {
  year: number;
  model: string;
  params: string;
  gpuCount: number;
  gpuType: string;
  trainingTime: string;
  trainingCost: string;
  cpuEquivalent: string;
  impact: string;
  color: string;
}

const milestones: MilestoneData[] = [
  {
    year: 2012,
    model: 'AlexNet',
    params: '60M',
    gpuCount: 2,
    gpuType: 'GTX 580',
    trainingTime: '6 days',
    trainingCost: '~$500',
    cpuEquivalent: '~6 months',
    impact: 'First proof that GPUs enable deep learning',
    color: 'cyan',
  },
  {
    year: 2017,
    model: 'Transformer',
    params: '65M',
    gpuCount: 8,
    gpuType: 'P100',
    trainingTime: '3.5 days',
    trainingCost: '~$2,000',
    cpuEquivalent: '~4 months',
    impact: 'Foundation for BERT, GPT series',
    color: 'blue',
  },
  {
    year: 2018,
    model: 'BERT-Large',
    params: '340M',
    gpuCount: 64,
    gpuType: 'TPU v3',
    trainingTime: '4 days',
    trainingCost: '~$7,000',
    cpuEquivalent: '~2 years',
    impact: 'Revolutionized NLP tasks',
    color: 'purple',
  },
  {
    year: 2020,
    model: 'GPT-3',
    params: '175B',
    gpuCount: 10000,
    gpuType: 'V100',
    trainingTime: '34 days',
    trainingCost: '~$5M',
    cpuEquivalent: '~9 years',
    impact: 'First truly general-purpose language model',
    color: 'green',
  },
  {
    year: 2023,
    model: 'GPT-4',
    params: '~1.7T (est)',
    gpuCount: 25000,
    gpuType: 'A100/H100',
    trainingTime: '90+ days (est)',
    trainingCost: '~$100M',
    cpuEquivalent: 'Impossible in practice',
    impact: 'State-of-the-art multimodal reasoning',
    color: 'orange',
  },
];

export function AITimelineVisualizer() {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      cyan: { bg: 'bg-cyan-500', border: 'border-cyan-500', text: 'text-cyan-600' },
      blue: { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-600' },
      purple: { bg: 'bg-purple-500', border: 'border-purple-500', text: 'text-purple-600' },
      green: { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-600' },
      orange: { bg: 'bg-orange-500', border: 'border-orange-500', text: 'text-orange-600' },
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div className="space-y-6">
      {/* Timeline Visualization */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-orange-500" />

        {/* Milestones */}
        <div className="space-y-8">
          {milestones.map((milestone, index) => {
            const colors = getColorClasses(milestone.color);
            const isSelected = selectedMilestone === index;

            return (
              <div key={index} className="relative pl-20">
                {/* Timeline Dot */}
                <div
                  className={`absolute left-4 top-6 w-9 h-9 rounded-full border-4 ${colors.border} bg-white
                              flex items-center justify-center cursor-pointer transform transition-all shadow-sm
                              ${isSelected ? 'scale-125 shadow-md' : 'hover:scale-110'}`}
                  onClick={() => setSelectedMilestone(isSelected ? null : index)}
                >
                  <div className={`w-3 h-3 rounded-full ${colors.bg}`} />
                </div>

                {/* Milestone Card */}
                <div
                  className={`glass-panel p-6 cursor-pointer transition-all ${
                    isSelected ? `border-l-4 ${colors.border}` : 'border-l-4 border-transparent'
                  }`}
                  onClick={() => setSelectedMilestone(isSelected ? null : index)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className={`text-sm font-semibold ${colors.text}`}>{milestone.year}</div>
                      <h5 className="text-xl font-bold text-[color:var(--color-text-primary)]">{milestone.model}</h5>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[color:var(--color-text-muted)]">Parameters</div>
                      <div className="text-lg font-bold text-[color:var(--color-text-primary)]">{milestone.params}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-[color:var(--color-text-muted)]">GPUs</div>
                      <div className="font-semibold text-[color:var(--color-text-primary)]">
                        {milestone.gpuCount} × {milestone.gpuType}
                      </div>
                    </div>
                    <div>
                      <div className="text-[color:var(--color-text-muted)]">Training Time</div>
                      <div className="font-semibold text-[color:var(--color-text-primary)]">{milestone.trainingTime}</div>
                    </div>
                    <div>
                      <div className="text-[color:var(--color-text-muted)]">Cost</div>
                      <div className="font-semibold text-[color:var(--color-text-primary)]">{milestone.trainingCost}</div>
                    </div>
                    <div>
                      <div className="text-[color:var(--color-text-muted)]">CPU Equivalent</div>
                      <div className="font-semibold text-red-600">{milestone.cpuEquivalent}</div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-[rgba(0,0,0,0.1)]">
                      <div className="text-sm text-[color:var(--color-text-muted)] mb-1">Impact</div>
                      <div className="text-[color:var(--color-text-primary)]">{milestone.impact}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Insight */}
      <div className="glass-panel p-6 border-l-4 border-blue-500">
        <h5 className="text-lg font-semibold text-[color:var(--color-text-primary)] mb-3">The GPU Revolution</h5>
        <div className="space-y-3 text-sm text-[color:var(--color-text-secondary)]">
          <p>
            Modern transformers like GPT-4, Claude, and Gemini would be <strong className="text-red-600">practically
            impossible</strong> to train on CPUs. The 1000–10,000x speedup isn&apos;t just about convenience — it&apos;s the
            difference between:
          </p>
          <ul className="space-y-2 ml-2">
            <li className="flex items-start gap-2">
              <span aria-hidden className="text-[#059669] mt-0.5">✓</span>
              <span>Training in weeks vs. decades</span>
            </li>
            <li className="flex items-start gap-2">
              <span aria-hidden className="text-[#059669] mt-0.5">✓</span>
              <span>Iterating on ideas vs. waiting years for results</span>
            </li>
            <li className="flex items-start gap-2">
              <span aria-hidden className="text-[#059669] mt-0.5">✓</span>
              <span>Democratized AI research vs. only the wealthiest organizations participating</span>
            </li>
          </ul>
          <p className="pt-3 border-t border-[rgba(0,0,0,0.1)]">
            <strong className="text-[color:var(--color-text-primary)]">Bottom line:</strong> GPUs didn&apos;t just make AI faster — they made modern AI <em>possible</em>.
          </p>
        </div>
      </div>
    </div>
  );
}
