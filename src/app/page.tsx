import { ChapterLayout } from "@/components/layout/ChapterLayout";
import { DerivativeExplorer1D } from "@/components/neural/gradient-descent/DerivativeExplorer1D";
import { PartialDerivativeBreakdown } from "@/components/neural/gradient-descent/PartialDerivativeBreakdown";
import { BackpropagationVisualizer } from "@/components/neural/BackpropagationVisualizer";
import { ActivationFunctionExplorer } from "@/components/neural/ActivationFunctionExplorer";
import { TransformerArchitectureViz } from "@/components/neural/TransformerArchitectureViz";
import { RNNArchitectureViz } from "@/components/neural/RNNArchitectureViz";
import { LanguageProblem } from "@/components/neural/LanguageProblem";
import { QKVIntuitionBuilder } from "@/components/neural/QKVIntuitionBuilder";
import { PositionalEncodingVisualizer } from "@/components/neural/transformers/PositionalEncodingVisualizer";
import { GPUAccelerationSection } from "@/components/neural/GPUAccelerationSection";
import { CostFunctionDualPanel } from "@/components/neural/cost-function/CostFunctionDualPanel";
import { GradientDescentExplorer } from "@/components/neural/GradientDescentExplorer";
import { NetworkSimplificationIntro } from "@/components/neural/NetworkSimplificationIntro";
import { DistributedRepresentationDemo } from "@/components/neural/DistributedRepresentationDemo";
import { NonLinearRegressionDemo } from "@/components/neural/NonLinearRegressionDemo";
import { TransformerPipelineSection } from "@/components/neural/transformer-pipeline";
import { InlineMath, BlockMath } from "react-katex";
import { getChapterDefinition } from "@/lib/sections";

const chapter = getChapterDefinition("neural");

/**
 * MACHINE LEARNING FOUNDATIONS - STANDALONE
 *
 * Builds from linear regression to transformers:
 *    1. Linear Regression & Cost Function
 *    2. Gradient Descent
 *    3. Derivatives
 *    4. Distributed Representations
 *    5. Backpropagation
 *    6. Activation Functions
 *    7. When Linearity Fails
 *    8. RNN Architecture
 *    9. The Language Problem
 *    10. Transformer Architecture Details
 *    11. GPU Acceleration
 *    + The Transformer Pipeline walkthrough
 */

export default function HomePage() {
  return (
    <ChapterLayout chapter={chapter}>

      {/* ========================================
          FOUNDATION 1: LINEAR REGRESSION & COST FUNCTION
      ======================================== */}
      <section id="linear-regression" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 1</span>
            <h2 className="section-heading mt-4">
              Linear Regression & Cost Function
            </h2>
            <p className="section-body">
              The simplest model: predict output as a linear function of input.
              The <strong className="text-[color:var(--color-accent)]">cost function</strong> measures
              how wrong our predictions are.
            </p>
          </div>

          {/* Network Simplification */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              From Complex Networks to Simple Models
            </h3>
            <NetworkSimplificationIntro />
          </div>

          {/* Cost Function */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              The Cost Function
            </h3>
            <p className="section-body mb-4">
              We need a way to measure the <strong className="text-[color:var(--color-accent)]">error</strong> between
              predictions and actual values. This is the <strong className="text-[color:var(--color-accent)]">cost function</strong>.
            </p>
            <CostFunctionDualPanel />
          </div>
        </div>
      </section>

      {/* ========================================
          FOUNDATION 2: GRADIENT DESCENT
      ======================================== */}
      <section id="gradient-descent" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 2</span>
            <h2 className="section-heading mt-4">
              Gradient Descent
            </h2>
            <p className="section-body">
              You now know <strong>WHAT to minimize</strong> (the cost function). Here&apos;s <strong>HOW we minimize it</strong>.
              Models learn by <strong>following the slope downhill</strong> on the cost landscape to find the lowest point.
              This is <strong>gradient descent</strong>: the fundamental algorithm that trains all modern neural networks.
            </p>
          </div>

          {/* Interactive 3D Explorer */}
          <div className="mb-8">
            <GradientDescentExplorer />
          </div>

          {/* Key Takeaway */}
          <div className="mt-8 p-4 bg-[rgba(107,140,174,0.08)] border border-[rgba(107,140,174,0.3)] rounded-lg text-center">
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              <strong className="text-[color:var(--color-text-primary)]">Key Insight:</strong> Gradient descent
              works by computing the gradient (direction of steepest ascent) and moving in the opposite direction.
              The learning rate controls step size.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          FOUNDATION 3: DERIVATIVES
      ======================================== */}
      <section id="derivatives" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 3</span>
            <h2 className="section-heading mt-4">
              Understanding Derivatives
            </h2>
            <p className="section-body">
              Derivatives measure how a function changes as its input changes. In machine learning,
              we use derivatives to find the direction that minimizes the cost function.
            </p>
          </div>

          {/* 1D Derivatives */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              1D Derivatives: Slope and Rate of Change
            </h3>
            <DerivativeExplorer1D />
          </div>

          {/* Partial Derivatives */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              Partial Derivatives: Multi-dimensional Gradients
            </h3>
            <PartialDerivativeBreakdown />
          </div>
        </div>
      </section>

      {/* ========================================
          FOUNDATION 4: DISTRIBUTED REPRESENTATIONS
      ======================================== */}
      <section id="distributed-representations" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 4</span>
            <h2 className="section-heading mt-4">
              Why Gradient Descent Hides How Models Think
            </h2>
            <p className="section-body max-w-4xl">
              Gradient descent creates powerful but opaque solutions. Let&apos;s see
              <strong className="text-[color:var(--color-accent)]"> why</strong> this learning method
              makes models so hard to interpret.
            </p>
          </div>

          {/* The Entanglement Problem */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)] mb-4">
              The Entanglement Problem: Coupled Updates
            </h3>
            <p className="section-body max-w-4xl mb-6">
              Remember: the gradient is a <strong className="text-[color:var(--color-accent)]">vector of partial derivatives</strong>,
              one for each parameter.
            </p>

            {/* Mathematical Insight Box */}
            <div className="mb-6 p-5 bg-[rgba(178,24,43,0.08)] border border-[rgba(178,24,43,0.3)] rounded-lg max-w-3xl mx-auto">
              <div className="text-sm font-semibold text-[rgba(178,24,43,1)] mb-3">
                The Gradient Depends on All Parameters
              </div>
              <p className="text-sm text-[color:var(--color-text-secondary)] mb-4">
                Each partial derivative <InlineMath math="\frac{\partial L}{\partial w_i}" /> answers:{" "}
                <em>&quot;How should <InlineMath math="w_i" /> change?&quot;</em>
              </p>
              <p className="text-sm text-[color:var(--color-text-secondary)] mb-4">
                But this derivative is computed <strong className="text-[color:var(--color-text-primary)]">given the current values of all other parameters</strong>.
                The &quot;downhill direction&quot; for <InlineMath math="w_1" /> depends on where <InlineMath math="w_2, w_3, \ldots" /> currently sit.
              </p>
              <div className="flex justify-center py-3 px-4 bg-[rgba(0,0,0,0.2)] rounded">
                <BlockMath math="\frac{\partial L}{\partial w_i} = f(w_1, w_2, \ldots, w_n)" />
              </div>
              <p className="text-xs text-[color:var(--color-text-secondary)] mt-3 italic">
                When any weight changes, the optimal direction for every other weight shifts too.
              </p>
            </div>

            <DistributedRepresentationDemo />
          </div>
        </div>
      </section>

      {/* ========================================
          FOUNDATION 5: BACKPROPAGATION
      ======================================== */}
      <section id="backpropagation" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 5</span>
            <h2 className="section-heading mt-4">
              Backpropagation
            </h2>
            <p className="section-body">
              Backpropagation is the algorithm that computes gradients efficiently in neural networks.
              It uses the chain rule to propagate error backward from output to input, calculating
              how much each parameter contributed to the final error.
            </p>
          </div>

          <BackpropagationVisualizer />
        </div>
      </section>

      {/* ========================================
          FOUNDATION 6: ACTIVATION FUNCTIONS
      ======================================== */}
      <section id="activation-functions" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 6</span>
            <h2 className="section-heading mt-4">
              Activation Functions
            </h2>
            <p className="section-body">
              Activation functions introduce non-linearity into neural networks. Without them,
              multiple layers would collapse into a single linear transformation. The most common
              activation function is ReLU (Rectified Linear Unit).
            </p>
          </div>

          <ActivationFunctionExplorer />
        </div>
      </section>

      {/* ========================================
          FOUNDATION 7: WHEN LINEARITY FAILS
      ======================================== */}
      <section id="when-linearity-fails" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 7</span>
            <h2 className="section-heading mt-4">
              When Linearity Fails
            </h2>
            <p className="section-body">
              Linear regression can only fit flat planes. What happens when the real relationship
              has a complex 3D shape like a saddle? Compare how linear models fail while neural
              networks can capture these non-linear patterns.
            </p>
          </div>

          <NonLinearRegressionDemo />
        </div>
      </section>

      {/* ========================================
          FOUNDATION 8: RNN ARCHITECTURE
      ======================================== */}
      <section id="rnn-architecture" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 8</span>
            <h2 className="section-heading mt-4">
              RNN Architecture (Pre-Transformer)
            </h2>
            <p className="section-body">
              Before transformers, Recurrent Neural Networks (RNNs) were the primary architecture
              for sequential data. They process sequences one element at a time, maintaining
              hidden state. However, they suffer from vanishing gradients and cannot parallelize.
            </p>
          </div>

          <RNNArchitectureViz />
        </div>
      </section>

      {/* ========================================
          FOUNDATION 9: THE LANGUAGE PROBLEM
      ======================================== */}
      <section id="language-problem" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 9</span>
            <h2 className="section-heading mt-4">
              The Language Problem
            </h2>
            <p className="section-body">
              Language understanding presents unique challenges that simple feed-forward networks
              cannot solve. Understanding these challenges explains why RNNs and later transformers
              were developed.
            </p>
          </div>

          <LanguageProblem />
        </div>
      </section>

      {/* ========================================
          FOUNDATION 10: TRANSFORMER ARCHITECTURE DETAILS
      ======================================== */}
      <section id="transformer-architecture" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 10</span>
            <h2 className="section-heading mt-4">
              Transformer Architecture Details
            </h2>
            <p className="section-body">
              Deep dive into the transformer architecture: how Query-Key-Value attention works,
              why positional encoding is necessary, and how multi-head attention enables
              parallel processing of different aspects of meaning.
            </p>
          </div>

          {/* Full Architecture */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              Complete Transformer Architecture
            </h3>
            <TransformerArchitectureViz />
          </div>

          {/* Query-Key-Value Mechanism */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              Query-Key-Value Attention Mechanism
            </h3>
            <QKVIntuitionBuilder />
          </div>

          {/* Positional Encoding */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              Positional Encoding
            </h3>
            <PositionalEncodingVisualizer />
          </div>
        </div>
      </section>

      {/* ========================================
          FOUNDATION 11: GPU ACCELERATION
      ======================================== */}
      <section id="gpu-acceleration" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 11</span>
            <h2 className="section-heading mt-4">
              GPU Acceleration
            </h2>
            <p className="section-body">
              GPUs (Graphics Processing Units) are essential for training modern neural networks.
              Unlike CPUs which excel at sequential tasks, GPUs can perform thousands of
              operations in parallel, making them ideal for matrix operations in deep learning.
            </p>
          </div>

          <GPUAccelerationSection />
        </div>
      </section>

      {/* ========================================
          THE TRANSFORMER PIPELINE
      ======================================== */}
      <section id="transformer-pipeline" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Walkthrough</span>
            <h2 className="section-heading mt-4">
              The Transformer Pipeline
            </h2>
            <p className="section-body">
              A step-by-step walkthrough of how transformers process text, from tokenization
              through embedding, attention, and final output generation.
            </p>
          </div>

          <TransformerPipelineSection />
        </div>
      </section>

    </ChapterLayout>
  );
}
