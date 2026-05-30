'use client';

import { useState } from 'react';

interface WordEmbedding {
  word: string;
  x: number;
  y: number;
  category: 'animal' | 'food' | 'action' | 'adjective';
}

const SAMPLE_EMBEDDINGS: WordEmbedding[] = [
  // Animals (clustered top-left)
  { word: "cat", x: 15, y: 20, category: 'animal' },
  { word: "dog", x: 20, y: 25, category: 'animal' },
  { word: "lion", x: 12, y: 30, category: 'animal' },
  { word: "tiger", x: 18, y: 35, category: 'animal' },
  // Food (clustered bottom-right)
  { word: "apple", x: 75, y: 70, category: 'food' },
  { word: "banana", x: 80, y: 75, category: 'food' },
  { word: "pizza", x: 70, y: 80, category: 'food' },
  // Actions (clustered center-right)
  { word: "run", x: 60, y: 40, category: 'action' },
  { word: "walk", x: 65, y: 45, category: 'action' },
  { word: "jump", x: 55, y: 38, category: 'action' },
  // Adjectives (scattered)
  { word: "happy", x: 40, y: 60, category: 'adjective' },
  { word: "fast", x: 50, y: 35, category: 'adjective' },
];

const CATEGORY_COLORS = {
  animal: { bg: 'rgba(107,140,174,0.4)', border: 'rgba(107,140,174,1)', text: 'rgba(107,140,174,1)' },
  food: { bg: 'rgba(255,200,87,0.4)', border: 'rgba(255,200,87,1)', text: 'rgba(255,200,87,1)' },
  action: { bg: 'rgba(34,197,94,0.4)', border: 'rgba(34,197,94,1)', text: 'rgba(34,197,94,1)' },
  adjective: { bg: 'rgba(91,156,245,0.4)', border: 'rgba(91,156,245,1)', text: 'rgba(91,156,245,1)' },
};

export function EmbeddingsVisual() {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [showVectors, setShowVectors] = useState(false);

  return (
    <div className="space-y-6">
      {/* Concept Introduction */}
      <div className="bg-white border-2 border-[var(--color-border)] rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
          Step 2: Embeddings
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          Each token ID becomes a <strong className="text-[var(--color-accent)]">high-dimensional vector</strong> (typically 768 or more dimensions).
          These vectors encode semantic meaning - similar words cluster together in this &quot;embedding space&quot;.
        </p>

        {/* Key insight */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
          <strong className="text-blue-700">The magic:</strong>
          <span className="text-blue-800 ml-2">
            Vector arithmetic works! &quot;king&quot; - &quot;man&quot; + &quot;woman&quot; = &quot;queen&quot;.
            Relationships are encoded as directions in space.
          </span>
        </div>
      </div>

      {/* Token to Vector Transformation */}
      <div className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] rounded-xl p-6">
        <div className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
          Token ID to Vector Lookup
        </div>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* Input Token */}
          <div className="text-center">
            <div className="text-xs text-[var(--color-text-muted)] mb-2">Token</div>
            <div className="px-4 py-3 bg-white border-2 border-[var(--color-accent)]/40 rounded-lg shadow-sm">
              <div className="pipeline-token font-mono text-lg text-[var(--color-text-primary)]">&quot;cat&quot;</div>
              <div className="text-xs text-[var(--color-accent)] mt-1">ID: 9246</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center gap-2 text-[var(--color-accent)]">
            <div className="h-px w-6 bg-[var(--color-accent)]/40" />
            <span className="text-xs font-bold whitespace-nowrap">LOOKUP</span>
            <div className="h-px w-6 bg-[var(--color-accent)]/40" />
          </div>

          {/* Embedding Table */}
          <div className="text-center">
            <div className="text-xs text-[var(--color-text-muted)] mb-2">Embedding Table</div>
            <div className="px-4 py-3 bg-white border-2 border-[var(--color-attention)]/40 rounded-lg shadow-sm">
              <div className="grid grid-cols-4 gap-1 text-xs font-mono">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className={`w-6 h-4 rounded ${i === 7 ? 'bg-[var(--color-attention)]/60' : 'bg-gray-200'}`} />
                ))}
              </div>
              <div className="text-xs text-[var(--color-attention)] mt-2">~100K rows</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center gap-2 text-[var(--color-accent)]">
            <div className="h-px w-6 bg-[var(--color-accent)]/40" />
            <span className="text-xs font-bold">=</span>
            <div className="h-px w-6 bg-[var(--color-accent)]/40" />
          </div>

          {/* Output Vector */}
          <div className="text-center">
            <div className="text-xs text-[var(--color-text-muted)] mb-2">Embedding Vector</div>
            <div className="px-4 py-3 bg-white border-2 border-emerald-400/40 rounded-lg shadow-sm">
              <div className="pipeline-token font-mono text-xs text-[var(--color-text-secondary)] space-y-0.5">
                <div>[0.23, -0.87, 0.42, ...</div>
                <div className="text-emerald-600">768 numbers</div>
                <div>..., 0.11, -0.56]</div>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle for full vector view */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowVectors(!showVectors)}
            className="text-xs px-3 py-1.5 rounded bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/20 transition-colors"
          >
            {showVectors ? "Hide Vector Details" : "Show Vector Details"}
          </button>
        </div>

        {showVectors && (
          <div className="mt-4 bg-gray-50 rounded-lg p-4 font-mono text-xs overflow-x-auto border border-gray-200">
            <div className="text-[var(--color-text-muted)] mb-2">// Simplified 8-dimensional embedding for &quot;cat&quot;:</div>
            <div className="pipeline-code text-[var(--color-text-primary)]">
              [ 0.234, -0.871, 0.423, 0.156, -0.342, 0.789, -0.234, 0.567 ]
            </div>
          </div>
        )}
      </div>

      {/* Semantic Space Visualization */}
      <div className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-[var(--color-text-primary)]">
            Semantic Space (2D Projection)
          </div>
          <div className="flex gap-3 text-xs">
            {Object.entries(CATEGORY_COLORS).map(([cat, colors]) => (
              <div key={cat} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.bg, border: `2px solid ${colors.border}` }}
                />
                <span className="text-[var(--color-text-muted)] capitalize">{cat}s</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2D scatter plot */}
        <div className="relative w-full h-64 bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {[20, 40, 60, 80].map(pos => (
              <g key={pos}>
                <line x1={`${pos}%`} y1="0" x2={`${pos}%`} y2="100%" stroke="rgb(229, 231, 235)" />
                <line x1="0" y1={`${pos}%`} x2="100%" y2={`${pos}%`} stroke="rgb(229, 231, 235)" />
              </g>
            ))}
          </svg>

          {/* Word points */}
          {SAMPLE_EMBEDDINGS.map((emb) => {
            const colors = CATEGORY_COLORS[emb.category];
            const isHovered = hoveredWord === emb.word;

            return (
              <div
                key={emb.word}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200"
                style={{
                  left: `${emb.x}%`,
                  top: `${emb.y}%`,
                  zIndex: isHovered ? 10 : 1,
                }}
                onMouseEnter={() => setHoveredWord(emb.word)}
                onMouseLeave={() => setHoveredWord(null)}
              >
                <div
                  className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    transition-all duration-200
                    ${isHovered ? 'scale-125 shadow-lg' : ''}
                  `}
                  style={{
                    backgroundColor: colors.bg,
                    border: `2px solid ${colors.border}`,
                    color: '#1A1A1A',
                    boxShadow: isHovered ? `0 0 15px ${colors.border}` : undefined,
                  }}
                >
                  {emb.word}
                </div>
              </div>
            );
          })}

          {/* Axis labels */}
          <div className="absolute bottom-2 right-2 text-xs text-[var(--color-text-muted)]">
            Dimension 1 / Dimension 2
          </div>
        </div>

        {/* Insight */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          <strong className="text-blue-900">Notice:</strong> Similar concepts cluster together.
          Animals group together, foods group together. The model learned these relationships during training
          on billions of words.
        </div>

        {/* Live Demo Link */}
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text-primary)]">Live Demo:</strong> Explore real embeddings in 3D
            </div>
            <div className="flex items-center gap-3">
              <span className="pipeline-token font-mono text-xs px-2 py-1 bg-white border border-gray-300 rounded text-[var(--color-text-primary)]">
                Try: &quot;monetary policy&quot;
              </span>
              <a
                href="https://huggingface.co/spaces/webml-community/semantic-galaxy"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[var(--color-accent)] text-white text-xs font-medium rounded hover:bg-[var(--color-tertiary)] transition-colors"
              >
                Open Semantic Galaxy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Embedding Dimensions */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-[var(--color-accent)]/20 rounded-xl p-5 text-center shadow-sm">
          <div className="text-2xl font-bold text-[var(--color-accent)] mb-1">768</div>
          <div className="text-sm text-[var(--color-text-muted)]">GPT-2 Dimensions</div>
        </div>
        <div className="bg-white border-2 border-[var(--color-attention)]/20 rounded-xl p-5 text-center shadow-sm">
          <div className="text-2xl font-bold text-[var(--color-attention)] mb-1">4,096</div>
          <div className="text-sm text-[var(--color-text-muted)]">GPT-3 Dimensions</div>
        </div>
        <div className="bg-white border-2 border-[var(--color-accent)]/20 rounded-xl p-5 text-center shadow-sm">
          <div className="text-2xl font-bold text-[var(--color-accent)] mb-1">12,288</div>
          <div className="text-sm text-[var(--color-text-muted)]">GPT-4 Dimensions</div>
        </div>
      </div>
    </div>
  );
}
