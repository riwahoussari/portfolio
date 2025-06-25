import Hero from "./sections/Hero";
import About from "./sections/About";
import Adjectives from "./sections/Adjectives";
import Services from "./sections/Services";
import Works from "./sections/Works";
import Testimonials from "./sections/Testimonials";

export default function Home() {

  return (
    <>
      <Hero />
      <About />
      <Adjectives />
      <Services />
      <Works />
      <Testimonials />

      {/* <div className="h-dvh bg-green-400"></div> */}
      {/* <div className="h-dvh bg-purple-400"></div> */}
    </>
  );
}
