"use client";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Adjectives from "./sections/Adjectives";
import Services from "./sections/Services";
import Works from "./sections/Works";
import Testimonials from "./sections/Testimonials";

import dynamic from "next/dynamic";
import useMousePosition from "./hooks/useMousePosition";
import {motion} from 'motion/react'

const NoSSRInitialRevealAnim = dynamic(
  () => import("./components/Global/InitialRevealAnim"),
  {
    ssr: false,
  }
);

export default function Home() {
  const { x, y } = useMousePosition();

  return (
    <>
      {/* cursor */}
      <motion.div
        className="absolute z-0  aspect-square w-6  rounded-full bg-white opacity-0 mix-blend-difference lg:opacity-100"
        animate={{
          top: y ,
          left: x ,
          translate: "-30px 30px",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.7 }}
      >
        
      </motion.div>

      <NoSSRInitialRevealAnim />
      <Hero />
      <About />
      <Adjectives />
      <Services />
      <Works />
      <Testimonials />
    </>
  );
}
