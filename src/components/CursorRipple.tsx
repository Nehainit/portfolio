"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PopEffect {
  id: number;
  x: number;
  y: number;
}

export default function CursorRipple() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [pops, setPops] = useState<PopEffect[]>([]);
  const popIdRef = useRef(0);
  const lastPopTime = useRef(0);

  const createPop = useCallback((x: number, y: number) => {
    const now = Date.now();
    // Throttle pops - create one every 80ms while moving
    if (now - lastPopTime.current < 80) return;
    lastPopTime.current = now;

    const newPop: PopEffect = {
      id: popIdRef.current++,
      x,
      y,
    };

    setPops((prev) => [...prev.slice(-10), newPop]);

    // Remove pop after animation
    setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== newPop.id));
    }, 600);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      createPop(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [createPop]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Pop-up effects */}
      <AnimatePresence>
        {pops.map((pop) => (
          <motion.div
            key={pop.id}
            className="absolute rounded-full border border-gray-400/30 pointer-events-none"
            style={{
              left: pop.x,
              top: pop.y,
              width: 8,
              height: 8,
              marginLeft: -4,
              marginTop: -4,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Circle around cursor */}
      <motion.div
        className="absolute rounded-full border border-gray-400/50 pointer-events-none"
        style={{
          width: 36,
          height: 36,
        }}
        animate={{
          left: mousePos.x - 18,
          top: mousePos.y - 18,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 400, mass: 0.3 }}
      />
    </div>
  );
}
