"use client";

import { useState, useMemo } from "react";
import { FullScreenCard } from "@/components/ui/FullScreenCard";

export function PositionalEncodingVisualizer() {
  const [showEncoding, setShowEncoding] = useState(false);

  const sentence1 = ["dog", "bites", "man"];
  const sentence2 = ["man", "bites", "dog"];

  // Simulate positional encoding with colors (simplified visual representation)
  const getPositionColor = (position: number) => {
    const hue = (position * 60) % 360; // Different hue for each position
    return `hsl(${hue}, 70%, 50%)`;
  };

  const getPositionPattern = (position: number) => {
    // Create a unique pattern for each position using sine/cosine waves
    const patterns = [
      "▂▄▆█▆▄▂",
      "█▆▄▂▄▆█",
      "▄█▆▂▆█▄",
      "▆▂▄█▄▂▆",
    ];
    return patterns[position % patterns.length];
  };

  return (
    <FullScreenCard className="glass-panel p-6" title="Positional Encoding: Remembering Word Order">
      <div className="mb-6 bg-[rgba(255,200,87,0.08)] border border-[rgba(255,200,87,0.3)] rounded-lg p-4">
        <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-2">
          The Problem: Parallel Processing Loses Order
        </h4>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          If transformers process all words simultaneously, how do they know "dog bites man" is different from "man bites dog"?
          Word order completely changes meaning!
        </p>
      </div>

      {/* Example showing the problem */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
          These two sentences mean VERY different things:
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-4">
            <div className="text-center mb-2 text-sm text-[color:var(--color-text-secondary)]">
              Sentence 1
            </div>
            <div className="flex justify-center gap-2">
              {sentence1.map((word, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-[rgba(107,140,174,0.2)] border border-[rgba(107,140,174,0.5)] rounded-lg font-semibold"
                >
                  {word}
                </div>
              ))}
            </div>
            <div className="text-center mt-3 text-sm text-[color:var(--color-text-secondary)]">
              (Dog is the aggressor)
            </div>
          </div>

          <div className="bg-[rgba(91,156,245,0.08)] border border-[rgba(91,156,245,0.3)] rounded-lg p-4">
            <div className="text-center mb-2 text-sm text-[color:var(--color-text-secondary)]">
              Sentence 2
            </div>
            <div className="flex justify-center gap-2">
              {sentence2.map((word, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-[rgba(91,156,245,0.2)] border border-[rgba(91,156,245,0.5)] rounded-lg font-semibold"
                >
                  {word}
                </div>
              ))}
            </div>
            <div className="text-center mt-3 text-sm text-[color:var(--color-text-secondary)]">
              (Man is the aggressor)
            </div>
          </div>
        </div>
      </div>

      {/* Toggle to show positional encoding */}
      <div className="mb-6">
        <button
          onClick={() => setShowEncoding(!showEncoding)}
          className="w-full px-6 py-3 bg-[rgba(34,197,94,0.2)] border border-[rgba(34,197,94,0.6)] rounded-lg font-medium hover:bg-[rgba(34,197,94,0.3)] transition-colors"
        >
          {showEncoding ? "Hide" : "Show"} Positional Encoding
        </button>
      </div>

      {/* Visualization with positional encoding */}
      {showEncoding && (
        <div className="mb-6 space-y-6">
          <div className="bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.3)] rounded-lg p-6">
            <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-4 text-center">
              Solution: Add Position Information to Each Word
            </h4>

            <div className="space-y-6">
              {/* Sentence 1 with positions */}
              <div>
                <div className="text-center mb-3 text-sm text-[color:var(--color-text-secondary)]">
                  "dog bites man" with position fingerprints
                </div>
                <div className="flex justify-center gap-3">
                  {sentence1.map((word, idx) => (
                    <div key={idx} className="text-center">
                      <div
                        className="px-4 py-3 rounded-lg font-semibold border-2 mb-2"
                        style={{
                          backgroundColor: `${getPositionColor(idx)}22`,
                          borderColor: getPositionColor(idx),
                        }}
                      >
                        {word}
                      </div>
                      <div className="text-xs text-[color:var(--color-text-secondary)] mb-1">
                        Position {idx}
                      </div>
                      <div
                        className="font-mono text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: `${getPositionColor(idx)}33`,
                          color: getPositionColor(idx),
                        }}
                      >
                        {getPositionPattern(idx)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sentence 2 with positions */}
              <div>
                <div className="text-center mb-3 text-sm text-[color:var(--color-text-secondary)]">
                  "man bites dog" with position fingerprints
                </div>
                <div className="flex justify-center gap-3">
                  {sentence2.map((word, idx) => (
                    <div key={idx} className="text-center">
                      <div
                        className="px-4 py-3 rounded-lg font-semibold border-2 mb-2"
                        style={{
                          backgroundColor: `${getPositionColor(idx)}22`,
                          borderColor: getPositionColor(idx),
                        }}
                      >
                        {word}
                      </div>
                      <div className="text-xs text-[color:var(--color-text-secondary)] mb-1">
                        Position {idx}
                      </div>
                      <div
                        className="font-mono text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: `${getPositionColor(idx)}33`,
                          color: getPositionColor(idx),
                        }}
                      >
                        {getPositionPattern(idx)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-[color:var(--color-text-secondary)]">
              Even though "dog" and "man" appear in both sentences, they have different position encodings,
              so the model knows they're in different places!
            </div>
          </div>
        </div>
      )}

      {/* How it works */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-4">
          <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-2">
            Word Embedding
          </h4>
          <p className="text-xs text-[color:var(--color-text-secondary)]">
            Converts words to vectors (numbers) that capture meaning.
            "dog" and "cat" have similar embeddings because they're both animals.
          </p>
        </div>

        <div className="bg-[rgba(255,200,87,0.08)] border border-[rgba(255,200,87,0.3)] rounded-lg p-4">
          <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-2">
            Positional Encoding
          </h4>
          <p className="text-xs text-[color:var(--color-text-secondary)]">
            Adds position information using sine/cosine waves at different frequencies.
            Each position gets a unique mathematical fingerprint.
          </p>
        </div>
      </div>

      {/* The formula (simplified) */}
      <div className="bg-[rgba(125,163,198,0.08)] border border-[rgba(125,163,198,0.3)] rounded-lg p-4">
        <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-2">
          The Math (Simplified)
        </h4>
        <div className="text-xs text-[color:var(--color-text-secondary)] space-y-2">
          <p>
            For each position, the model adds a unique pattern of sine and cosine waves:
          </p>
          <div className="bg-[rgba(0,0,0,0.3)] rounded p-3 font-mono text-[rgba(125,163,198,1)]">
            PE(pos) = [sin(pos/10000^0), cos(pos/10000^0), sin(pos/10000^1), ...]
          </div>
          <p className="mt-2">
            This creates a unique "fingerprint" for each position that the model can learn to use.
            Position 0 has a different pattern than position 1, position 2, etc.
          </p>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.3)] rounded-lg p-4">
        <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-2">
          Why This Matters
        </h4>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          Positional encoding lets transformers process everything in parallel (fast!) while still knowing word order (accurate!).
          Best of both worlds: <strong>speed AND understanding of sequence</strong>.
        </p>
      </div>
    </FullScreenCard>
  );
}
