"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "motion/react";

export default function InitialRevealAnim({
  revealAnimEnded,
  setRevealAnimEnded,
}: {
  revealAnimEnded: number;
  setRevealAnimEnded: Dispatch<SetStateAction<number>>;
}) {
  let vh = 0;
  let vw = 0;
  if (typeof window !== "undefined") {
    vw = window.innerWidth;
    vh = window.innerHeight;
  }
  const [introAnimEnded, setIntroAnimEnded] = useState(false);

  return (
    <>
      {revealAnimEnded !== 3 && (
        <motion.div
          initial={{
            clipPath: `path("M0 0 L0 ${vh + 0.3 * vw} Q${vw / 2} ${vh - 0.1 * vw} ${vw} ${vh + 0.3 * vw} L${vw} 0 Z")`,
          }}
          animate={
            introAnimEnded
              ? {
                  clipPath: `path("M0 0 L0 0 Q${vw / 2} 0 ${vw} 0 L${vw} 0 Z")`,
                }
              : {
                  clipPath: `path("M0 0 L0 ${vh + 0.3 * vw} Q${vw / 2} ${vh - 0.1 * vw} ${vw} ${vh + 0.3 * vw} L${vw} 0 Z")`,
                }
          }
          onAnimationStart={() =>
            setRevealAnimEnded((prev) => (prev === 1 ? 2 : prev))
          }
          onAnimationComplete={() => setRevealAnimEnded((prev) => prev + 1)}
          className="z-2000 bg-foreground text-background fixed bottom-0 top-0 w-full"
        >
          {/* RIWA HOUSSARI */}
          <p className="display-1 -translate-1/2 absolute left-1/2 top-1/2 flex select-none flex-col font-semibold">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: [0, 0.75, 10], y: ["0vh", "0vh", "-50vh"] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                type: "keyframes",
              }}
              className="origin-bottom"
            >
              RIWA
            </motion.span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: [0, 0.75, 10], y: ["0vh", "0vh", "50vh"] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                type: "keyframes",
                delay: 0.25,
              }}
              className="origin-top whitespace-pre"
              onAnimationComplete={() => setIntroAnimEnded(true)}
            >
              HOUSSARI
            </motion.span>
          </p>
          {/* DESIGNER& DEVELOPER */}
          <p className="display-1 -translate-1/2 absolute left-1/2 top-1/2 flex select-none flex-col font-semibold">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: [0, 0.75, 10], y: ["0vh", "0vh", "-50vh"] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                type: "keyframes",
                delay: 1.5,
              }}
              className="origin-bottom"
            >
              DESIGNER&
            </motion.span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: [0, 0.75, 10], y: ["0vh", "0vh", "50vh"] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                type: "keyframes",
                delay: 1.75,
              }}
              className="origin-top whitespace-pre"
            >
              DEVELOPER
            </motion.span>
          </p>
        </motion.div>
      )}
    </>
  );
}
