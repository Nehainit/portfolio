"use client";

import { motion } from "motion/react";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

export default function AboutSection() {
  return (
    <motion.section
      className="px-6 md:px-10 max-w-2xl mx-auto py-20 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <motion.p
        className="text-gray-600 leading-relaxed mb-6"
        variants={fadeUp}
      >
        I started as a Data Engineer, building real-time pipelines and analytics
        dashboards. But I&apos;ve always been fascinated by AI—now I&apos;m combining both
        worlds: building intelligent systems that not only process data but
        understand and act on it.
      </motion.p>

      <motion.p
        className="text-gray-600 leading-relaxed mb-8"
        variants={fadeUp}
      >
        AI gives you the chance to solve problems that seemed impossible before.
        That&apos;s why I build RAG systems, LLM applications, and intelligent
        automation—turning unstructured chaos into actionable insights.
      </motion.p>

      <motion.p
        className="text-sm text-gray-400 mb-4"
        variants={fadeUp}
      >
        The tools that help me do this:
      </motion.p>

      {/* Tool Icons */}
      <motion.div
        className="flex justify-center gap-4 mb-10"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {[
          { name: "Python", icon: <PythonIcon /> },
          { name: "LangChain", icon: <LangChainIcon /> },
          { name: "Claude/OpenAI", icon: <AIIcon /> },
          { name: "Docker", icon: <DockerIcon /> },
        ].map((tool) => (
          <motion.div
            key={tool.name}
            className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors cursor-default"
            variants={fadeUp}
            whileHover={{ scale: 1.1, y: -2 }}
            title={tool.name}
          >
            {tool.icon}
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="text-sm text-gray-400 mb-4"
        variants={fadeUp}
      >
        Those are my thoughts—curious to hear yours.
      </motion.p>

      <motion.p
        className="text-3xl text-gray-300 font-serif italic"
        variants={fadeUp}
      >
        Neha D.
      </motion.p>
    </motion.section>
  );
}

// Tool Icons
function PythonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
    </svg>
  );
}

function LangChainIcon() {
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

function AIIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07l-2.83 2.83m-8.48 8.48l-2.83 2.83m0-14.14l2.83 2.83m8.48 8.48l2.83 2.83" />
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 3v2h-2V3h2zm-4 0v2H7V3h2zm8 0v2h-2V3h2zM9 7v2H7V7h2zm4 0v2h-2V7h2zm4 0v2h-2V7h2zm4 2c0-1-.5-2-2-2v2H5V7c-1.5 0-2 1-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9zm-4-2v2h-2V7h2z" />
    </svg>
  );
}
