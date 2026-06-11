'use client';

import { useState } from 'react';
import { TokenizerVisual } from './TokenizerVisual';
import { EmbeddingsVisual } from './EmbeddingsVisual';
import { AttentionWithContext } from './AttentionWithContext';
import { FeedForwardOutput } from './FeedForwardOutput';

type PipelineStep = 'tokenizer' | 'embeddings' | 'attention' | 'output';

interface StepConfig {
  id: PipelineStep;
  label: string;
  shortLabel: string;
  color: string;
  description: string;
}

const STEPS: StepConfig[] = [
  {
    id: 'tokenizer',
    label: 'Tokenization',
    shortLabel: '1. Tokenize',
    color: 'rgba(107,140,174,1)',
    description: 'Split text into tokens',
  },
  {
    id: 'embeddings',
    label: 'Embeddings',
    shortLabel: '2. Embed',
    color: 'rgba(125,163,198,1)',
    description: 'Convert tokens to vectors',
  },
  {
    id: 'attention',
    label: 'Attention',
    shortLabel: '3. Attend',
    color: 'rgba(255,200,87,1)',
    description: 'Gather context from all tokens',
  },
  {
    id: 'output',
    label: 'Feed-Forward & Output',
    shortLabel: '4. Output',
    color: 'rgba(74,124,89,1)',
    description: 'Process and predict next token',
  },
];

export function TransformerPipelineSection() {
  const [activeStep, setActiveStep] = useState<PipelineStep>('tokenizer');

  const activeStepConfig = STEPS.find(s => s.id === activeStep)!;
  const activeIndex = STEPS.findIndex(s => s.id === activeStep);

  const goToStep = (step: PipelineStep) => {
    setActiveStep(step);
  };

  const goNext = () => {
    const nextIndex = Math.min(activeIndex + 1, STEPS.length - 1);
    setActiveStep(STEPS[nextIndex].id);
  };

  const goPrev = () => {
    const prevIndex = Math.max(activeIndex - 1, 0);
    setActiveStep(STEPS[prevIndex].id);
  };

  return (
    <div className="space-y-8">
      {/* Pipeline Progress Bar */}
      <div className="bg-white border-2 border-[var(--color-border)] rounded-xl p-4 shadow-sm">
        {/* Visual Pipeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 hidden md:block" />
          <div
            className="absolute top-1/2 left-0 h-1 -translate-y-1/2 transition-all duration-500 hidden md:block"
            style={{
              width: `${(activeIndex / (STEPS.length - 1)) * 100}%`,
              background: `linear-gradient(to right, ${STEPS[0].color}, ${activeStepConfig.color})`,
            }}
          />

          {/* Step Buttons */}
          <div className="relative flex flex-col md:flex-row justify-between gap-2 md:gap-0">
            {STEPS.map((step, idx) => {
              const isActive = step.id === activeStep;
              const isPast = idx < activeIndex;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => goToStep(step.id)}
                  className={`
                    flex items-center md:flex-col gap-3 md:gap-2 p-3 md:p-2 rounded-lg transition-all
                    ${isActive
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
                    }
                  `}
                >
                  {/* Circle indicator */}
                  <div
                    className={`
                      w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
                      font-bold text-lg transition-all border-2
                      ${isActive
                        ? 'scale-110 shadow-lg'
                        : isPast
                          ? 'opacity-80'
                          : 'opacity-50'
                      }
                    `}
                    style={{
                      backgroundColor: isActive ? step.color : isPast ? `${step.color}30` : 'rgb(229, 231, 235)',
                      borderColor: step.color,
                      color: isActive ? '#ffffff' : isPast ? step.color : 'rgb(107, 114, 128)',
                      boxShadow: isActive ? `0 0 20px ${step.color}40` : undefined,
                    }}
                  >
                    {idx + 1}
                  </div>

                  {/* Label */}
                  <div className="text-left md:text-center">
                    <div
                      className={`text-sm font-semibold transition-all ${isActive ? '' : 'opacity-70'}`}
                      style={{ color: isActive ? step.color : 'var(--color-text-primary)' }}
                    >
                      {step.label}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] hidden md:block">
                      {step.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Step Content */}
      <div className="min-h-[600px]">
        {activeStep === 'tokenizer' && <TokenizerVisual />}
        {activeStep === 'embeddings' && <EmbeddingsVisual />}
        {activeStep === 'attention' && <AttentionWithContext />}
        {activeStep === 'output' && <FeedForwardOutput />}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={goPrev}
          disabled={activeIndex === 0}
          className={`
            px-6 py-3 rounded-lg text-sm font-medium transition-all
            ${activeIndex === 0
              ? 'opacity-30 cursor-not-allowed bg-gray-100 text-gray-400'
              : 'bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/20 text-[var(--color-accent)]'
            }
          `}
        >
          Previous: {activeIndex > 0 ? STEPS[activeIndex - 1].label : ''}
        </button>

        <div className="text-sm text-[var(--color-text-muted)]">
          Step {activeIndex + 1} of {STEPS.length}
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={activeIndex === STEPS.length - 1}
          className={`
            px-6 py-3 rounded-lg text-sm font-medium transition-all
            ${activeIndex === STEPS.length - 1
              ? 'opacity-30 cursor-not-allowed bg-gray-100 text-gray-400'
              : 'bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-700'
            }
          `}
        >
          Next: {activeIndex < STEPS.length - 1 ? STEPS[activeIndex + 1].label : ''}
        </button>
      </div>
    </div>
  );
}
