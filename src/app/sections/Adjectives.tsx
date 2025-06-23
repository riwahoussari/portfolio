"use client";

import { useTransform, motion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function Adjectives() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const mediaQuery1 = window.matchMedia("(max-width: 450px)");
    setIsMobile(mediaQuery1.matches);

    const mediaQuery2 = window.matchMedia("(max-width: 768px)");
    setIsTablet(mediaQuery2.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery1.addEventListener("change", handler);
    mediaQuery2.addEventListener("change", handler);

    return () => {
      mediaQuery1.removeEventListener("change", handler)
      mediaQuery2.removeEventListener("change", handler)
    };
  }, []);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const position = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["-50vw", "50vw"] : ["0vw", "50vw"]
  );
  const parallax = useTransform(
    scrollYProgress,
    [0, 1],
    isTablet ? ["0vh", "-40vh"] : ["0vh", "-60vh"]
  );

  return (
    <section ref={sectionRef} className="relative  h-[200vh] md:h-[300vh]">
      <div className="z-1 display-1 text-[max(77px,12vw)]! max-2xs:text-[18vw]! sticky top-0 flex h-dvh flex-col justify-evenly overflow-hidden py-20 text-foreground">
        <div className="relative">
          <motion.p
            style={{ left: position }}
            className="absolute  "
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
            className="absolute "
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
            className="absolute "
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
        className="bg-red-500 h-[100vh] sm:h-[133vh] md:h-[200vh]"
      ></motion.div>
    </section>
  );
}
