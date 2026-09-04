"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function ScrollPrompt() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Continuous ripple effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRipples((prev) => [...prev, Date.now()]);
      // Clean up old ripples
      setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 2000);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const scrollToContent = () => {
    // Add burst of ripples on click
    const now = Date.now();
    setRipples((prev) => [...prev, now, now + 1, now + 2]);

    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Water surface container */}
          <div className="relative flex items-center justify-center">
            {/* Continuous ripple waves */}
            {ripples.map((id) => (
              <motion.span
                key={id}
                className="absolute rounded-full border border-gray-300/50"
                style={{ width: 56, height: 56 }}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            ))}

            {/* Ambient ripple rings - always animating */}
            <motion.span
              className="absolute rounded-full border border-gray-200/40"
              style={{ width: 56, height: 56 }}
              animate={{
                scale: [1, 1.8, 2.2],
                opacity: [0.4, 0.2, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.span
              className="absolute rounded-full border border-gray-200/30"
              style={{ width: 56, height: 56 }}
              animate={{
                scale: [1, 1.6, 2],
                opacity: [0.3, 0.15, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.8,
              }}
            />
            <motion.span
              className="absolute rounded-full border border-gray-200/20"
              style={{ width: 56, height: 56 }}
              animate={{
                scale: [1, 1.4, 1.8],
                opacity: [0.2, 0.1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1.6,
              }}
            />

            {/* Main circle button */}
            <motion.button
              className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border border-gray-200 backdrop-blur-sm cursor-pointer overflow-hidden transition-colors duration-300 hover:border-gray-800"
              onClick={scrollToContent}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{
                scale: isHovered ? 0.9 : 1,
                opacity: 1,
                backgroundColor: isHovered ? "#1f2937" : "rgba(255,255,255,0.9)",
                boxShadow: isHovered
                  ? "0 0 40px rgba(80, 80, 80, 0.25), 0 0 80px rgba(80, 80, 80, 0.1)"
                  : "0 4px 20px rgba(0, 0, 0, 0.06)",
              }}
              transition={{
                scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                backgroundColor: { duration: 0.3 },
                boxShadow: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Inner water ripple effect on hover */}
              <AnimatePresence>
                {isHovered && (
                  <>
                    <motion.span
                      className="absolute inset-0 rounded-full bg-gray-300/50"
                      initial={{ scale: 0, opacity: 0.8 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <motion.span
                      className="absolute inset-0 rounded-full bg-gray-300/40"
                      initial={{ scale: 0, opacity: 0.6 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Subtle inner glow */}
              <motion.div
                className="absolute inset-1 rounded-full bg-gradient-to-b from-white/80 to-transparent"
                animate={{
                  opacity: isHovered ? 0.6 : 0.3,
                }}
              />

              {/* Arrow container with ripple trail */}
              <motion.div
                className="relative z-10"
                animate={{
                  y: [0, 6, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Arrow ripple trail */}
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    opacity: [0, 0.3, 0],
                    y: [0, 8, 16],
                    scale: [1, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-300"
                  >
                    <path d="m19 12-7 7-7-7" />
                  </svg>
                </motion.span>

                {/* Second trail */}
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    opacity: [0, 0.2, 0],
                    y: [0, 12, 24],
                    scale: [1, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.2,
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-200"
                  >
                    <path d="m19 12-7 7-7-7" />
                  </svg>
                </motion.span>

                {/* Main arrow */}
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative z-10"
                  animate={{
                    color: isHovered ? "#ffffff" : "#4b5563",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M12 5v14" />
                  <path d="m19 12-7 7-7-7" />
                </motion.svg>
              </motion.div>
            </motion.button>

            {/* Outer hover ripples */}
            <AnimatePresence>
              {isHovered && (
                <>
                  <motion.span
                    className="absolute rounded-full border-2 border-gray-500/60"
                    style={{ width: 56, height: 56 }}
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                  <motion.span
                    className="absolute rounded-full border border-gray-400/40"
                    style={{ width: 56, height: 56 }}
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                  />
                  <motion.span
                    className="absolute rounded-full border border-gray-300/30"
                    style={{ width: 56, height: 56 }}
                    initial={{ scale: 1, opacity: 0.4 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                  />
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Scroll text */}
          <motion.span
            className="block text-center text-xs text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.8 : 0.4 }}
            transition={{ duration: 0.3 }}
          >
            Scroll down
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
