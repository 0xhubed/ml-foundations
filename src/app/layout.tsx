import type { Metadata } from "next";
import {
  Inter,
  Space_Grotesk,
  Fira_Code,
} from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Machine Learning Foundations: From Linear Regression to Transformers",
  description:
    "An interactive walkthrough of machine learning fundamentals: linear regression, cost functions, gradient descent, derivatives, backpropagation, activation functions, RNNs, the language problem, and transformer architecture. By Daniel Huber.",
  openGraph: {
    title: "Machine Learning Foundations: From Linear Regression to Transformers",
    description:
      "Interactive demos covering gradient descent, backpropagation, attention mechanisms, and transformer architecture - from first principles to modern deep learning.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Machine Learning Foundations: From Linear Regression to Transformers",
    description:
      "Interactive machine learning foundations: gradient descent, neural networks, and transformers explained visually. By Daniel Huber.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" className="bg-[color:var(--color-bg-primary)]">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${firaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
