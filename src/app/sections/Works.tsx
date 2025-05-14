"use client";
import { useScroll, useTransform, motion, useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";

export default function Works() {
  const video1Ref = useRef(null);
  const { scrollYProgress: video1Scroll } = useScroll({
    target: video1Ref,
    offset: ["-100vh start", "start start"],
  });

  const { scrollYProgress: video1Scroll2 } = useScroll({
    target: video1Ref,
    offset: ["end 500vh", "end 400vh"],
  });

  // Scale down from 1 to 0.65
  const scaleDown = useTransform(video1Scroll, [0, 1], [1, 0.65]);
  // Scale up back from 0.65 to 1
  const scaleUp = useTransform(video1Scroll2, [0, 1], [0.65, 1]);

  // Final scale to apply to the element
  const finalScale = useMotionValue(1);

  // Update final scale based on the two transforms
  useEffect(() => {
    const unsubscribe1 = scaleDown.on("change", (v) => finalScale.set(v));
    const unsubscribe2 = scaleUp.on("change", (v) => finalScale.set(v));
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [scaleDown, scaleUp, finalScale]);

  return (
    <section className="translate-y-[-]">
      {/* title */}
      <div
        className="z-1 relative h-[200vh]"
        style={{ clipPath: "inset(0 0 100vh 0)" }}
      >
        <div className="grid-system bg-background sticky top-0 flex h-dvh items-center">
          <div className="relative col-span-10">
            <h2 className="display-1 flex flex-col whitespace-pre">
              <span>SELECTED</span> <span className="text-right">WORKS</span>
            </h2>
            <p className="body-1 absolute bottom-0 left-0 w-2/5">
              Some opportunities and projects that I’m proud of!
            </p>
          </div>
        </div>
      </div>

      <div
        ref={video1Ref}
        className="z-0 h-[750vh] -translate-y-[200vh]"
        style={{ clipPath: "inset(0 0 100vh 0)" }}
      >
        <motion.div
          style={{ scale: finalScale }}
          className="before-blur-bg sticky top-[200vh] w-full overflow-hidden"
        >
          <video
            src="/arthyl-screen-recording.mp4"
            className="z-1 relative h-dvh w-dvw object-contain"
            autoPlay
            loop
          ></video>
        </motion.div>

        <div className="z-100 relative translate-y-[200vh] mix-blend-difference">
          <h2 className="display-1 side-padding mb-[100vh] text-right">
            ARTHYL.COM
          </h2>
          <p className="grid-system">
            <span className="col-span-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
              repellendus voluptatem voluptates excepturi nam. Impedit
              reprehenderit modi totam delectus, ut a eum tempora quam omnis,
              maiores vero molestiae labore, consequatur assumenda accusamus
              blanditiis cum. Dolor tempora ducimus impedit nesciunt quod
              similique magni sapiente sint! Nisi fugit provident iste
              perspiciatis autem.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
