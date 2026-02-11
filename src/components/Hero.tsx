"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  staggerContainer,
  buttonVariants,
  logoReveal,
  scaleFadeUp,
} from "@/lib/animations";
import ScrollPrompt from "./ScrollPrompt";
import Toast from "./Toast";
import { RippleWord } from "./RippleText";

// Split text into words with ripple effect
function SplitTextWithRipple({ children }: { children: string }) {
  const words = children.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <RippleWord key={i} delay={0.2 + i * 0.05}>
          {word}
        </RippleWord>
      ))}
    </>
  );
}

export default function Hero() {
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("nehadubey1021@gmail.com");
      setCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setCopied(false);
      }, 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = "nehadubey1021@gmail.com";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Floating Animated Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large floating circle - top right */}
        <motion.div
          className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 opacity-60"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Medium circle - left side */}
        <motion.div
          className="absolute top-1/3 left-[5%] w-40 h-40 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 opacity-40"
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Small circle - bottom right */}
        <motion.div
          className="absolute bottom-1/4 right-[15%] w-24 h-24 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 opacity-30"
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Tiny floating dots */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-gray-400"
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-gray-500"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-[20%] w-4 h-4 rounded-full bg-gray-300"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating code bracket */}
        <motion.div
          className="absolute top-[15%] left-[15%] text-4xl text-gray-300 font-mono"
          animate={{
            y: [0, -10, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {"</>"}
        </motion.div>

        {/* Floating AI icon */}
        <motion.div
          className="absolute bottom-[20%] right-[8%] w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center shadow-lg"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07l-2.83 2.83m-8.48 8.48l-2.83 2.83m0-14.14l2.83 2.83m8.48 8.48l2.83 2.83" />
          </svg>
        </motion.div>

        {/* Floating Python icon */}
        <motion.div
          className="absolute top-[40%] right-[5%] w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center shadow-md"
          animate={{
            y: [0, 12, 0],
            x: [0, -5, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#374151">
            <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05z"/>
          </svg>
        </motion.div>

        {/* Floating data icon */}
        <motion.div
          className="absolute top-[25%] left-[8%] w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shadow-md"
          animate={{
            y: [0, -18, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        </motion.div>
      </div>

      {/* Header */}
      <motion.header
        className="flex justify-between items-center px-6 md:px-10 py-5"
        variants={scaleFadeUp}
      >
        <motion.a
          href="https://github.com/Nehainit"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-white hover:bg-gray-900 px-3 py-1.5 rounded-full transition-all duration-300"
          whileHover={{ scale: 0.95 }}
          whileTap={{ scale: 0.9 }}
        >
          GitHub
        </motion.a>
        <motion.button
          onClick={copyEmail}
          className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-full transition-all duration-300 ${
            copied
              ? "bg-gray-900 text-white"
              : "text-gray-500 hover:text-white hover:bg-gray-900"
          }`}
          whileHover={{ scale: 0.95 }}
          whileTap={{ scale: 0.9 }}
        >
          {copied ? "Copied!" : "Copy my email"}
          {copied ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </motion.button>
      </motion.header>

      {/* Main Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-10 py-12">
        {/* Main Headline - Dropped Animation */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center leading-[1.3] max-w-3xl mb-10">
          <SplitTextWithRipple>I&apos;m Neha, I bring products to life through AI and code</SplitTextWithRipple>
        </h1>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 mb-12"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5,
              },
            },
          }}
        >
          <motion.a
            href="mailto:nehadubey1021@gmail.com"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-black hover:shadow-lg"
            variants={buttonVariants}
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
          >
            Let&apos;s talk
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/nehadubey11/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-900 rounded-full text-sm font-medium border border-gray-200 transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-900"
            variants={buttonVariants}
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Connect on LinkedIn
          </motion.a>
        </motion.div>

        {/* Company Logos */}
        <motion.div
          className="flex items-center justify-center gap-8 md:gap-12 mb-12"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.7,
              },
            },
          }}
        >
          {["Cummins", "Infomo", "NIT Jalandhar"].map((company) => (
            <motion.span
              key={company}
              className="text-sm font-medium text-gray-400 cursor-default"
              variants={logoReveal}
              whileHover={{ scale: 0.95, color: "#1f2937" }}
            >
              {company}
            </motion.span>
          ))}
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          className="max-w-xl w-full bg-gray-50/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 md:p-8 cursor-default"
          variants={scaleFadeUp}
          transition={{ delay: 0.9 }}
          whileHover={{
            scale: 0.98,
            boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <p className="text-gray-600 text-sm md:text-base italic leading-relaxed mb-5">
            &ldquo;AI Engineer with 2+ years of experience building production-grade LLM
            applications, RAG systems, and intelligent automation pipelines. Skilled in
            Data Governance and certified SAFe 6 Practitioner.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-xs font-semibold">
              ND
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Neha Dubey</p>
              <p className="text-xs text-gray-500">AI Engineer</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Prompt */}
      <ScrollPrompt />

      {/* Toast Notification */}
      <Toast message="Copied to clipboard!" isVisible={showToast} />
    </motion.section>
  );
}
