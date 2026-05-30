"use client";

export function LanguageProblem() {
  return (
    <div className="space-y-6">
      {/* Why Language is Hard */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-[color:var(--color-text-primary)] mb-4">
          Why Languages Are Different
        </h4>

        <div className="space-y-4">
          {/* Memory Challenge */}
          <div className="bg-[rgba(91,156,245,0.08)] border border-[rgba(91,156,245,0.3)] rounded-lg p-5">
            <div className="text-base font-semibold text-[color:var(--color-text-primary)] mb-3">
              1. Memory Challenge
            </div>
            <div className="bg-white border border-[rgba(0,0,0,0.12)] rounded p-4 mb-3">
              <div className="text-base text-[color:var(--color-text-primary)] mb-3">
                "The animal didn't cross the street because <strong className="text-[rgba(91,156,245,1)]">it</strong> was too tired."
              </div>
              <div className="text-sm text-[color:var(--color-text-secondary)]">
                What does "it" refer to? The animal or the street?
              </div>
            </div>
            <div className="text-base text-[color:var(--color-text-secondary)]">
              The model needs to remember earlier parts of the sentence and understand which interpretation makes logical sense.
            </div>
          </div>

          {/* Context Matters */}
          <div className="bg-[rgba(125,163,198,0.08)] border border-[rgba(125,163,198,0.3)] rounded-lg p-5">
            <div className="text-base font-semibold text-[color:var(--color-text-primary)] mb-3">
              2. Context Changes Meaning
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div className="bg-white border border-[rgba(0,0,0,0.12)] rounded p-3">
                <div className="text-sm text-[color:var(--color-text-secondary)] mb-1">Context 1:</div>
                <div className="text-base text-[color:var(--color-text-primary)] mb-2">
                  "We walked along the river <strong className="text-[rgba(125,163,198,1)]">bank</strong>"
                </div>
                <div className="text-sm text-[rgba(125,163,198,1)]">
                  Bank = edge of river
                </div>
              </div>
              <div className="bg-white border border-[rgba(0,0,0,0.12)] rounded p-3">
                <div className="text-sm text-[color:var(--color-text-secondary)] mb-1">Context 2:</div>
                <div className="text-base text-[color:var(--color-text-primary)] mb-2">
                  "I deposited money at the <strong className="text-[rgba(125,163,198,1)]">bank</strong>"
                </div>
                <div className="text-sm text-[rgba(125,163,198,1)]">
                  Bank = financial institution
                </div>
              </div>
            </div>
            <div className="text-base text-[color:var(--color-text-secondary)]">
              Same word, different context → different meaning. The model must look at surrounding words to understand correctly.
            </div>
          </div>

          {/* Order Matters */}
          <div className="bg-[rgba(255,200,87,0.08)] border border-[rgba(255,200,87,0.3)] rounded-lg p-5">
            <div className="text-base font-semibold text-[color:var(--color-text-primary)] mb-3">
              3. Order Matters
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div className="bg-white border border-[rgba(0,0,0,0.12)] rounded p-3">
                <div className="text-sm text-[rgba(34,197,94,1)] mb-1">Sentence A:</div>
                <div className="text-base font-mono text-[color:var(--color-text-primary)]">"Dog bites man"</div>
                <div className="text-sm text-[color:var(--color-text-secondary)] mt-2">
                  Meaning: Not newsworthy
                </div>
              </div>
              <div className="bg-white border border-[rgba(0,0,0,0.12)] rounded p-3">
                <div className="text-sm text-[rgba(255,200,87,1)] mb-1">Sentence B:</div>
                <div className="text-base font-mono text-[color:var(--color-text-primary)]">"Man bites dog"</div>
                <div className="text-sm text-[color:var(--color-text-secondary)] mt-2">
                  Meaning: Front page news!
                </div>
              </div>
            </div>
            <div className="text-base text-[color:var(--color-text-secondary)]">
              Same words, different order → completely different meaning. Feed-forward networks cannot distinguish these.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
