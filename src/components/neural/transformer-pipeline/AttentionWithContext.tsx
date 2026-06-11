'use client';

import { useState } from 'react';

type ViewMode = 'attention' | 'context-window';

const ATTENTION_EXAMPLE = {
  words: ["The", "cat", "sat", "on", "the", "bed"],
  attentionFrom: 2,
  scores: [0.05, 0.45, 0.15, 0.08, 0.02, 0.25],
};

const CONTEXT_WINDOW_MODELS = [
  { model: 'GPT-2 (2019)', tokens: 1024, pages: 2, color: '#6B8CAE' },
  { model: 'GPT-4o (2024)', tokens: 128000, pages: 256, color: '#10B981' },
  { model: 'Claude Sonnet 4 (2025)', tokens: 200000, pages: 400, color: '#9333EA' },
  { model: 'Gemini 2.5 Pro (2025)', tokens: 1000000, pages: 2000, color: '#3B82F6' },
];

export function AttentionWithContext() {
  const [viewMode, setViewMode] = useState<ViewMode>('attention');
  const [selectedWord, setSelectedWord] = useState(2);
  const [animateAttention, setAnimateAttention] = useState(false);

  const getAttentionScores = (fromIdx: number): number[] => {
    const base = ATTENTION_EXAMPLE.words.map((_, toIdx) => {
      if (fromIdx === toIdx) return 0.15;
      const distance = Math.abs(fromIdx - toIdx);
      return Math.max(0.05, 0.5 - distance * 0.1);
    });
    const sum = base.reduce((a, b) => a + b, 0);
    return base.map(v => v / sum);
  };

  const scores = getAttentionScores(selectedWord);

  return (
    <div className="space-y-6">
      {/* Concept Introduction */}
      <div className="bg-white border-2 border-[var(--color-border)] rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
          Step 3: Attention Mechanism
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          The <strong className="text-[var(--color-accent)]">attention mechanism</strong> lets each token
          look at every other token in the sequence and decide which ones are relevant.
          This is the breakthrough that made transformers possible.
        </p>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setViewMode('attention')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'attention'
                ? "bg-amber-50 border-2 border-amber-400 text-amber-700"
                : "bg-gray-50 border-2 border-gray-200 text-[var(--color-text-secondary)] hover:border-amber-300"
            }`}
          >
            How Attention Works
          </button>
          <button
            type="button"
            onClick={() => setViewMode('context-window')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'context-window'
                ? "bg-blue-50 border-2 border-blue-400 text-blue-700"
                : "bg-gray-50 border-2 border-gray-200 text-[var(--color-text-secondary)] hover:border-blue-300"
            }`}
          >
            Context Window Limits
          </button>
        </div>
      </div>

      {/* Attention View */}
      {viewMode === 'attention' && (
        <div className="space-y-6">
          {/* Interactive Attention Demo */}
          <div className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] rounded-xl p-6">
            <div className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
              Click a word to see what it attends to:
            </div>

            {/* Word Selection */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {ATTENTION_EXAMPLE.words.map((word, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedWord(idx);
                    setAnimateAttention(true);
                    setTimeout(() => setAnimateAttention(false), 500);
                  }}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all
                    ${selectedWord === idx
                      ? "bg-amber-400 text-white shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                      : "bg-white border-2 border-[var(--color-accent)]/40 text-[var(--color-text-primary)] hover:border-amber-400"
                    }
                  `}
                >
                  {word}
                </button>
              ))}
            </div>

            {/* Attention Visualization */}
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <div className="text-sm text-[var(--color-text-muted)] mb-4 text-center">
                &quot;{ATTENTION_EXAMPLE.words[selectedWord]}&quot; attends to:
              </div>

              <div className="space-y-3">
                {ATTENTION_EXAMPLE.words.map((word, idx) => {
                  const score = scores[idx];
                  const isSelected = idx === selectedWord;

                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-16 text-sm text-right ${isSelected ? 'text-amber-600 font-semibold' : 'text-[var(--color-text-secondary)]'}`}>
                        {word}
                      </div>
                      <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden border border-gray-200">
                        <div
                          className={`h-full transition-all duration-500 ${animateAttention ? 'w-0' : ''}`}
                          style={{
                            width: `${score * 100}%`,
                            background: isSelected
                              ? 'linear-gradient(to right, rgb(251, 191, 36), rgb(245, 158, 11))'
                              : `linear-gradient(to right, rgb(59, 130, 246), rgb(96, 165, 250))`,
                            opacity: isSelected ? 1 : 0.4 + score,
                          }}
                        />
                      </div>
                      <div className="w-12 text-sm font-mono text-[var(--color-text-primary)]">
                        {(score * 100).toFixed(0)}%
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 text-xs text-[var(--color-text-muted)] text-center">
                Attention scores sum to 100% (softmax normalization)
              </div>
            </div>
          </div>

          {/* Key Insight */}
          <div className="bg-white border-l-4 border-l-blue-500 border-2 border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-sm font-semibold text-blue-600 mb-2">
              Parallel Processing
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Unlike RNNs that process words one-by-one, attention computes ALL word relationships
              simultaneously. This is why transformers train so fast on GPUs.
            </p>
          </div>
        </div>
      )}

      {/* Context Window View */}
      {viewMode === 'context-window' && (
        <div className="space-y-6">
          {/* The Constraint Explanation */}
          <div className="bg-white border-l-4 border-l-blue-500 border-2 border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-sm font-semibold text-blue-600 mb-3">
              The Critical Constraint: Fixed Context Window
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Attention lets every token look at every other token, but this creates O(n^2) complexity.
              The <strong className="text-[var(--color-text-primary)]">context window</strong> is the maximum
              number of tokens the model can see at once, a hard limit set during training.
            </p>

            {/* Visual Representation */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                {/* Lost tokens */}
                <div className="flex gap-2">
                  {["...", "lost", "tokens"].map((t, i) => (
                    <div key={i} className="pipeline-token px-3 py-2 bg-red-50 border-2 border-red-300 rounded-lg text-sm font-mono text-red-500 line-through">
                      {t}
                    </div>
                  ))}
                </div>

                <span className="text-red-400 text-2xl mx-3">|</span>

                {/* Context window */}
                <div className="relative px-6 py-4 border-3 border-blue-400 rounded-xl bg-blue-50 shadow-sm" style={{ borderWidth: '3px' }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 rounded-full text-sm text-white whitespace-nowrap font-semibold shadow-sm">
                    Context Window
                  </div>
                  <div className="flex gap-2 mt-1">
                    {["The", "cat", "sat", "on", "the", "bed"].map((t, i) => (
                      <div key={i} className="pipeline-token px-3 py-2 bg-white border-2 border-blue-300 rounded-lg text-sm font-mono text-[var(--color-text-primary)] font-medium">
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                <span className="text-gray-400 text-2xl mx-3">|</span>

                {/* Future tokens */}
                <div className="flex gap-2">
                  {["future", "..."].map((t, i) => (
                    <div key={i} className="pipeline-token px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-lg text-sm font-mono text-gray-400">
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm text-center text-[var(--color-text-muted)] font-medium">
                Model can ONLY see tokens inside the window. Earlier context is permanently lost.
              </div>
            </div>
          </div>

          {/* Model Comparison */}
          <div className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] rounded-xl p-6">
            <div className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
              Context Window Evolution (2019-2025)
            </div>

            <div className="space-y-4">
              {CONTEXT_WINDOW_MODELS.map((model) => {
                const maxTokens = 1000000;
                const percentage = (model.tokens / maxTokens) * 100;

                return (
                  <div key={model.model}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-[var(--color-text-secondary)]">{model.model}</span>
                      <div className="text-right">
                        <span className="text-sm font-mono text-[var(--color-text-primary)]">
                          {model.tokens >= 1000000
                            ? `${(model.tokens / 1000000).toFixed(0)}M`
                            : model.tokens >= 1000
                              ? `${(model.tokens / 1000).toFixed(0)}K`
                              : model.tokens} tokens
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)] ml-2">
                          (~{model.pages} pages)
                        </span>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(percentage, 1)}%`,
                          backgroundColor: model.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Why it matters */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="text-sm font-semibold text-amber-700 mb-2">
                Why This Matters for AI Agents
              </div>
              <p className="text-sm text-amber-800">
                Agents need to remember conversation history, tool outputs, and task state.
                With a 200K token window, that&apos;s ~400 pages of context, but for long-running
                tasks, even that fills up. This is why <strong className="text-amber-900">memory systems</strong> and
                <strong className="text-amber-900"> context engineering</strong> are essential.
              </p>
            </div>
          </div>

          {/* O(n^2) explanation */}
          <div className="bg-white border-l-4 border-l-red-500 border-2 border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-sm font-semibold text-red-600 mb-2">
              The Computational Cost
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Attention is O(n^2) in sequence length. Doubling context from 100K to 200K tokens
              means 4x the compute for attention. This is why context windows have hard limits -
              even with optimizations, infinite context is computationally intractable.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
