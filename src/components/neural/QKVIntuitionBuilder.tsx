"use client";

import { useState } from "react";

type Step = "database" | "language" | "math";

const STEPS = [
  { id: "database" as Step, label: "1. Database Analogy", color: "rgba(107,140,174,1)" },
  { id: "language" as Step, label: "2. Apply to Language", color: "#0F4C81" },
  { id: "math" as Step, label: "3. The Mechanism", color: "#B45309" },
];

export function QKVIntuitionBuilder() {
  const [currentStep, setCurrentStep] = useState<Step>("database");

  return (
    <div className="glass-panel p-8">
      <h3
        className="text-2xl font-bold text-[color:var(--color-text-primary)] mb-4"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Understanding Query, Key, Value (Q, K, V)
      </h3>
      <p className="text-[color:var(--color-text-secondary)] mb-6">
        The attention mechanism uses three concepts: Query, Key, and Value. Let's build intuition
        step by step using concrete examples with real data.
      </p>

      {/* Step Navigation */}
      <div className="mb-8 flex gap-4">
        {STEPS.map((step) => (
          <button
            key={step.id}
            type="button"
            onClick={() => setCurrentStep(step.id)}
            className={`flex-1 px-4 py-3 rounded-lg transition-all ${
              currentStep === step.id
                ? "bg-[rgba(107,140,174,0.2)] border-2 border-[rgba(107,140,174,1)]"
                : "bg-[#F1F5F9] border border-[rgba(0,0,0,0.12)] hover:border-[color:var(--color-accent)]"
            }`}
          >
            <div className="text-sm font-semibold" style={{ color: step.color }}>
              {step.label}
            </div>
          </button>
        ))}
      </div>

      {/* Step 1: Database Analogy */}
      {currentStep === "database" && (
        <div className="space-y-6">
          <div className="bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg p-6">
            <h4 className="text-lg font-semibold text-[color:var(--color-text-primary)] mb-4">
              Think of a Database Search
            </h4>
            <p className="text-sm text-[color:var(--color-text-secondary)] mb-4">
              Imagine you have a database of documents and want to find relevant ones. Here's how it works:
            </p>

            {/* Search Example */}
            <div className="space-y-4">
              {/* Query */}
              <div className="bg-[#F1F5F9] rounded-lg p-4">
                <div className="text-xs font-semibold text-[#B45309] mb-2">
                  YOUR QUERY (what you're looking for)
                </div>
                <div className="text-sm text-[color:var(--color-text-primary)] font-mono">
                  "Find me documents about hungry animals"
                </div>
              </div>

              {/* Database with Keys and Values */}
              <div className="bg-[#F1F5F9] rounded-lg p-4">
                <div className="text-xs font-semibold text-[#0F4C81] mb-3">
                  DATABASE ENTRIES
                </div>
                <div className="space-y-3">
                  {[
                    {
                      key: "about cats and sleep",
                      value: "Cats sleep 16 hours a day and are very lazy animals.",
                      score: 0.1,
                    },
                    {
                      key: "about dogs and food",
                      value: "Dogs get hungry every 8 hours and need regular meals.",
                      score: 0.7,
                    },
                    {
                      key: "about weather patterns",
                      value: "Rain occurs when atmospheric moisture condenses.",
                      score: 0.05,
                    },
                    {
                      key: "about cats and hunger",
                      value: "When cats are hungry, they meow loudly for attention.",
                      score: 0.15,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="border border-[rgba(0,0,0,0.1)] rounded-lg p-3"
                      style={{
                        backgroundColor: `rgba(107,140,174,${item.score * 0.3})`,
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-xs font-semibold text-[#0F4C81]">
                          Key {idx + 1}: "{item.key}"
                        </div>
                        <div className="text-xs font-mono text-[#B45309]">
                          match: {item.score}
                        </div>
                      </div>
                      <div className="text-sm text-[color:var(--color-text-secondary)]">
                        Value: {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div className="bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] rounded-lg p-4">
                <div className="text-xs font-semibold text-[#059669] mb-2">
                  SEARCH RESULT (weighted combination)
                </div>
                <div className="text-sm text-[color:var(--color-text-primary)] mb-2">
                  Entry 2 (70%) + Entry 4 (15%) + Entry 1 (10%) + Entry 3 (5%)
                </div>
                <div className="text-sm text-[color:var(--color-text-secondary)]">
                  The search returns mostly "Dogs get hungry..." because it best matches your query,
                  with small contributions from other entries.
                </div>
              </div>
            </div>

            {/* Key Insight */}
            <div className="mt-4 bg-[rgba(255,200,87,0.1)] border border-[rgba(255,200,87,0.3)] rounded-lg p-4">
              <div className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-2">
                Key Insight
              </div>
              <ul className="text-xs text-[color:var(--color-text-secondary)] space-y-1">
                <li><strong>Query:</strong> What you're searching for</li>
                <li><strong>Keys:</strong> Descriptions of what each entry contains</li>
                <li><strong>Values:</strong> The actual content</li>
                <li><strong>Matching:</strong> Compare query to keys, get relevance scores</li>
                <li><strong>Result:</strong> Weighted combination of values based on scores</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Apply to Language */}
      {currentStep === "language" && (
        <div className="space-y-6">
          <div className="bg-[rgba(125,163,198,0.08)] border border-[rgba(125,163,198,0.3)] rounded-lg p-6">
            <h4 className="text-lg font-semibold text-[color:var(--color-text-primary)] mb-4">
              Now Apply This to Language Understanding
            </h4>
            <p className="text-sm text-[color:var(--color-text-secondary)] mb-4">
              When processing a word, we want to find which OTHER words are relevant. Same concept!
            </p>

            {/* Sentence */}
            <div className="mb-4 bg-[#F1F5F9] rounded-lg p-4">
              <div className="text-xs font-semibold text-[color:var(--color-text-secondary)] mb-2">
                SENTENCE
              </div>
              <div className="flex gap-2 flex-wrap">
                {["The", "dog", "chased", "the", "cat", "because", "it", "was", "hungry"].map((word, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-2 rounded-lg text-sm font-mono ${
                      idx === 6
                        ? "bg-[rgba(255,200,87,0.3)] border-2 border-[rgba(255,200,87,1)] text-[color:var(--color-text-primary)]"
                        : "bg-[rgba(107,140,174,0.1)] border border-[rgba(107,140,174,0.3)] text-[color:var(--color-text-secondary)]"
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Processing "it" */}
            <div className="space-y-4">
              {/* Query */}
              <div className="bg-[#F1F5F9] rounded-lg p-4">
                <div className="text-xs font-semibold text-[#B45309] mb-2">
                  QUERY: Word "it" asks...
                </div>
                <div className="text-sm text-[color:var(--color-text-primary)]">
                  "What am I referring to? I need context from other words."
                </div>
                <div className="text-xs text-[color:var(--color-text-secondary)] mt-2 font-mono">
                  Query vector: [0.2, 0.8, -0.3, 0.5] (learned representation)
                </div>
              </div>

              {/* Keys from other words */}
              <div className="bg-[#F1F5F9] rounded-lg p-4">
                <div className="text-xs font-semibold text-[#0F4C81] mb-3">
                  KEYS: What each word offers
                </div>
                <div className="space-y-2">
                  {[
                    { word: "The", key: "[0.1, 0.1, 0.0, 0.2]", score: 0.05, desc: "article, low info" },
                    { word: "dog", key: "[0.3, 0.9, -0.2, 0.6]", score: 0.65, desc: "animal subject!" },
                    { word: "chased", key: "[-0.1, 0.4, 0.7, 0.2]", score: 0.15, desc: "action" },
                    { word: "cat", key: "[0.2, 0.7, -0.1, 0.4]", score: 0.10, desc: "animal object" },
                    { word: "because", key: "[0.0, 0.2, 0.1, 0.3]", score: 0.02, desc: "conjunction" },
                    { word: "hungry", key: "[0.1, 0.5, 0.2, 0.8]", score: 0.03, desc: "state" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded border border-[rgba(0,0,0,0.1)]"
                      style={{
                        backgroundColor: `rgba(125,163,198,${item.score * 0.5})`,
                      }}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-sm font-mono text-[color:var(--color-text-primary)] w-16">
                          {item.word}
                        </span>
                        <span className="text-xs font-mono text-[color:var(--color-text-secondary)]">
                          {item.key}
                        </span>
                        <span className="text-xs text-[color:var(--color-text-secondary)] italic">
                          {item.desc}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#B45309]">
                        {item.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Values */}
              <div className="bg-[#F1F5F9] rounded-lg p-4">
                <div className="text-xs font-semibold text-[rgba(107,140,174,1)] mb-3">
                  VALUES: Each word's representation
                </div>
                <div className="space-y-2">
                  {[
                    { word: "dog", value: "[0.5, 0.9, -0.4, 0.7, 0.3]", weight: 0.65 },
                    { word: "chased", value: "[-0.2, 0.5, 0.8, 0.3, 0.1]", weight: 0.15 },
                    { word: "cat", value: "[0.3, 0.7, -0.2, 0.5, 0.2]", weight: 0.10 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-[rgba(107,140,174,0.05)]">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-[color:var(--color-text-primary)] w-16">
                          {item.word}
                        </span>
                        <span className="text-xs font-mono text-[color:var(--color-text-secondary)]">
                          {item.value}
                        </span>
                      </div>
                      <span className="text-xs text-[#B45309]">
                        × {item.weight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div className="bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] rounded-lg p-4">
                <div className="text-xs font-semibold text-[#059669] mb-2">
                  OUTPUT: New representation for "it"
                </div>
                <div className="text-sm text-[color:var(--color-text-primary)] font-mono mb-2">
                  65% of "dog" + 15% of "chased" + 10% of "cat" + ...
                </div>
                <div className="text-sm text-[color:var(--color-text-secondary)]">
                  The word "it" now contains strong information about "dog" (65%), so the model
                  learns that "it" refers to the dog, not the cat!
                </div>
              </div>
            </div>

            {/* Key Insight */}
            <div className="mt-4 bg-[rgba(255,200,87,0.1)] border border-[rgba(255,200,87,0.3)] rounded-lg p-4">
              <div className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-2">
                Key Insight for Language
              </div>
              <ul className="text-xs text-[color:var(--color-text-secondary)] space-y-1">
                <li><strong>Query:</strong> Current word asking "what context do I need?"</li>
                <li><strong>Keys:</strong> What context each other word can provide</li>
                <li><strong>Values:</strong> The actual information from each word</li>
                <li><strong>Attention weights:</strong> How much to focus on each word (0.65 for "dog")</li>
                <li><strong>Output:</strong> Updated representation with gathered context</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: The Math */}
      {currentStep === "math" && (
        <div className="space-y-6">
          <div className="bg-[rgba(255,200,87,0.08)] border border-[rgba(255,200,87,0.3)] rounded-lg p-6">
            <h4 className="text-lg font-semibold text-[color:var(--color-text-primary)] mb-4">
              The Attention Mechanism (Step by Step)
            </h4>
            <p className="text-sm text-[color:var(--color-text-secondary)] mb-6">
              Now let's see the actual computation with real numbers for our example.
            </p>

            {/* Step-by-step computation */}
            <div className="space-y-6">
              {/* Step 1: Compute similarities */}
              <div className="bg-[#F1F5F9] rounded-lg p-4">
                <div className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
                  Step 1: Compute Similarities (Q · K^T)
                </div>
                <p className="text-xs text-[color:var(--color-text-secondary)] mb-3">
                  Dot product between query and each key measures similarity:
                </p>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center p-2 bg-[rgba(255,255,255,0.03)] rounded">
                    <span className="text-[color:var(--color-text-secondary)]">
                      "it" · "The" = [0.2, 0.8, -0.3, 0.5] · [0.1, 0.1, 0.0, 0.2]
                    </span>
                    <span className="text-[#B45309]">= 0.20</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[rgba(125,163,198,0.1)] rounded border border-[rgba(125,163,198,0.5)]">
                    <span className="text-[color:var(--color-text-primary)]">
                      "it" · "dog" = [0.2, 0.8, -0.3, 0.5] · [0.3, 0.9, -0.2, 0.6]
                    </span>
                    <span className="text-[#B45309] font-bold">= 1.19</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[rgba(255,255,255,0.03)] rounded">
                    <span className="text-[color:var(--color-text-secondary)]">
                      "it" · "chased" = [0.2, 0.8, -0.3, 0.5] · [-0.1, 0.4, 0.7, 0.2]
                    </span>
                    <span className="text-[#B45309]">= 0.09</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[rgba(255,255,255,0.03)] rounded">
                    <span className="text-[color:var(--color-text-secondary)]">
                      "it" · "cat" = [0.2, 0.8, -0.3, 0.5] · [0.2, 0.7, -0.1, 0.4]
                    </span>
                    <span className="text-[#B45309]">= 0.83</span>
                  </div>
                </div>
                <p className="text-xs text-[color:var(--color-text-secondary)] mt-3">
                  Higher score = more similar. "dog" has highest similarity!
                </p>
              </div>

              {/* Step 2: Scale */}
              <div className="bg-[#F1F5F9] rounded-lg p-4">
                <div className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
                  Step 2: Scale (÷ √d_k)
                </div>
                <p className="text-xs text-[color:var(--color-text-secondary)] mb-3">
                  Divide by √4 = 2 to prevent values from getting too large:
                </p>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center p-2 bg-[rgba(255,255,255,0.03)] rounded">
                    <span className="text-[color:var(--color-text-secondary)]">0.20 ÷ 2</span>
                    <span className="text-[#B45309]">= 0.10</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[rgba(125,163,198,0.1)] rounded border border-[rgba(125,163,198,0.5)]">
                    <span className="text-[color:var(--color-text-primary)]">1.19 ÷ 2</span>
                    <span className="text-[#B45309] font-bold">= 0.60</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[rgba(255,255,255,0.03)] rounded">
                    <span className="text-[color:var(--color-text-secondary)]">0.09 ÷ 2</span>
                    <span className="text-[#B45309]">= 0.05</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[rgba(255,255,255,0.03)] rounded">
                    <span className="text-[color:var(--color-text-secondary)]">0.83 ÷ 2</span>
                    <span className="text-[#B45309]">= 0.42</span>
                  </div>
                </div>
                <p className="text-xs text-[color:var(--color-text-secondary)] mt-3">
                  Why scale? Prevents softmax saturation (all weights → 1.0 or 0.0)
                </p>
              </div>

              {/* Step 3: Softmax */}
              <div className="bg-[#F1F5F9] rounded-lg p-4">
                <div className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
                  Step 3: Softmax (Convert to Probabilities)
                </div>
                <p className="text-xs text-[color:var(--color-text-secondary)] mb-3">
                  Apply softmax: exp(x) / Σexp(x) to get attention weights that sum to 1.0:
                </p>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center p-2 bg-[rgba(255,255,255,0.03)] rounded">
                    <span className="text-[color:var(--color-text-secondary)]">softmax(0.10)</span>
                    <span className="text-[#B45309]">= 0.05</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[rgba(125,163,198,0.2)] rounded border-2 border-[rgba(125,163,198,1)]">
                    <span className="text-[color:var(--color-text-primary)]">softmax(0.60)</span>
                    <span className="text-[#B45309] font-bold">= 0.65</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[rgba(255,255,255,0.03)] rounded">
                    <span className="text-[color:var(--color-text-secondary)]">softmax(0.05)</span>
                    <span className="text-[#B45309]">= 0.03</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[rgba(255,255,255,0.03)] rounded">
                    <span className="text-[color:var(--color-text-secondary)]">softmax(0.42)</span>
                    <span className="text-[#B45309]">= 0.27</span>
                  </div>
                  <div className="mt-2 p-2 bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] rounded">
                    <span className="text-[color:var(--color-text-secondary)]">Total:</span>
                    <span className="text-[#059669] ml-2">0.05 + 0.65 + 0.03 + 0.27 = 1.00 ✓</span>
                  </div>
                </div>
                <p className="text-xs text-[color:var(--color-text-secondary)] mt-3">
                  These are the <strong>attention weights</strong>! "dog" gets 65% of the focus.
                </p>
              </div>

              {/* Step 4: Weighted sum */}
              <div className="bg-[#F1F5F9] rounded-lg p-4">
                <div className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
                  Step 4: Weighted Sum of Values
                </div>
                <p className="text-xs text-[color:var(--color-text-secondary)] mb-3">
                  Multiply each value by its attention weight and sum:
                </p>
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2 bg-[rgba(255,255,255,0.03)] rounded">
                    <div className="text-[color:var(--color-text-secondary)]">
                      0.05 × [0.5, 0.9, -0.4, 0.7, 0.3] = [0.03, 0.05, -0.02, 0.04, 0.02]
                    </div>
                  </div>
                  <div className="p-2 bg-[rgba(125,163,198,0.1)] border border-[rgba(125,163,198,0.5)] rounded">
                    <div className="text-[color:var(--color-text-primary)]">
                      0.65 × [0.5, 0.9, -0.4, 0.7, 0.3] = [0.33, 0.59, -0.26, 0.46, 0.20]
                    </div>
                  </div>
                  <div className="p-2 bg-[rgba(255,255,255,0.03)] rounded">
                    <div className="text-[color:var(--color-text-secondary)]">
                      0.03 × [-0.2, 0.5, 0.8, 0.3, 0.1] = [-0.01, 0.02, 0.02, 0.01, 0.00]
                    </div>
                  </div>
                  <div className="p-2 bg-[rgba(255,255,255,0.03)] rounded">
                    <div className="text-[color:var(--color-text-secondary)]">
                      0.27 × [0.3, 0.7, -0.2, 0.5, 0.2] = [0.08, 0.19, -0.05, 0.14, 0.05]
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-[rgba(34,197,94,0.15)] border-2 border-[rgba(34,197,94,1)] rounded">
                    <div className="text-[#059669] font-bold">
                      OUTPUT = [0.43, 0.85, -0.31, 0.65, 0.27]
                    </div>
                    <div className="text-xs text-[color:var(--color-text-secondary)] mt-2">
                      This new vector for "it" contains 65% of "dog"'s information!
                    </div>
                  </div>
                </div>
              </div>

              {/* The complete formula */}
              <div className="bg-[rgba(125,163,198,0.08)] border border-[rgba(125,163,198,0.3)] rounded-lg p-4">
                <div className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
                  The Complete Formula
                </div>
                <div className="bg-[#F1F5F9] rounded-lg p-4 font-mono text-sm text-[color:var(--color-text-primary)] text-center">
                  Attention(Q, K, V) = softmax(Q·K^T / √d_k) × V
                </div>
                <div className="mt-4 space-y-2 text-xs text-[color:var(--color-text-secondary)]">
                  <div className="flex justify-between items-center">
                    <span>Q·K^T</span>
                    <span className="text-[color:var(--color-text-primary)]">Compute similarities</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>÷ √d_k</span>
                    <span className="text-[color:var(--color-text-primary)]">Scale to prevent saturation</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>softmax(...)</span>
                    <span className="text-[color:var(--color-text-primary)]">Convert to probabilities</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>× V</span>
                    <span className="text-[color:var(--color-text-primary)]">Weighted sum of values</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <button
          type="button"
          onClick={() => {
            const currentIdx = STEPS.findIndex(s => s.id === currentStep);
            if (currentIdx > 0) setCurrentStep(STEPS[currentIdx - 1].id);
          }}
          disabled={currentStep === "database"}
          className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(0,0,0,0.12)] text-[color:var(--color-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[rgba(107,140,174,0.5)] transition-all"
        >
          ← Previous
        </button>
        <div className="text-xs text-[color:var(--color-text-secondary)]">
          Step {STEPS.findIndex(s => s.id === currentStep) + 1} of {STEPS.length}
        </div>
        <button
          type="button"
          onClick={() => {
            const currentIdx = STEPS.findIndex(s => s.id === currentStep);
            if (currentIdx < STEPS.length - 1) setCurrentStep(STEPS[currentIdx + 1].id);
          }}
          disabled={currentStep === "math"}
          className="px-4 py-2 rounded-lg bg-[rgba(107,140,174,0.2)] border border-[rgba(107,140,174,1)] text-[color:var(--color-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(107,140,174,0.3)] transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
