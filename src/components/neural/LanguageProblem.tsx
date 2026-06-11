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
            <h4 className="text-base font-semibold text-[color:var(--color-text-primary)] mb-3">
              1. Memory Challenge
            </h4>
            <div className="bg-white border border-[rgba(0,0,0,0.12)] rounded p-4 mb-3">
              <div className="text-base text-[color:var(--color-text-primary)] mb-3">
                "<strong className="text-[rgba(91,156,245,1)]">The animal</strong>, which had been wandering the fields all afternoon in the scorching heat looking for water, didn't cross the street because <strong className="text-[rgba(91,156,245,1)]">it</strong> was too tired."
              </div>
              <div className="text-sm text-[color:var(--color-text-secondary)]">
                What does "it" refer to? "The animal" sits twenty words earlier, with a street mentioned in between.
              </div>
            </div>
            <div className="text-base text-[color:var(--color-text-secondary)]">
              The model needs to hold on to words from far earlier in the sentence and understand which interpretation makes logical sense. The relevant word can be arbitrarily far back.
            </div>
          </div>

          {/* Context Matters */}
          <div className="bg-[rgba(125,163,198,0.08)] border border-[rgba(125,163,198,0.3)] rounded-lg p-5">
            <h4 className="text-base font-semibold text-[color:var(--color-text-primary)] mb-3">
              2. Context Changes Meaning
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div className="bg-white border border-[rgba(0,0,0,0.12)] rounded p-3">
                <div className="text-sm text-[color:var(--color-text-secondary)] mb-1">Context 1:</div>
                <div className="text-base text-[color:var(--color-text-primary)] mb-2">
                  "We walked along the river <strong className="text-[#0F4C81]">bank</strong>"
                </div>
                <div className="text-sm text-[#0F4C81]">
                  Bank = edge of river
                </div>
              </div>
              <div className="bg-white border border-[rgba(0,0,0,0.12)] rounded p-3">
                <div className="text-sm text-[color:var(--color-text-secondary)] mb-1">Context 2:</div>
                <div className="text-base text-[color:var(--color-text-primary)] mb-2">
                  "I deposited money at the <strong className="text-[#0F4C81]">bank</strong>"
                </div>
                <div className="text-sm text-[#0F4C81]">
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
            <h4 className="text-base font-semibold text-[color:var(--color-text-primary)] mb-3">
              3. Order Matters
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div className="bg-white border border-[rgba(0,0,0,0.12)] rounded p-3">
                <div className="text-sm text-[#059669] mb-1">Sentence A:</div>
                <div className="text-base font-mono text-[color:var(--color-text-primary)]">"Dog bites man"</div>
                <div className="text-sm text-[color:var(--color-text-secondary)] mt-2">
                  Meaning: Not newsworthy
                </div>
              </div>
              <div className="bg-white border border-[rgba(0,0,0,0.12)] rounded p-3">
                <div className="text-sm text-[#B45309] mb-1">Sentence B:</div>
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
