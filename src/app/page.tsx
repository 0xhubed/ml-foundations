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
import { EmbeddingIntro } from "@/components/neural/EmbeddingIntro";
import { TransformerPipelineSection } from "@/components/neural/transformer-pipeline";
import { InlineMath, BlockMath } from "react-katex";
import { TryIt } from "@/components/ui/TryIt";
import { SectionTakeaway } from "@/components/ui/SectionTakeaway";
import { getChapterDefinition } from "@/lib/sections";

const chapter = getChapterDefinition("neural");

/**
 * MACHINE LEARNING FOUNDATIONS - STANDALONE
 *
 * Ordered so each section only depends on earlier ones (congruent build-up):
 *    1.  Linear Regression & Cost Function   (what a model is, how we score it)
 *    2.  Understanding Derivatives           (the slope = which way is downhill)
 *    3.  Gradient Descent                    (follow the slope to minimize cost)
 *    4.  Backpropagation                     (scale up to a network, compute the gradients efficiently)
 *    5.  Why Gradient Descent Hides ...      (aside: interpretability)
 *    6.  Activation Functions                (non-linearity + the linear-failure payoff demo)
 *    7.  The Language Problem                (why sequences are hard)
 *    8.  Embeddings                          (words -> vectors, prerequisite for any sequence model)
 *    9.  RNN Architecture                    (first attempt at sequences)
 *    10. Transformer Architecture Details    (attention solves it)
 *    11. GPU Acceleration                    (why it became practical)
 *    +   The Transformer Pipeline walkthrough (synthesis)
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
              predictions and actual values. This is the <strong className="text-[color:var(--color-accent)]">cost function</strong>:
              it adds up how far each prediction lands from the true value, so a lower cost means a better fit.
            </p>
            <TryIt>
              Drag the line (or move the <InlineMath math="w" /> and <InlineMath math="b" /> controls)
              and watch the cost rise and fall. Notice that the cost is smallest when the line passes
              as close as possible to every point at once.
            </TryIt>
            <CostFunctionDualPanel />
          </div>

          <SectionTakeaway>
            A model is just a function with adjustable parameters (<InlineMath math="w" /> and{" "}
            <InlineMath math="b" />), and the cost function turns &quot;how good is this model?&quot;
            into a single number to minimize. Learning is the search for the parameters that make that
            number as small as possible. To search efficiently, we need to know which way is
            &quot;downhill&quot; on the cost, and that direction is what a derivative measures.
          </SectionTakeaway>
        </div>
      </section>

      {/* ========================================
          FOUNDATION 2: DERIVATIVES
      ======================================== */}
      <section id="derivatives" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 2</span>
            <h2 className="section-heading mt-4">
              Understanding Derivatives
            </h2>
            <p className="section-body">
              A derivative measures how a function changes as its input changes: the slope at a
              point. Since our goal is to make the cost smaller, the slope is precisely what tells us
              which way to move. Here we build the idea up from one dimension to the many dimensions a
              real model lives in.
            </p>
          </div>

          {/* 1D Derivatives */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              1D Derivatives: Slope and Rate of Change
            </h3>
            <TryIt>
              Move the point along the curve and watch the tangent line. Where the curve is steep the
              derivative is large; at the very bottom of a dip it&apos;s zero. That is exactly the
              kind of point we&apos;re hunting for when we minimize cost.
            </TryIt>
            <DerivativeExplorer1D />
          </div>

          {/* Partial Derivatives */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              Partial Derivatives: Multi-dimensional Gradients
            </h3>
            <p className="section-body mb-4 max-w-3xl">
              Real models have many parameters, not one. A <strong>partial derivative</strong> asks
              how the cost changes when you nudge a single parameter and hold the rest fixed. Stack
              one partial derivative per parameter together and you get the{" "}
              <strong>gradient</strong>: the full downhill direction.
            </p>
            <TryIt>
              Adjust one variable at a time and see how its partial derivative is measured
              independently of the others. The gradient is just all of these slopes bundled into one
              vector.
            </TryIt>
            <PartialDerivativeBreakdown />
          </div>

          <SectionTakeaway>
            The gradient is a vector of partial derivatives, one slope per parameter, pointing in
            the direction in which cost increases fastest. Flip it around and you have the direction
            of steepest <em>decrease</em>. Next we use exactly that to drive the cost down, step by
            step: gradient descent.
          </SectionTakeaway>
        </div>
      </section>

      {/* ========================================
          FOUNDATION 3: GRADIENT DESCENT
      ======================================== */}
      <section id="gradient-descent" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 3</span>
            <h2 className="section-heading mt-4">
              Gradient Descent
            </h2>
            <p className="section-body">
              You now know <strong>what to minimize</strong> (the cost function) and <strong>how to
              measure the slope</strong> of that cost (the gradient). Gradient descent is the simple
              loop that puts them together: step downhill, recompute the slope, and repeat until you
              reach the lowest point. This is the fundamental algorithm that trains all modern neural
              networks.
            </p>
          </div>

          {/* Interactive 3D Explorer */}
          <div className="mb-8">
            <TryIt>
              Pick a starting point on the cost surface and step downhill. Try a small learning rate
              (slow but steady) versus a large one (fast, but it can overshoot the valley). The step
              size is the single most important knob in training.
            </TryIt>
            <GradientDescentExplorer />
          </div>

          <SectionTakeaway>
            Gradient descent repeats one move (compute the gradient, step the opposite way) until it
            settles in a low point, with the learning rate setting the step size. On a model with
            millions of parameters, though, computing that gradient naively would be hopelessly slow.
            The algorithm that makes it efficient is backpropagation.
          </SectionTakeaway>
        </div>
      </section>

      {/* ========================================
          FOUNDATION 4: BACKPROPAGATION
      ======================================== */}
      <section id="backpropagation" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 4</span>
            <h2 className="section-heading mt-4">
              Backpropagation
            </h2>
            <p className="section-body">
              So far we&apos;ve trained a model with exactly two parameters. Real neural networks
              have millions or even billions. Before we can train one, we need to see what a
              network actually is, and then meet the algorithm that makes computing all of those
              gradients feasible: backpropagation.
            </p>
          </div>

          {/* From One Parameter to a Network */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              From One Parameter to a Network
            </h3>
            <p className="section-body mb-4 max-w-3xl">
              A <strong>neuron</strong> is just our familiar pattern with more inputs: it multiplies
              each input by its own weight, adds them up with a bias:{" "}
              <InlineMath math="w_1 x_1 + w_2 x_2 + \ldots + b" />. A <strong>layer</strong> is many
              neurons side by side, each reading the same inputs but with its own weights. A{" "}
              <strong>network</strong> stacks layers, so each layer&apos;s outputs become the next
              layer&apos;s inputs. That&apos;s the whole construction: the complex diagram from the
              first section is nothing more than this pattern repeated.
            </p>
            <p className="section-body mb-4 max-w-3xl">
              Crucially, <strong>nothing about learning changes</strong>: the network is still a
              function with adjustable parameters, the cost function still scores it, and gradient
              descent still follows the slopes downhill. There are just millions of slopes now
              instead of two.
            </p>
            <p className="section-body mb-4 max-w-3xl">
              And that&apos;s the catch. A weight deep inside the network affects the cost only
              indirectly, through every layer after it. Measuring its slope naively (nudge the
              weight, re-run the whole network, see how the cost moved) would mean billions of
              runs for a single training step. We need a way to get <em>every</em> gradient from{" "}
              <em>one</em> run.
            </p>
          </div>

          {/* The Backward Pass */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              The Backward Pass
            </h3>
            <p className="section-body mb-4 max-w-3xl">
              Backpropagation is that way. It uses the chain rule to propagate the error{" "}
              <strong>backward</strong> from output to input, calculating how much each parameter
              contributed to the final error: all of the gradients in one sweep rather than one
              parameter at a time.
            </p>
            <TryIt>
              Step through the forward pass (prediction) and then the backward pass. Watch the error
              flow backward layer by layer, and see how each weight&apos;s share of the blame, its
              gradient, is assembled from the layers in front of it.
            </TryIt>
            <BackpropagationVisualizer />
          </div>

          <SectionTakeaway>
            Backpropagation is the chain rule applied across a network: run the input forward to get a
            prediction and error, then push that error backward to find every parameter&apos;s
            gradient at once. Forward pass, backprop, and a gradient-descent step together form the
            loop that trains every modern network. That loop is powerful, but it has a curious side
            effect on what the trained network looks like inside.
          </SectionTakeaway>
        </div>
      </section>

      {/* ========================================
          FOUNDATION 5: DISTRIBUTED REPRESENTATIONS (aside)
      ======================================== */}
      <section id="distributed-representations" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 5 · Aside</span>
            <h2 className="section-heading mt-4">
              Why Gradient Descent Hides How Models Think
            </h2>
            <p className="section-body max-w-4xl">
              A short detour on a consequence of everything so far. Gradient descent produces powerful
              but <strong className="text-[color:var(--color-accent)]">opaque</strong> solutions.
              Let&apos;s see why this way of learning makes models so hard to interpret.
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
              <h4 className="text-sm font-semibold text-[rgba(178,24,43,1)] mb-3">
                The Gradient Depends on All Parameters
              </h4>
              <p className="text-sm text-[color:var(--color-text-secondary)] mb-4">
                Each partial derivative <InlineMath math="\frac{\partial L}{\partial w_i}" /> answers:{" "}
                <em>&quot;How should <InlineMath math="w_i" /> change?&quot;</em>
              </p>
              <p className="text-sm text-[color:var(--color-text-secondary)] mb-4">
                But this derivative is computed <strong className="text-[color:var(--color-text-primary)]">given the current values of all other parameters</strong>.
                The &quot;downhill direction&quot; for <InlineMath math="w_1" /> depends on where <InlineMath math="w_2, w_3, \ldots" /> currently sit.
              </p>
              <div className="flex justify-center py-3 px-4 bg-[rgba(15,76,129,0.06)] rounded">
                <BlockMath math="\frac{\partial L}{\partial w_i} = f(w_1, w_2, \ldots, w_n)" />
              </div>
              <p className="text-xs text-[color:var(--color-text-secondary)] mt-3 italic">
                When any weight changes, the optimal direction for every other weight shifts too.
              </p>
            </div>

            <TryIt>
              Nudge one weight and watch the others react. Because every parameter&apos;s ideal value
              depends on all the rest, a single &quot;concept&quot; ends up smeared across many
              weights rather than stored in one tidy place.
            </TryIt>
            <DistributedRepresentationDemo />
          </div>

          <SectionTakeaway>
            Because gradient descent updates every parameter together, knowledge ends up spread across
            the whole network: a <em>distributed representation</em>. That&apos;s what makes these
            models powerful but hard to interpret: there&apos;s rarely a single neuron you can point
            to. Every network we&apos;ve described so far is built from linear layers, though. The
            piece that gives them their real expressive power is the non-linearity between layers.
          </SectionTakeaway>
        </div>
      </section>

      {/* ========================================
          FOUNDATION 6: ACTIVATION FUNCTIONS & WHEN LINEARITY FAILS
      ======================================== */}
      <section id="activation-functions" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 6</span>
            <h2 className="section-heading mt-4">
              Activation Functions: Why Non-Linearity Matters
            </h2>
            <p className="section-body">
              Activation functions introduce <strong>non-linearity</strong> into neural networks.
              Without them, stacking layers is pointless: a chain of linear steps is still just one
              linear step, so the network could only ever draw straight lines. A non-linear function
              after each layer is what lets depth actually add expressive power. The most common one
              is ReLU (Rectified Linear Unit).
            </p>
          </div>

          {/* The shapes */}
          <div className="mb-8">
            <TryIt>
              Compare the linear function with ReLU. Notice ReLU&apos;s simple kink at zero. That
              single bend is cheap to compute, yet it&apos;s all a network needs to stop collapsing
              into one straight line.
            </TryIt>
            <ActivationFunctionExplorer />
          </div>

          {/* When linearity fails: the payoff */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              When Linearity Fails: Seeing the Payoff
            </h3>
            <p className="section-body mb-4 max-w-3xl">
              We&apos;ve claimed non-linearity matters. Now let&apos;s see it. Linear regression can
              only fit flat planes. What happens when the real relationship has a complex 3D shape
              like a saddle?
            </p>
            <TryIt>
              Look at the residual error for the linear fit on the curved surface, then switch to the
              neural network. The flat plane simply can&apos;t reach the peaks and valleys; the
              non-linear model wraps around them.
            </TryIt>
            <NonLinearRegressionDemo />
          </div>

          <SectionTakeaway>
            Activation functions are the bend between layers. Without them a deep network collapses
            into a single line and hits a hard ceiling that no amount of training can break; with
            them it can wrap around almost any shape. So far, though, every input has been a fixed
            set of numbers. Language isn&apos;t like that, and it breaks our assumptions in ways
            worth understanding before we change the architecture.
          </SectionTakeaway>
        </div>
      </section>

      {/* ========================================
          FOUNDATION 7: THE LANGUAGE PROBLEM
      ======================================== */}
      <section id="language-problem" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 7</span>
            <h2 className="section-heading mt-4">
              The Language Problem
            </h2>
            <p className="section-body">
              Language presents challenges that the models we&apos;ve built so far, which take a
              fixed set of numbers and produce an answer, simply cannot handle. The three problems
              below (long-range memory, context-dependent meaning, and word order) are what every
              language model must solve, and they drive the architectures in the rest of this page.
            </p>
          </div>

          <LanguageProblem />

          <SectionTakeaway>
            To understand language a model must remember distant words, resolve meaning from context,
            and respect word order. A plain feed-forward network sees a fixed-size input all at once
            and has no natural way to do any of this. But before any architecture can even attempt
            it, there&apos;s a more basic gap to close: networks compute with numbers, and language
            is words. The first step is turning words into vectors: embeddings.
          </SectionTakeaway>
        </div>
      </section>

      {/* ========================================
          FOUNDATION 8: EMBEDDINGS
      ======================================== */}
      <section id="embeddings" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 8</span>
            <h2 className="section-heading mt-4">
              Embeddings: Turning Words into Vectors
            </h2>
            <p className="section-body">
              A neural network only understands numbers, so the first thing any language model does
              is convert text into them. Text is first split into{" "}
              <strong>tokens</strong> (whole words or word pieces, so &quot;unbelievable&quot; might
              become &quot;un&quot; + &quot;believ&quot; + &quot;able&quot;), and each token is then
              mapped to a list of numbers called an{" "}
              <strong className="text-[color:var(--color-accent)]">embedding</strong>. Crucially these
              vectors are <strong>learned</strong> during training, so words used in similar ways end
              up close together: the model discovers on its own that &quot;cat&quot; and &quot;dog&quot;
              are more alike than &quot;cat&quot; and &quot;Tuesday.&quot; Every sequence model in the
              rest of this page operates on these vectors rather than on raw text.
            </p>
          </div>

          <TryIt>
            Click a word to see its nearest neighbours light up. Notice how words with related
            meanings sit close together, even though nothing told the model their definitions. It
            inferred the geometry from how the words are used.
          </TryIt>
          <EmbeddingIntro />

          <SectionTakeaway>
            An embedding turns each word into a point in a high-dimensional space where distance
            reflects similarity of meaning. This is the bridge from language to math: once words are
            vectors, a network can compare, combine, and transform them. Now we can return to the
            architecture question: how should a network read a <em>sequence</em> of these vectors?
            The first serious answer was the RNN.
          </SectionTakeaway>
        </div>
      </section>

      {/* ========================================
          FOUNDATION 9: RNN ARCHITECTURE
      ======================================== */}
      <section id="rnn-architecture" className="section-boundary">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="mb-8">
            <span className="badge">Foundations 9</span>
            <h2 className="section-heading mt-4">
              RNN Architecture (Pre-Transformer)
            </h2>
            <p className="section-body">
              Recurrent Neural Networks (RNNs) were the first serious answer to the language problem.
              They read a sequence of word vectors one element at a time, carrying a{" "}
              <strong>hidden state</strong> forward as a running memory of what came before.
              It&apos;s an elegant idea, but it has two costly weaknesses: information from early in a long sequence tends to fade (the
              vanishing-gradient problem), and because each step depends on the previous one, the work
              can&apos;t be parallelized.
            </p>
          </div>

          <TryIt>
            Follow the hidden state as it passes from one step to the next. Notice that step 5
            can&apos;t begin until step 4 finishes, and that the influence of the first word grows
            fainter the further along the sequence you go.
          </TryIt>
          <RNNArchitectureViz />

          <SectionTakeaway>
            RNNs gave networks a memory by threading a hidden state through a sequence, but reading
            strictly left-to-right makes them slow to train and forgetful over long distances. The
            architecture that replaced them drops the one-word-at-a-time constraint entirely: in a
            transformer, every word can look at every other word directly, through attention.
          </SectionTakeaway>
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
              An RNN reads one word at a time, squeezing everything it has seen into a single
              hidden state. The transformer drops that constraint entirely: every word looks at
              every other word <em>directly</em>, all at once, through a mechanism called{" "}
              <strong className="text-[color:var(--color-accent)]">attention</strong>. There is no
              running memory to fade and no forced left-to-right order. This section unpacks how
              that works: Query-Key-Value attention, multi-head attention running several
              comparisons in parallel, and the positional encoding that restores word order.
            </p>
          </div>

          {/* Full Architecture */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              Complete Transformer Architecture
            </h3>
            <TryIt>
              Hover over the blocks to see how data flows from input embeddings up through the
              attention and feed-forward layers. Don&apos;t worry about every box yet. The two ideas
              that make it all work, attention and positional encoding, are unpacked just below.
            </TryIt>
            <TransformerArchitectureViz />
          </div>

          {/* Query-Key-Value Mechanism */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              Query-Key-Value Attention Mechanism
            </h3>
            <p className="section-body mb-4 max-w-3xl">
              Picking up from embeddings: the <strong>Query</strong>, <strong>Key</strong>, and{" "}
              <strong>Value</strong> that each word emits are all computed from its embedding vector.
              Attention lets each word gather information from the others: a word&apos;s Query
              (&quot;what am I looking for?&quot;) is compared against every other word&apos;s Key
              (&quot;what do I offer?&quot;), and the closer the match, the more of that word&apos;s
              Value it pulls in. That&apos;s how &quot;it&quot; learns to look back at
              &quot;the animal.&quot;
            </p>
            <TryIt>
              Change the query word and watch which other words light up. The stronger the
              Query–Key match, the more of that word&apos;s Value gets mixed into the result.
            </TryIt>
            <QKVIntuitionBuilder />
          </div>

          {/* Multi-Head Attention */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              Multi-Head Attention
            </h3>
            <p className="section-body mb-4 max-w-3xl">
              One attention pattern can capture only one kind of relationship at a time. So
              transformers run several attention <strong>heads</strong> side by side, each with its
              own learned Query, Key, and Value transformations: one head might track
              who-did-what-to-whom, another which adjective modifies which noun, another long-range
              references like &quot;it.&quot; Their outputs are combined, so the model weighs several
              aspects of meaning at once. Because the heads are independent, they all run in
              parallel.
            </p>
          </div>

          {/* Positional Encoding */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              Positional Encoding
            </h3>
            <p className="section-body mb-4 max-w-3xl">
              Attention looks at all words simultaneously, which means that, unlike an RNN, it has
              no built-in sense of order. <strong>Positional encoding</strong> fixes that by adding a
              position-dependent pattern to each word&apos;s vector, so the model can tell
              &quot;dog bites man&quot; from &quot;man bites dog.&quot;
            </p>
            <TryIt>
              Watch how the encoding pattern shifts from one position to the next. Each position gets
              a unique fingerprint that the model can read off to recover word order.
            </TryIt>
            <PositionalEncodingVisualizer />
          </div>

          {/* Closing the loop on the language problem */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[color:var(--color-text-primary)] mb-4">
              Three Problems, Solved
            </h3>
            <p className="section-body mb-4 max-w-3xl">
              Look back at the three challenges from The Language Problem. The transformer answers
              each one directly:
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl">
              <div className="bg-[rgba(91,156,245,0.08)] border border-[rgba(91,156,245,0.3)] rounded-lg p-5">
                <div className="text-base font-semibold text-[color:var(--color-text-primary)] mb-2">
                  Memory
                </div>
                <p className="text-sm text-[color:var(--color-text-secondary)]">
                  Attention reaches any earlier word directly, no matter how far back it sits.
                  Nothing fades with distance: &quot;it&quot; can look straight at
                  &quot;the animal.&quot;
                </p>
              </div>
              <div className="bg-[rgba(125,163,198,0.08)] border border-[rgba(125,163,198,0.3)] rounded-lg p-5">
                <div className="text-base font-semibold text-[color:var(--color-text-primary)] mb-2">
                  Context
                </div>
                <p className="text-sm text-[color:var(--color-text-secondary)]">
                  Each word&apos;s vector is rebuilt as an attention-weighted mix of its neighbours,
                  so &quot;bank&quot; next to &quot;river&quot; ends up with a different vector than
                  &quot;bank&quot; next to &quot;deposited.&quot;
                </p>
              </div>
              <div className="bg-[rgba(255,200,87,0.08)] border border-[rgba(255,200,87,0.3)] rounded-lg p-5">
                <div className="text-base font-semibold text-[color:var(--color-text-primary)] mb-2">
                  Word Order
                </div>
                <p className="text-sm text-[color:var(--color-text-secondary)]">
                  Positional encoding stamps each vector with its place in the sentence, so
                  &quot;dog bites man&quot; and &quot;man bites dog&quot; stay distinct even though
                  all words are processed at once.
                </p>
              </div>
            </div>
          </div>

          <SectionTakeaway>
            A transformer embeds each word as a vector, adds positional information, and then uses
            Query-Key-Value attention so every word can draw on every other word in parallel,
            directly solving the memory, context, and order problems. Because all of this is matrix
            multiplication done at once, it&apos;s a perfect fit for the hardware we look at next.
          </SectionTakeaway>
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
              Everything we&apos;ve built (the forward pass, backprop, attention) is ultimately
              matrix multiplication repeated billions of times. GPUs (Graphics Processing Units) are
              what make that practical. Unlike CPUs, which excel at sequential tasks, GPUs perform
              thousands of operations in parallel, which is exactly the shape of the math in deep
              learning.
            </p>
          </div>

          <TryIt>
            In the benchmarks, switch between training and inference and step through the model
            sizes. Watch the gap between the CPU row and the GPU rows widen from &quot;slower&quot;
            to &quot;not practical at all.&quot;
          </TryIt>
          <GPUAccelerationSection />

          <SectionTakeaway>
            Transformers won partly because their math parallelizes cleanly onto GPUs, turning what
            would be impossibly slow training into something feasible. We now have all the pieces.
            Let&apos;s trace a single sentence end-to-end through a transformer.
          </SectionTakeaway>
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
              Time to put every piece together. This is a step-by-step walkthrough of how a
              transformer processes text, from tokenization through embeddings and attention to
              generating the next word, using exactly the concepts built up over the previous
              sections.
            </p>
          </div>

          <TryIt>
            Advance through the pipeline one stage at a time. At each step, connect it back to where
            you met it earlier: tokens become embedding vectors, positional encoding marks their
            order, attention mixes them together, and a final layer turns the result into a
            prediction for the next word.
          </TryIt>
          <TransformerPipelineSection />

          <SectionTakeaway>
            That&apos;s the whole arc: a model is a function with tunable parameters; a cost function
            scores it; gradient descent and backpropagation tune the parameters by following slopes
            downhill; non-linear activations let the network bend to fit complex data; and embeddings,
            attention, and positional encoding extend all of this to language, running fast on GPUs.
            Every large language model you&apos;ve used is built from these same foundations, scaled
            up.
          </SectionTakeaway>
        </div>
      </section>

    </ChapterLayout>
  );
}
