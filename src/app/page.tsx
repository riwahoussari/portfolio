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

const NoSSRInitialRevealAnim = dynamic(
  () => import("./components/Global/InitialRevealAnim"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [mediaLoaded, setMediaLoaded] = useState([false, false, false]);
  const [revealAnimEnded, setRevealAnimEnded] = useState(0);

  return (
    <div className="relative w-full overflow-x-clip">
      {/* preloader */}
      <NoSSRInitialRevealAnim
        revealAnimEnded={revealAnimEnded}
        setRevealAnimEnded={setRevealAnimEnded}
        mediaLoaded={mediaLoaded}
      />

      {/* cursor */}
      <Cursor mediaLoaded={mediaLoaded} />

      <Navbar />

      <main>
        <Hero revealAnimEnded={revealAnimEnded} />
        <About />
        <Adjectives />
        <Services />
        <Works setMediaLoaded={setMediaLoaded} />
        <Testimonials />
      </main>
      <Footer setMediaLoaded={setMediaLoaded} />
    </div>
  );
}
