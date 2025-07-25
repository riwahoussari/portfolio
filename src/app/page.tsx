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
import Cursor from "./components/Global/Cursor";
import { useRef } from "react";

const NoSSRInitialRevealAnim = dynamic(
  () => import("./components/Global/InitialRevealAnim"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <div className="relative w-full overflow-x-clip">
      {/* cursor */}
      <Cursor />

      <NoSSRInitialRevealAnim />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Adjectives />
        <Services />
        <Works />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
