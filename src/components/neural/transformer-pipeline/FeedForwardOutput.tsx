'use client';

import { useState } from 'react';

export function FeedForwardOutput() {
  const [showPrediction, setShowPrediction] = useState(false);

  const topPredictions = [
    { token: "bed", probability: 0.42 },
    { token: "floor", probability: 0.18 },
    { token: "couch", probability: 0.12 },
    { token: "mat", probability: 0.08 },
    { token: "rug", probability: 0.06 },
  ];

  return (
    <div className="space-y-6">
      {/* Concept Introduction */}
      <div className="bg-white border-2 border-[var(--color-border)] rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
          Step 4: Feed-Forward + Output
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          After attention gathers context, each position passes through a <strong className="text-[var(--color-accent)]">feed-forward neural network</strong> that
          refines the information. Finally, the model predicts probabilities for the next token.
        </p>
      </div>

      {/* Simple Flow */}
      <div className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] rounded-xl p-6">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* Input: Contextualized tokens */}
          <div className="text-center">
            <div className="px-5 py-3 bg-amber-50 border-2 border-amber-400 rounded-xl text-sm font-medium text-amber-800 shadow-sm">
              Attention Output
            </div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">contextualized tokens</div>
          </div>

          <div className="text-[var(--color-accent)] text-2xl">&#x2192;</div>

          {/* Process: Feed-Forward */}
          <div className="text-center">
            <div className="px-5 py-3 bg-white border-2 border-[var(--color-accent)]/60 rounded-xl text-sm font-medium text-[var(--color-text-primary)] shadow-sm">
              Feed-Forward
            </div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">refine representations</div>
          </div>

          <div className="text-[var(--color-accent)] text-2xl">&#x2192;</div>

          {/* Output: Prediction */}
          <div className="text-center">
            <div className="px-5 py-3 bg-emerald-50 border-2 border-emerald-400 rounded-xl text-sm font-medium text-emerald-700 shadow-sm">
              Predict Next Token
            </div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">probability over vocabulary</div>
          </div>
        </div>
      </div>

      {/* Next Token Prediction Demo */}
      <div className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] rounded-xl p-6">
        <div className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
          Final Step: Predict Next Token
        </div>

        <div className="bg-white rounded-lg p-4 mb-4 border-2 border-gray-200">
          <div className="text-sm text-[var(--color-text-muted)] mb-3">Input sequence:</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {["The", "cat", "sat", "on", "the"].map((word, idx) => (
              <div
                key={idx}
                className="pipeline-token px-3 py-2 bg-gray-50 border-2 border-[var(--color-accent)]/40 rounded font-mono text-sm text-[var(--color-text-primary)]"
              >
                {word}
              </div>
            ))}
            <div className="pipeline-token px-3 py-2 bg-amber-50 border-2 border-amber-400 rounded font-mono text-sm text-amber-600 animate-pulse">
              ?
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPrediction(!showPrediction)}
            className="w-full px-4 py-2 bg-emerald-50 border-2 border-emerald-300 rounded-lg text-sm text-emerald-700 hover:bg-emerald-100 transition-colors font-medium"
          >
            {showPrediction ? "Hide Predictions" : "Show Model Predictions"}
          </button>
        </div>

        {showPrediction && (
          <div className="space-y-3">
            <div className="text-sm text-[var(--color-text-muted)] mb-2">
              Top predictions (softmax over ~100K vocabulary):
            </div>
            {topPredictions.map((pred, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-16 text-sm font-mono text-[var(--color-text-primary)] text-right">
                  &quot;{pred.token}&quot;
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden border border-gray-200">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    style={{ width: `${pred.probability * 100}%` }}
                  />
                </div>
                <div className="w-14 text-sm font-mono text-[var(--color-text-secondary)]">
                  {(pred.probability * 100).toFixed(1)}%
                </div>
              </div>
            ))}

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              <strong className="text-blue-700">Temperature:</strong> Controls randomness.
              Low temp = always pick &quot;bed&quot;. High temp = sometimes pick &quot;floor&quot; or &quot;couch&quot; for variety.
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white border-2 border-[var(--color-border)] rounded-xl p-5 shadow-sm">
        <div className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
          That&apos;s the Complete Pipeline
        </div>
        <div className="text-sm text-[var(--color-text-secondary)] space-y-1.5">
          <div>1. <strong className="text-[var(--color-accent)]">Tokenize:</strong> Text to token IDs</div>
          <div>2. <strong className="text-blue-500">Embed:</strong> Token IDs to vectors</div>
          <div>3. <strong className="text-amber-600">Attend:</strong> Each token gathers context from all others</div>
          <div>4. <strong className="text-emerald-600">Process:</strong> Feed-forward refines the representation</div>
          <div>5. <strong className="text-[var(--color-accent)]">Predict:</strong> Output probability distribution over vocabulary</div>
        </div>
      </div>
    </div>
  );
}
