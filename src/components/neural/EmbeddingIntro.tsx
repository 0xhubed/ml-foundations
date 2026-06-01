"use client";

import { useMemo, useState } from "react";
import { InlineMath } from "react-katex";

/**
 * Self-guided introduction to word embeddings: words become vectors, and
 * words used in similar ways end up close together in that space. Clicking a
 * word reveals its nearest neighbours so a reader can see the geometry of
 * meaning directly. Light-theme only, to match the rest of the page.
 */

type Word = {
  label: string;
  group: string;
  x: number; // semantic-map coordinates (arbitrary units, 0..8)
  y: number;
};

// A small, hand-placed map so semantically related words cluster together.
const WORDS: Word[] = [
  { label: "cat", group: "animals", x: 1.1, y: 5.6 },
  { label: "dog", group: "animals", x: 1.6, y: 6.0 },
  { label: "kitten", group: "animals", x: 0.6, y: 5.0 },
  { label: "puppy", group: "animals", x: 1.9, y: 5.2 },
  { label: "king", group: "royalty", x: 5.6, y: 6.4 },
  { label: "queen", group: "royalty", x: 6.1, y: 6.0 },
  { label: "prince", group: "royalty", x: 5.2, y: 5.7 },
  { label: "apple", group: "food", x: 3.4, y: 1.4 },
  { label: "bread", group: "food", x: 3.9, y: 1.8 },
  { label: "banana", group: "food", x: 3.0, y: 0.9 },
  { label: "Monday", group: "time", x: 7.0, y: 1.5 },
  { label: "Tuesday", group: "time", x: 7.4, y: 1.9 },
  { label: "week", group: "time", x: 6.6, y: 2.3 },
];

const GROUP_COLOR: Record<string, string> = {
  animals: "#0F4C81",
  royalty: "#7C3AED",
  food: "#059669",
  time: "#B45309",
};

// Deterministic "embedding" numbers derived from the map position, purely so
// the reader can see a word rendered as a list of values.
function fakeVector(word: Word): number[] {
  const seed = word.x * 1.7 + word.y * 0.9;
  return [
    Math.sin(seed) ,
    Math.cos(seed * 0.6),
    Math.sin(seed * 1.3 + 1),
    Math.cos(seed * 0.4 + 2),
    Math.sin(seed * 0.8 + 3),
    Math.cos(seed * 1.1 + 0.5),
  ].map((v) => Math.round(v * 100) / 100);
}

export function EmbeddingIntro() {
  const [selected, setSelected] = useState<string>("cat");

  const selectedWord = WORDS.find((w) => w.label === selected)!;

  // Two nearest neighbours by distance on the map.
  const neighbours = useMemo(() => {
    return WORDS.filter((w) => w.label !== selected)
      .map((w) => ({
        word: w,
        dist: Math.hypot(w.x - selectedWord.x, w.y - selectedWord.y),
      }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 2);
  }, [selected, selectedWord]);

  const neighbourLabels = new Set(neighbours.map((n) => n.word.label));

  // Map data coordinates (0..8) into the SVG viewbox.
  const mapX = (x: number) => 40 + (x / 8) * 520;
  const mapY = (y: number) => 360 - (y / 8) * 320;

  const vector = fakeVector(selectedWord);

  return (
    <div className="glass-panel p-6 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[color:var(--color-text-primary)] mb-2">
          The Semantic Map
        </h3>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          Each word is a point in space. Click any word to see its two nearest neighbours — the
          words the model treats as most similar.
        </p>
      </div>

      {/* Semantic map */}
      <div className="bg-[#F8FAFC] rounded-lg p-4 border border-[rgba(0,0,0,0.08)]">
        <svg viewBox="0 0 600 400" className="w-full" style={{ maxHeight: "420px" }}>
          {/* Connection lines to nearest neighbours */}
          {neighbours.map((n) => (
            <line
              key={`link-${n.word.label}`}
              x1={mapX(selectedWord.x)}
              y1={mapY(selectedWord.y)}
              x2={mapX(n.word.x)}
              y2={mapY(n.word.y)}
              stroke="rgba(15,76,129,0.35)"
              strokeWidth="2"
              strokeDasharray="5 4"
            />
          ))}

          {WORDS.map((w) => {
            const isSelected = w.label === selected;
            const isNeighbour = neighbourLabels.has(w.label);
            const color = GROUP_COLOR[w.group];
            const radius = isSelected ? 9 : 6;
            return (
              <g
                key={w.label}
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(w.label)}
              >
                <circle
                  cx={mapX(w.x)}
                  cy={mapY(w.y)}
                  r={radius}
                  fill={color}
                  fillOpacity={isSelected || isNeighbour ? 1 : 0.35}
                  stroke={isSelected ? "#1A1A1A" : "#FFFFFF"}
                  strokeWidth={isSelected ? 2 : 1}
                />
                <text
                  x={mapX(w.x) + 12}
                  y={mapY(w.y) + 4}
                  fontSize="13"
                  fontWeight={isSelected ? 700 : 500}
                  fill={isSelected || isNeighbour ? "#1A1A1A" : "#94A3B8"}
                >
                  {w.label}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="text-xs text-[color:var(--color-text-muted)] mt-2 text-center">
          Nothing told the model what these words mean — it placed them by how they&apos;re used in
          text. Similar usage → nearby points.
        </p>
      </div>

      {/* Selected word as a vector */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[rgba(15,76,129,0.06)] border border-[rgba(0,0,0,0.08)] rounded-lg p-4">
          <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
            &quot;{selected}&quot; as a vector
          </h4>
          <div className="flex gap-1.5 flex-wrap">
            {vector.map((v, i) => (
              <span
                key={i}
                className="font-mono text-xs px-2 py-1 rounded bg-white border border-[rgba(0,0,0,0.08)] text-[color:var(--color-text-secondary)]"
              >
                {v >= 0 ? "+" : ""}
                {v.toFixed(2)}
              </span>
            ))}
          </div>
          <p className="text-xs text-[color:var(--color-text-muted)] mt-3">
            Real embeddings have hundreds or thousands of these numbers. Here we show six.
          </p>
        </div>

        <div className="bg-[rgba(15,76,129,0.06)] border border-[rgba(0,0,0,0.08)] rounded-lg p-4">
          <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-3">
            Closest in meaning
          </h4>
          <ul className="space-y-2">
            {neighbours.map((n) => (
              <li key={n.word.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-[color:var(--color-text-primary)]">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: GROUP_COLOR[n.word.group] }}
                  />
                  {n.word.label}
                </span>
                <span className="font-mono text-xs text-[color:var(--color-text-secondary)]">
                  distance {n.dist.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Vector arithmetic intuition */}
      <div className="bg-[rgba(124,58,237,0.06)] border border-[rgba(124,58,237,0.25)] rounded-lg p-4">
        <h4 className="text-sm font-semibold text-[color:var(--color-text-primary)] mb-2">
          Meaning becomes arithmetic
        </h4>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          Because meaning is encoded as direction and distance, you can do math with words. The
          classic example: <InlineMath math="\text{king} - \text{man} + \text{woman} \approx \text{queen}" />.
          The step from &quot;man&quot; to &quot;woman&quot; points the same way as the step from
          &quot;king&quot; to &quot;queen.&quot;
        </p>
      </div>
    </div>
  );
}
