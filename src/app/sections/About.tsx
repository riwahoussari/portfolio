"use client";
import {
  MotionValue,
  useScroll,
  useTransform,
  motion,
  useInView,
  useMotionValueEvent,
} from "motion/react";
import { useRef, useState } from "react";

const getAge = () => {
  const birthDate = new Date("2007-09-17");
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) age--;

  return age;
};

const words =
  `I'm Riwa — a ${getAge()}-years-young web designer and full-stack developer from Lebanon. I'm the new kid on the block, but my work and skills already speak for themselves. I fell in love with coding the moment I realized I could bring ideas to life with just a keyboard and some caffeine. What started as curiosity quickly became obsession — and now, I spend most of my time building clean interfaces and stressing over pixels most people will never notice (- ‿◦ )`.split(
    " "
  );

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress: sectionSroll } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.15"],
  });

  const isSectionInView = useInView(sectionRef, {
    once: true,
  });

  const [transitionComplete, setTransitionComplete] = useState(false);
  useMotionValueEvent(sectionSroll, "change", (v) => {
    if (v >= 1) setTransitionComplete(true);
  });

  return (
    <section ref={sectionRef} className="grid-system mb-40 mt-96">
      <h2 className="h2-light col-span-2 mb-6">
        <span className="inline-block overflow-y-hidden">
          {"About".split("").map((letter, i) => (
            <motion.span
              initial={{ y: "90%", rotateX: "180deg" }}
              animate={
                isSectionInView
                  ? { y: "0%", rotateX: "0deg" }
                  : { y: "90%", rotateX: "180deg" }
              }
              transition={{ duration: 0.5, ease: "easeInOut", delay: i * 0.05 }}
              key={i}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      </h2>
      <p className="h2-regular col-span-4 flex flex-wrap whitespace-pre md:col-span-6 md:col-start-3 xl:col-span-8 xl:col-start-5">
        {words.map((word, i) => (
          <>
            <Word
              index={i}
              key={i}
              start={i / words.length}
              end={(i + 1) / words.length}
              scrollProgress={sectionSroll}
              transitionComplete={transitionComplete}
            >
              {word}
            </Word>
            <span key={`space-${i}`} className="whitespace-pre">
              {" "}
            </span>
          </>
        ))}
        {/* <span className="whitespace-nowrap"> </span> */}
      </p>
    </section>
  );
}

function Word({
  children,
  start,
  end,
  scrollProgress,
  transitionComplete,
  index,
}: {
  children: string;
  start: number;
  end: number;
  scrollProgress: MotionValue<number>;
  transitionComplete: boolean;
  index: number;
}) {
  const spanRef = useRef(null);
  const isInView = useInView(spanRef, {
    once: false,
  });
  // const opacity = useTransform(scrollProgress, [start, end], [0.3, 1]);
  return (
    <motion.span
      ref={spanRef}
      initial={{ opacity: transitionComplete ? 1 : 0.0 }}
      animate={{ opacity: transitionComplete ? 1 : isInView ? 1 : 0.0 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
        delay: 0.15 + index * 0.015,
      }}
      className="whitespace-nowrap"
    >
      {children}
    </motion.span>
  );
}
