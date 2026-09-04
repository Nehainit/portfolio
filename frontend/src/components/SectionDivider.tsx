"use client";

import { motion } from "motion/react";
import { fadeUp, viewportOnce } from "@/lib/animations";

interface SectionDividerProps {
  title: string;
}

export default function SectionDivider({ title }: SectionDividerProps) {
  return (
    <motion.div
      className="relative py-16 md:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {/* Line */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Title */}
      <motion.span
        className="relative bg-white px-6 text-sm text-gray-400 left-1/2 -translate-x-1/2 inline-block"
        variants={fadeUp}
      >
        {title}
      </motion.span>
    </motion.div>
  );
}
