"use client";

import { useTransform, motion, useScroll } from "motion/react";
import { useRef } from "react";

export default function Adjectives() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const position = useTransform(scrollYProgress, [0, 1], ["0vw", "50vw"]);
  const parallax = useTransform(scrollYProgress, [0, 0.5], ["0vh", "-50vh"]);

  return (
    <section ref={sectionRef} className=" relative h-[300vh] ">
      <div className="sticky z-1 overflow-hidden top-0 h-dvh display-1 py-20 mix-blend-difference flex flex-col justify-evenly">
        <div className="relative">
          <motion.p
            style={{ left: position }}
            className="absolute text-white mix-blend-difference"
          >
            CREATIVE
          </motion.p>
          <p className="opacity-0" aria-hidden>
            CREATIVE
          </p>
        </div>
        <div className="relative">
          <motion.p
            style={{ right: position }}
            className="absolute text-white mix-blend-difference"
          >
            POLISHED
          </motion.p>
          <p className="opacity-0" aria-hidden>
            POLISHED
          </p>
        </div>
        <div className="relative">
          <motion.p
            style={{ left: position }}
            className="absolute text-white mix-blend-difference"
          >
            DYNAMIC
          </motion.p>
          <p className="opacity-0" aria-hidden>
            DYNAMIC
          </p>
        </div>
      </div>

      <motion.div
        style={{ translateY: parallax }}
        className="h-[200vh] bg-foreground"
      ></motion.div>
    </section>
  );
}
