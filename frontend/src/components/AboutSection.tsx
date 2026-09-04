"use client";

import { motion } from "motion/react";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

const techTools = [
  "Python",
  "SQL",
  "LangChain",
  "Claude / OpenAI",
  "FastAPI",
  "Databricks",
  "Docker",
  "Kafka",
];

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      className="px-6 md:px-10 max-w-3xl mx-auto py-24"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-medium tracking-tight mb-10"
        variants={fadeUp}
      >
        About Me
      </motion.h2>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <motion.p variants={fadeUp}>
          I&apos;m an <strong className="font-semibold text-gray-900">AI Engineer</strong> with
          <strong className="font-semibold text-gray-900"> nearly 4 years</strong> of experience
          building <strong className="font-semibold text-gray-900">production systems</strong>{" "}
          across startups and large enterprises. I work at the intersection of
          <strong className="font-semibold text-gray-900"> AI, backend engineering, data, and automation</strong>,
          and I&apos;m most useful when the problem is complex, ambiguous, or still taking shape.
        </motion.p>

        <motion.p variants={fadeUp}>
          I don&apos;t need much handholding. Give me the context, the constraints, and
          the outcome you&apos;re trying to achieve, and I can usually take it from there.
          I learn unfamiliar systems quickly, ask the right questions early, and work
          comfortably both independently and within engineering teams.
        </motion.p>

        <motion.p variants={fadeUp}>
          I&apos;ve worked on systems involving <strong className="font-semibold text-gray-900">LLMs, RAG, AI agents,
          OCR and document intelligence, voice AI, and machine learning</strong>, APIs, databases,
          integrations, and data pipelines. But I don&apos;t like defining myself by a fixed stack.
          Technologies change quickly. Strong fundamentals, clear thinking, and the
          ability to learn are far more durable.
        </motion.p>

        <motion.p variants={fadeUp}>
          Production engineering also means thinking beyond whether the code runs. I
          pay attention to <strong className="font-semibold text-gray-900">security, data privacy, compliance,
          auditability, reliability, and architecture</strong>, especially when building systems
          that handle sensitive or business-critical data.
        </motion.p>

        <motion.p variants={fadeUp}>
          Curiosity drives a lot of my work. I enjoy reading research papers, digging
          below library abstractions, experimenting with new approaches, and
          understanding why a system works instead of only learning how to use it.
        </motion.p>

        <motion.p variants={fadeUp}>
          My long-term goal is simple: expand the surface area of what I can understand
          and build. I care more about becoming a stronger engineer and creating
          meaningful value than chasing a particular title or technology.
        </motion.p>

        <motion.p variants={fadeUp}>
          And if you&apos;re working on something technically ambitious, slightly unusual,
          or genuinely difficult to build, I&apos;d love to hear about it.
        </motion.p>

        <motion.p variants={fadeUp}>
          I&apos;m also working toward contributing more to <strong className="font-semibold text-gray-900">open source</strong>. It&apos;s outside my
          current comfort zone, which is exactly why I want to go there.
        </motion.p>
      </div>
    </motion.section>
  );
}

export function TechnicalArsenal() {
  return (
    <section className="overflow-hidden border-y border-gray-100 py-4" aria-label="Technical Arsenal">
      <p className="mb-3 text-center text-sm text-gray-400">Technical Arsenal</p>
      <div className="animate-tech-marquee flex w-max gap-4">
        {[...techTools, ...techTools].map((tool, index) => (
          <div
            key={`${tool}-${index}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900"
            title={tool}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
            {tool}
          </div>
        ))}
      </div>
    </section>
  );
}
