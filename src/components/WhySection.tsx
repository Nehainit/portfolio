"use client";

import { motion } from "motion/react";
import SectionDivider from "./SectionDivider";
import {
  staggerContainer,
  fadeUp,
  scaleFadeUp,
  viewportOnce,
  easeOutExpo,
} from "@/lib/animations";

export default function WhySection() {
  return (
    <section className="px-6 md:px-10 max-w-6xl mx-auto pb-20">
      <SectionDivider title="Why work with me?" />

      {/* Main Headline */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-medium mb-3"
          variants={fadeUp}
        >
          I build, deploy, and ship—<span className="italic font-serif">fast.</span>
        </motion.h2>
        <motion.p className="text-gray-500" variants={fadeUp}>
          From data pipelines to LLM applications. End-to-end AI solutions.
        </motion.p>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        }}
      >
        {/* Stats Card */}
        <motion.div
          className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-3xl p-8 text-white cursor-default"
          variants={scaleFadeUp}
          whileHover={{ scale: 0.97, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.span
            className="text-7xl md:text-8xl font-bold block"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeOutExpo }}
          >
            8+
          </motion.span>
          <span className="text-white/90">AI Projects Shipped</span>
        </motion.div>

        {/* Skills Card */}
        <motion.div
          className="bg-gray-50 border border-gray-100 rounded-3xl p-8 cursor-default transition-colors duration-300 hover:bg-gray-900 group"
          variants={scaleFadeUp}
          whileHover={{ scale: 0.97, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
        >
          <span className="text-sm text-gray-400 mb-4 block transition-colors duration-300 group-hover:text-gray-500">What I bring:</span>
          <ul className="space-y-3">
            {[
              { icon: <LayersIcon />, label: "LLM & RAG Systems" },
              { icon: <DatabaseIcon />, label: "Data Engineering" },
              { icon: <MonitorIcon />, label: "Full-Stack AI Apps" },
            ].map((item, i) => (
              <motion.li
                key={item.label}
                className="flex items-center gap-3 text-gray-800 transition-colors duration-300 group-hover:text-white"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <span className="text-gray-400 transition-colors duration-300 group-hover:text-gray-500">{item.icon}</span>
                {item.label}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Animation Card */}
        <motion.div
          className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-center cursor-default"
          variants={scaleFadeUp}
          whileHover={{ scale: 0.97, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
        >
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            I turn complex data into
            <br />
            intelligent solutions.
          </p>
          <div className="flex items-center gap-4">
            <motion.span
              className="text-2xl font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Data
            </motion.span>
            <motion.span
              className="text-gray-500"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
            <motion.span
              className="text-2xl font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              AI
            </motion.span>
            <motion.span
              className="text-gray-500"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            >
              →
            </motion.span>
            <motion.span
              className="text-2xl font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
              Impact
            </motion.span>
          </div>
        </motion.div>

        {/* Experience Cards Row */}
        <motion.div
          className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={scaleFadeUp}
        >
          {/* Freelance Experience */}
          <motion.div
            className="bg-gray-50 border border-gray-100 rounded-3xl p-8 cursor-default transition-all duration-300 hover:bg-gray-900 group"
            whileHover={{
              scale: 0.98,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                AI
              </div>
              <div>
                <span className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-white block">AI Engineer (Freelance)</span>
                <span className="text-xs text-gray-400 transition-colors duration-300 group-hover:text-gray-500">2 months | Remote</span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-300 text-sm">
              &ldquo;Developed Loan Against Property module and Cash Flow RAG system
              using Langflow and OpenAI. Built LLM orchestration pipelines and
              AI-driven business workflows.&rdquo;
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Langflow", "OpenAI"].map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full transition-colors duration-300 group-hover:bg-gray-700 group-hover:text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Cummins Experience */}
          <motion.div
            className="bg-gray-50 border border-gray-100 rounded-3xl p-8 cursor-default transition-all duration-300 hover:bg-gray-900 group"
            whileHover={{
              scale: 0.98,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                C
              </div>
              <div>
                <span className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-white block">Cummins Inc.</span>
                <span className="text-xs text-gray-400 transition-colors duration-300 group-hover:text-gray-500">Associate Data Engineer</span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-300 text-sm">
              &ldquo;Built robust Databricks workflows for big data processing, reducing
              data latency and improving pipeline reliability. Managed Oracle to data
              lake migration with ETL pipelines using SSIS.&rdquo;
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Databricks", "SSIS", "Oracle", "ETL"].map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full transition-colors duration-300 group-hover:bg-gray-700 group-hover:text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Values Row */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {[
          {
            icon: <LayersIcon />,
            text: "production-ready",
            suffix: "AI systems",
          },
          {
            icon: <BoltIcon />,
            text: "fast execution",
            suffix: "over perfection",
          },
          {
            icon: <SmileIcon />,
            text: "learning whatever",
            suffix: "it takes to ship",
          },
        ].map((value, i) => (
          <motion.div key={i} className="text-center" variants={fadeUp}>
            <motion.div
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500 transition-all duration-300 hover:bg-gray-900 hover:text-white cursor-default"
              whileHover={{ scale: 0.9 }}
            >
              {value.icon}
            </motion.div>
            <p className="text-gray-500">
              I believe in <strong className="text-gray-900">{value.text}</strong>
              <br />
              {value.suffix}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// Icons
function LayersIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function SmileIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}
