"use client";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Adjectives from "./sections/Adjectives";
import Services from "./sections/Services";
import Works from "./sections/Works";
import Testimonials from "./sections/Testimonials";

import dynamic from "next/dynamic";
import useMousePosition from "./hooks/useMousePosition";
import { motion } from "motion/react";
import { useHover } from "./hooks/HoverContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const NoSSRInitialRevealAnim = dynamic(
  () => import("./components/Global/InitialRevealAnim"),
  {
    ssr: false,
  }
);

export default function Home() {
  const { x, y } = useMousePosition();
  const { isHovering } = useHover();

  return (
    <div className="relative w-full overflow-x-clip">
      {/* cursor */}
      <motion.div
        className="z-1000 absolute aspect-square w-4 rounded-full bg-white opacity-0 mix-blend-difference lg:opacity-100"
        animate={{
          top: y,
          left: x,
          translate: isHovering ? "30px 0px" : "30px 30px",
          scale: isHovering ? 1.2 : 1,
          backgroundColor: isHovering ? "#fd2c2a" : "#ffffff",
        }}
        style={
          isHovering
            ? { mixBlendMode: "normal" }
            : { mixBlendMode: "difference" }
        }
        transition={{ type: "tween", ease: "backOut", duration: 0.7 }}
      ></motion.div>

      <NoSSRInitialRevealAnim />
      <Navbar />
      <main>
        {/* <Hero />
        <About />
        <Adjectives />
        <Services />
        <Works /> */}
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
