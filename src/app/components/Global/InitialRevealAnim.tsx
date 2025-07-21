"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function InitialRevealAnim() {
  let vh = 0;
  let vw = 0;
  if (typeof window !== "undefined") {
    vw = window.innerWidth;
    vh = window.innerHeight;
  }
  const [revealAnimEnded, setRevealAnimEnded] = useState(false);
  return (
    <>
      {!revealAnimEnded && (
        <svg
          className="z-2000 fixed top-0 h-[calc(100vh+30vw)] w-full border border-green-400"
          fill="var(--color-foreground)"
        >
          <motion.path
            initial={{
              d: `M0 0 L0 ${vh + 0.3 * vw} Q${vw / 2} ${vh - 0.1 * vw} ${vw} ${vh + 0.3 * vw} L${vw} 0 Z`,
            }}
            animate={{
              d: `M0 0 L0 0 Q${vw / 2} 0 ${vw} 0 L${vw} 0 Z`,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            onAnimationComplete={() => setRevealAnimEnded(true)}
          />
        </svg>
      )}
    </>
  );
}
