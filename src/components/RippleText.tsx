"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RippleTextProps {
  children: string;
  className?: string;
}

export default function RippleText({ children, className = "" }: RippleTextProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const rippleIdRef = useRef(0);

  const createRipple = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      id: rippleIdRef.current++,
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      // Create ripple occasionally while moving (throttled)
      if (Math.random() > 0.85) {
        createRipple(e);
      }
    },
    [createRipple]
  );

  return (
    <motion.span
      ref={containerRef}
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={(e) => {
        setIsHovered(true);
        createRipple(e);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={createRipple}
      animate={{
        scale: isHovered ? 0.97 : 1,
      }}
      transition={{
        scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Ripple container */}
      <span className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full bg-gray-400/20 pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 10,
                height: 10,
                marginLeft: -5,
                marginTop: -5,
              }}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 20, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </span>

      {/* Hover glow effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-gray-200/0 via-gray-200/30 to-gray-200/0 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Text content */}
      <span className="relative z-10">{children}</span>
    </motion.span>
  );
}

// Individual word with dropped animation
export function RippleWord({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <motion.span
      className="relative inline-block mr-[0.3em] cursor-default"
      initial={{
        opacity: 0,
        y: -40,
        filter: "blur(8px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
        y: {
          type: "spring",
          damping: 15,
          stiffness: 100,
          delay,
        },
      }}
      whileHover={{
        scale: 0.97,
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {children}
    </motion.span>
  );
}
