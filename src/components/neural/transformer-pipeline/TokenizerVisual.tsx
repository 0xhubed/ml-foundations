'use client';

import { useState } from 'react';

interface TokenExample {
  text: string;
  tokens: { text: string; id: number }[];
  description: string;
}

const EXAMPLES: TokenExample[] = [
  {
    text: "Hello, world!",
    tokens: [
      { text: "Hello", id: 9906 },
      { text: ",", id: 11 },
      { text: " world", id: 1917 },
      { text: "!", id: 0 },
    ],
    description: "Simple greeting: each word/punctuation becomes a token",
  },
  {
    text: "ChatGPT is amazing",
    tokens: [
      { text: "Chat", id: 16047 },
      { text: "G", id: 38 },
      { text: "PT", id: 2898 },
      { text: " is", id: 374 },
      { text: " amazing", id: 8056 },
    ],
    description: "Rare words get split: 'ChatGPT' becomes 3 tokens",
  },
  {
    text: "The quick brown fox",
    tokens: [
      { text: "The", id: 791 },
      { text: " quick", id: 4062 },
      { text: " brown", id: 14198 },
      { text: " fox", id: 39935 },
    ],
    description: "Common words stay whole: spaces attach to the following word",
  },
  {
    text: "cryptocurrency",
    tokens: [
      { text: "crypt", id: 34579 },
      { text: "oc", id: 511 },
      { text: "urrency", id: 10921 },
    ],
    description: "Long/rare words get split into subwords the model learned",
  },
];

export function TokenizerVisual() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [showIds, setShowIds] = useState(false);

  const example = EXAMPLES[selectedExample];

  return (
    <div className="space-y-6">
      {/* Concept Introduction */}
      <div className="bg-white border-2 border-[var(--color-border)] rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
          Step 1: Tokenization
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          LLMs don&apos;t read text character by character. They split text into <strong className="text-[var(--color-accent)]">tokens</strong> -
          meaningful chunks that balance vocabulary size with expressiveness. Common words stay whole;
          rare words get split into subwords.
        </p>

        {/* Key insight */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
          <strong className="text-amber-700">Why it matters:</strong>
          <span className="text-amber-800 ml-2">
            Tokens are the &quot;atoms&quot; of language models. Context window size, cost, and processing speed
            are all measured in tokens, not words or characters.
          </span>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] rounded-xl p-6">
        {/* Example Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-3">
            Try Different Examples:
          </label>
          <div className="grid grid-cols-2 gap-3">
            {EXAMPLES.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedExample(idx)}
                className={`px-4 py-3 rounded-lg text-left transition-all text-sm ${
                  selectedExample === idx
                    ? "bg-[var(--color-accent)]/10 border-2 border-[var(--color-accent)] shadow-[0_0_10px_rgba(15,76,129,0.15)]"
                    : "bg-white border-2 border-[var(--color-border)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5"
                }`}
              >
                <span className="pipeline-token font-mono text-[var(--color-text-primary)]">&quot;{ex.text}&quot;</span>
              </button>
            ))}
          </div>
        </div>

        {/* Visualization */}
        <div className="space-y-4">
          {/* Input */}
          <div>
            <div className="text-xs font-semibold text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">
              Input Text
            </div>
            <div className="pipeline-input font-mono bg-[var(--color-bg-secondary)] rounded-lg p-4 text-lg text-[var(--color-text-primary)] border-2 border-[var(--color-accent)]/30">
              &quot;{example.text}&quot;
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center py-2">
            <div className="flex items-center gap-3 text-[var(--color-accent)]">
              <div className="h-px w-10 bg-[var(--color-accent)]/40" />
              <span className="text-xs font-bold tracking-wider">TOKENIZE</span>
              <div className="h-px w-10 bg-[var(--color-accent)]/40" />
            </div>
          </div>

          {/* Output Tokens */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                Tokens ({example.tokens.length} total)
              </div>
              <button
                type="button"
                onClick={() => setShowIds(!showIds)}
                className="text-xs px-2 py-1 rounded bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/20 transition-colors"
              >
                {showIds ? "Hide IDs" : "Show Token IDs"}
              </button>
            </div>
            <div className="flex flex-wrap gap-4 pt-3">
              {example.tokens.map((token, idx) => (
                <div
                  key={idx}
                  className="relative"
                >
                  <div className="pipeline-token font-mono px-4 py-2.5 rounded-lg text-sm bg-white border-2 border-[var(--color-accent)]/40 text-[var(--color-text-primary)] transition-all hover:border-[var(--color-attention)] hover:shadow-[0_0_12px_rgba(217,119,6,0.2)]">
                    {/* Show spaces visually */}
                    {token.text.startsWith(' ') && (
                      <span className="text-[var(--color-attention)] mr-0.5">{'\u2423'}</span>
                    )}
                    <span className="font-medium">{token.text.trimStart()}</span>
                  </div>

                  {/* Token ID badge */}
                  {showIds && (
                    <div className="pipeline-token font-mono absolute -top-2.5 -right-2 px-1.5 py-0.5 bg-[var(--color-accent)] rounded text-xs text-white font-medium shadow-md">
                      {token.id}
                    </div>
                  )}

                  {/* Index badge */}
                  <div className="pipeline-token font-mono absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[var(--color-text-secondary)] rounded text-xs text-white shadow-md">
                    {idx}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mt-5 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-800">
            {example.description}
          </div>
        </div>
      </div>

      {/* Token Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border-2 border-[var(--color-accent)]/20 rounded-xl p-5 text-center shadow-sm">
          <div className="text-2xl font-bold text-[var(--color-accent)] mb-1">~100K</div>
          <div className="text-sm text-[var(--color-text-muted)]">Vocabulary Size (GPT-4)</div>
        </div>
        <div className="bg-white border-2 border-[var(--color-attention)]/20 rounded-xl p-5 text-center shadow-sm">
          <div className="text-2xl font-bold text-[var(--color-attention)] mb-1">~4 chars</div>
          <div className="text-sm text-[var(--color-text-muted)]">Avg. Token Length (English)</div>
        </div>
      </div>
    </div>
  );
}
