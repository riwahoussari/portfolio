import Hero from "./sections/Hero";
import About from "./sections/About";
import Adjectives from "./sections/Adjectives";
import Services from "./sections/Services";
import Works from "./sections/Works";

export default function Home() {

  return (
    <>
      <Hero />
      <About />
      <Adjectives />
      {/* <Services /> */}
      <Works />

      {/* <div className="h-dvh"></div> */}
      <div className="h-dvh bg-green-400 "></div>
    </>
  );
}
