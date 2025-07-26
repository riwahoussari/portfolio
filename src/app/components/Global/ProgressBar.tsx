"use client"
import { useScroll, useTransform, motion } from "motion/react";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <motion.div
      style={{ width }}
      className="fixed top-0 z-1000000 h-1 w-full bg-white mix-blend-difference"
    />
  );
}