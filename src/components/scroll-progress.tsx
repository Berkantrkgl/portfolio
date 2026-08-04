"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Fixed 2px bar at the very top, tracking page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 320,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div className="fixed inset-x-0 top-0 z-60 h-0.5">
      <motion.div className="h-full origin-left bg-accent" style={{ scaleX }} />
    </div>
  );
}
