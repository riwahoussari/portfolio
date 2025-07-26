"use client";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Adjectives from "./sections/Adjectives";
import Services from "./sections/Services";
import Works from "./sections/Works";
import Testimonials from "./sections/Testimonials";

import dynamic from "next/dynamic";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Cursor from "./components/Global/Cursor";
import { useState } from "react";
import ProgressBar from "./components/Global/ProgressBar";

const NoSSRInitialRevealAnim = dynamic(
  () => import("./components/Global/InitialRevealAnim"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [revealAnimEnded, setRevealAnimEnded] = useState(0);

  return (
    <div className="relative w-full overflow-x-clip">
      {/* preloader */}
      <NoSSRInitialRevealAnim
        revealAnimEnded={revealAnimEnded}
        setRevealAnimEnded={setRevealAnimEnded}
      />

      {/* cursor */}
      <Cursor revealAnimEnded={revealAnimEnded} />
      <ProgressBar />

      <Navbar />

      <main>
        <Hero revealAnimEnded={revealAnimEnded} />
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

