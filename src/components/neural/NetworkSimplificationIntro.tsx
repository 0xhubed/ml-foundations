"use client";

import { InlineMath } from "react-katex";
import { NeuralNetworkArchitectureViz } from "@/components/neural/NeuralNetworkArchitectureViz";

export function NetworkSimplificationIntro() {
  return (
    <div className="mb-12">
      {/* Multi-layer Network */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)] mb-4">
          Real Neural Networks Are Complex
        </h3>
        <p className="section-body mb-6 max-w-3xl">
          Modern neural networks have multiple layers and millions (or billions) of parameters.
          Click on any node or connection to see the matrix multiplication details:
        </p>

        <div className="mb-8">
          <NeuralNetworkArchitectureViz />
        </div>
      </div>

      {/* Simplification Explanation */}
      <div className="mb-10 p-6 bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">→</span>
          <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)]">
            Simplifying to Understand Learning
          </h3>
        </div>
        <p className="section-body">
          To understand <strong className="text-[color:var(--color-accent)]">how neural networks learn</strong>,
          we&apos;ll start with the simplest possible case: <strong className="text-[color:var(--color-accent)]">a single linear layer
          with just two parameters</strong>. By using a linear activation function (identity), we can collapse the entire
          network into a simple equation: <strong>f(x) = wx + b</strong>
        </p>
      </div>

      {/* Simple Linear Model */}
      <div className="glass-panel max-w-4xl mx-auto p-6">
        <h3 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-4">
          The Simplest Neural Network: Linear Model
        </h3>

        {/* Linear model diagram */}
        {/* neural-network-viz opts out of the global circle-restyling rule in globals.css */}
        <svg viewBox="0 0 600 180" className="neural-network-viz w-full max-w-2xl mx-auto mb-5" role="img" aria-label="Simple linear neural network">
          <defs>
            <marker id="arrow-linear-model" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
              <path d="M2,2 L10,6 L2,10 L4,6 Z" fill="#0F4C81" />
            </marker>
          </defs>

          {/* Input Node */}
          <circle cx="90" cy="90" r="36" fill="rgba(107,140,174,0.12)" stroke="#6B8CAE" strokeWidth="2" />
          <text x="90" y="97" textAnchor="middle" fontSize="22" fill="#0F4C81" fontWeight="600" fontFamily="var(--font-space-grotesk)">x</text>
          <text x="90" y="145" textAnchor="middle" fontSize="13" fill="#64748B" fontWeight="500">Input</text>

          {/* Connection line with weight label */}
          <line x1="130" y1="90" x2="205" y2="90" stroke="#0F4C81" strokeWidth="2" markerEnd="url(#arrow-linear-model)" />
          <rect x="152" y="68" width="32" height="22" rx="4" fill="white" stroke="#0F4C81" strokeWidth="1.5" />
          <text x="168" y="84" textAnchor="middle" fontSize="14" fill="#0F4C81" fontWeight="700">w</text>

          {/* Linear Layer (rectangle) */}
          <rect x="215" y="50" width="170" height="80" rx="12" fill="rgba(15,76,129,0.06)" stroke="#0F4C81" strokeWidth="2" />
          <text x="300" y="85" textAnchor="middle" fontSize="20" fill="#0F4C81" fontWeight="700" fontFamily="var(--font-space-grotesk)">wx + b</text>
          <text x="300" y="108" textAnchor="middle" fontSize="11" fill="#64748B" fontWeight="500">(identity activation)</text>
          <text x="300" y="150" textAnchor="middle" fontSize="13" fill="#64748B" fontWeight="600">Linear Layer</text>

          {/* +b annotation with badge */}
          <rect x="275" y="22" width="50" height="22" rx="11" fill="#0F4C81" />
          <text x="300" y="37" textAnchor="middle" fontSize="12" fill="white" fontWeight="600">+ b</text>
          <line x1="300" y1="44" x2="300" y2="50" stroke="#0F4C81" strokeWidth="1.5" />

          {/* Arrow from Linear Layer to Output */}
          <line x1="390" y1="90" x2="465" y2="90" stroke="#0F4C81" strokeWidth="2" markerEnd="url(#arrow-linear-model)" />

          {/* Output Node */}
          <circle cx="510" cy="90" r="36" fill="rgba(255,200,87,0.15)" stroke="#FFC857" strokeWidth="2" />
          <text x="510" y="97" textAnchor="middle" fontSize="22" fill="#B45309" fontWeight="600" fontFamily="var(--font-space-grotesk)">ŷ</text>
          <text x="510" y="145" textAnchor="middle" fontSize="13" fill="#64748B" fontWeight="500">Output</text>
        </svg>

        {/* Formula - styled as a card */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-[rgba(15,76,129,0.06)] border border-[rgba(15,76,129,0.15)]">
            <InlineMath math="f_{w,b}(x) = wx + b" />
          </div>
        </div>

        {/* Explanation - two columns */}
        <div className="flex justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-[rgba(15,76,129,0.1)] flex items-center justify-center text-[#0F4C81] font-bold text-xs">w</span>
            <span className="text-[color:var(--color-text-secondary)]">Weight controls <strong className="text-[#0F4C81]">slope</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-[rgba(15,76,129,0.1)] flex items-center justify-center text-[#0F4C81] font-bold text-xs">b</span>
            <span className="text-[color:var(--color-text-secondary)]">Bias controls <strong className="text-[#0F4C81]">offset</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
