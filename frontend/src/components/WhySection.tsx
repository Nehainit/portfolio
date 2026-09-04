"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const reasons = [
  "4+ Years of Engineering Experience",
  "Minimal Handholding",
  "Fast Ramp-Up",
  "Comfortable With Ambiguity",
  "Production-First Thinking",
  "AI + Backend + Data",
  "Strong Fundamentals, Flexible Stack",
  "Independent + Collaborative",
  "Research-Driven Curiosity",
  "Value Over Implementation",
];

export default function WhySection() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 pb-12 pt-24 md:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <motion.h2
          className="mb-12 text-center text-3xl font-medium tracking-tight md:text-4xl"
          variants={fadeUp}
        >
          A Few Good Reasons to Hire Me
        </motion.h2>

        <motion.ol
          className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16"
          variants={staggerContainer}
        >
          {reasons.map((reason, index) => (
            <motion.li
              key={reason}
              className="flex items-baseline gap-5 border-t border-gray-200 py-5 last:border-b md:[&:nth-last-child(2)]:border-b"
              variants={fadeUp}
            >
              <span className="font-mono text-xs tracking-widest text-gray-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-base font-medium tracking-tight text-gray-800 md:text-lg">
                {reason}
              </span>
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>
    </section>
  );
}
