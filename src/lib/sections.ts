export type ChapterId = "neural";

export type ChapterSectionDefinition = {
  id: string;
  title: string;
  description: string;
  isAdditionalResource?: boolean;
};

export type NotebookInfo = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  previewHref: string;
  downloadHref: string;
};

export type StudioInfo = {
  label: string;
  description: string;
  href: string;
};

export type ChapterDefinition = {
  id: ChapterId;
  order: number;
  icon?: string;
  title: string;
  tagline: string;
  teaser: string;
  summary: string;
  chapterHref: string;
  notebooks: NotebookInfo[];
  sections: ChapterSectionDefinition[];
  presenters: string[];
  studio?: StudioInfo;
  estimatedMinutes?: number;
  prerequisites?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  learningOutcomes?: string[];
};

export const chapters: ChapterDefinition[] = [
  {
    id: "neural",
    order: 0,
    icon: "neural",
    title: "Machine Learning Foundations",
    tagline: "An interactive walkthrough from linear regression to transformers.",
    teaser:
      "Build intuition for how modern AI works: how models learn through gradient descent, how backpropagation computes the updates, and how transformers process language.",
    summary:
      "The essential foundations of machine learning - from linear regression and gradient descent to backpropagation, RNNs, and the transformer architecture behind modern language models.",
    chapterHref: "/",
    presenters: ["Daniel Huber"],
    estimatedMinutes: 30,
    prerequisites: "None",
    difficulty: "beginner",
    learningOutcomes: [
      "Understand how models optimize their parameters with gradient descent",
      "See how backpropagation computes gradients through a network",
      "Grasp how transformers enable reasoning through attention mechanisms",
    ],
    notebooks: [],
    sections: [
      {
        id: "linear-regression",
        title: "Linear Regression & Cost Function",
        description: "The simplest model - predicting output as a linear function of input - and how the cost function measures error.",
      },
      {
        id: "gradient-descent",
        title: "Gradient Descent",
        description: "How models learn by following the slope downhill on the cost landscape to find the lowest point.",
      },
      {
        id: "derivatives",
        title: "Understanding Derivatives",
        description: "How derivatives measure change in 1D and multi-dimensional settings - the math behind gradient descent.",
      },
      {
        id: "distributed-representations",
        title: "Why Gradient Descent Hides How Models Think",
        description: "How coupled parameter updates create powerful but opaque, hard-to-interpret models.",
      },
      {
        id: "backpropagation",
        title: "Backpropagation",
        description: "The chain-rule algorithm that propagates error backward to compute gradients efficiently.",
      },
      {
        id: "activation-functions",
        title: "Activation Functions",
        description: "Why non-linearity (ReLU, sigmoid) is what stops a deep network from collapsing into a single linear layer.",
      },
      {
        id: "when-linearity-fails",
        title: "When Linearity Fails",
        description: "Where linear models break down and why neural networks are needed to capture non-linear patterns.",
      },
      {
        id: "rnn-architecture",
        title: "RNN Architecture",
        description: "Pre-transformer sequence models: how RNNs process sequences and why they struggle to scale.",
      },
      {
        id: "language-problem",
        title: "The Language Problem",
        description: "Why language understanding is uniquely challenging for simple feed-forward networks.",
      },
      {
        id: "transformer-architecture",
        title: "Transformer Architecture Details",
        description: "Query-Key-Value attention, positional encoding, and multi-head attention explained.",
      },
      {
        id: "gpu-acceleration",
        title: "GPU Acceleration",
        description: "Why parallel matrix operations on GPUs are essential for training modern neural networks.",
      },
      {
        id: "transformer-pipeline",
        title: "The Transformer Pipeline",
        description: "A step-by-step walkthrough of how transformers process text, from tokenization through embeddings, attention, and output.",
      },
    ],
  },
];

export const agenda = chapters;

export function getChapterDefinition(id: ChapterId): ChapterDefinition {
  const chapter = chapters.find((entry) => entry.id === id);
  if (!chapter) {
    throw new Error(`Unknown chapter id: ${id}`);
  }
  return chapter;
}
