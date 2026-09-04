"use client";

import { motion } from "motion/react";
import { fadeUp, viewportOnce } from "@/lib/animations";

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="mx-auto max-w-4xl px-6 pb-16 md:px-10">
      <motion.div
        className="relative rounded-[2rem] border border-gray-200 bg-gray-50 px-5 py-6 md:px-10 md:py-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUp}>
          <p className="font-semibold text-gray-900">Vignesh S.</p>
          <p className="mt-2 text-lg tracking-[0.15em] text-gray-400" aria-label="5 out of 5 stars">
            <span aria-hidden="true">★★★★★</span>
          </p>
        </motion.div>

        <motion.blockquote
          className="mx-auto mt-5 max-w-3xl text-center text-lg font-medium leading-relaxed tracking-tight text-gray-900 md:text-xl"
          variants={fadeUp}
        >
          &ldquo;Neha is a skilled AI Engineer who understands both AI implementation and
          the data infrastructure needed to make systems reliable at scale. She is
          professional, technically strong, and delivers clean, production-ready
          solutions with clear communication throughout the project.&rdquo;
        </motion.blockquote>

        <motion.footer className="mt-5 flex items-center justify-center gap-3 text-sm text-gray-500" variants={fadeUp}>
          <span>May 2026</span>
          <span aria-hidden="true" className="text-gray-300">·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400 text-[10px]">
              ✓
            </span>
            Verified
          </span>
        </motion.footer>

        <div
          aria-hidden="true"
          className="absolute -bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 rotate-45 border-b border-r border-gray-200 bg-gray-50"
        />
      </motion.div>
    </section>
  );
}
