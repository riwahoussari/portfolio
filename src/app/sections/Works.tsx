"use client";
import { useScroll, useTransform, motion, useMotionValue } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useHover } from "../hooks/HoverContext";

export default function Works() {
  ///////////////////////////// update video clip path inset based on aspect ratio

  const [vid1Inset, setVid1Inset] = useState("inset(50% 0% 50% 0%)");
  const [vid2Inset, setVid2Inset] = useState("inset(50% 0% 50% 0%)");
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const updateInset1 = () => {
      const screenAspect = window.innerWidth / window.innerHeight;

      const video1 = videoRef1.current;
      if (!video1 || !video1.videoWidth || !video1.videoHeight) return;

      const video1Aspect = video1.videoWidth / video1.videoHeight;

      if (screenAspect > video1Aspect) {
        // Screen is wider → crop sides
        setVid1Inset("inset(0% 50% 0% 50%)");
      } else {
        // Screen is taller → crop top/bottom
        setVid1Inset("inset(50% 0% 50% 0%)");
      }
    };
    const updateInset2 = () => {
      const screenAspect = window.innerWidth / window.innerHeight;

      const video2 = videoRef2.current;
      if (!video2 || !video2.videoWidth || !video2.videoHeight) return;

      const video2Aspect = video2.videoWidth / video2.videoHeight;

      if (screenAspect > video2Aspect) {
        // Screen is wider → crop sides
        setVid2Inset("inset(0% 50% 0% 50%)");
      } else {
        // Screen is taller → crop top/bottom
        setVid2Inset("inset(50% 0% 50% 0%)");
      }
    };

    const video1 = videoRef1.current;

    if (video1 && video1.readyState >= 1) {
      // metadata already loaded
      updateInset1();
    } else {
      video1?.addEventListener("loadedmetadata", updateInset1);
    }

    window.addEventListener("resize", updateInset1);

    const video2 = videoRef2.current;

    if (video2 && video2.readyState >= 1) {
      // metadata already loaded
      updateInset2();
    } else {
      video2?.addEventListener("loadedmetadata", updateInset2);
    }

    window.addEventListener("resize", updateInset2);

    return () => {
      video1?.removeEventListener("loadedmetadata", updateInset1);
      window.removeEventListener("resize", updateInset1);
      video2?.removeEventListener("loadedmetadata", updateInset2);
      window.removeEventListener("resize", updateInset2);
    };
  }, []);

  //////////////////////////////////////  VIDEO 1
  const video1Ref = useRef(null);
  const { scrollYProgress: video1Scroll1 } = useScroll({
    target: video1Ref,
    offset: ["-100vh start", "start start"],
  });

  const { scrollYProgress: video1Scroll2 } = useScroll({
    target: video1Ref,
    offset: ["end 500vh", "end 400vh"],
  });

  // Scale down from 1 to 0.65
  const scaleDown1 = useTransform(video1Scroll1, [0, 1], [1, 0.65]);
  const scaleDown1ClipPath = useTransform(
    video1Scroll1,
    [0, 1],
    ["inset(0% 0% 0% 0%)", vid1Inset]
  );

  // Scale up back from 0.65 to 1
  const scaleUp1 = useTransform(video1Scroll2, [0, 1], [0.65, 1]);
  const scaleUp1ClipPath = useTransform(
    video1Scroll2,
    [0, 1],
    [vid1Inset, "inset(0% 0% 0% 0%)"]
  );

  // Final scale to apply to the element
  const finalScale1 = useMotionValue(1);
  const finalClipPath1 = useMotionValue("inset(0% 0% 0% 0%)");

  // Update final scale based on the two transforms
  useEffect(() => {
    const unsubscribe11 = scaleDown1.on("change", (v) => finalScale1.set(v));
    const unsubscribe12 = scaleUp1.on("change", (v) => finalScale1.set(v));
    const unsubscribe21 = scaleDown1ClipPath.on("change", (v) =>
      finalClipPath1.set(v)
    );
    const unsubscribe22 = scaleUp1ClipPath.on("change", (v) =>
      finalClipPath1.set(v)
    );

    return () => {
      unsubscribe11();
      unsubscribe12();
      unsubscribe21();
      unsubscribe22();
    };
  }, [
    scaleDown1,
    scaleUp1,
    finalScale1,
    scaleDown1ClipPath,
    scaleUp1ClipPath,
    finalClipPath1,
  ]);

  /////////////////////////////////////  VIDEO 2

  const video2Ref = useRef(null);
  const { scrollYProgress: video2Scroll1 } = useScroll({
    target: video2Ref,
    offset: ["-300vh start", "-200vh start"],
  });

  const { scrollYProgress: video2Scroll2 } = useScroll({
    target: video2Ref,
    offset: ["end 700vh", "end 600vh"],
  });

  // Scale down from 1 to 0.65
  const scaleDown2 = useTransform(video2Scroll1, [0, 1], [1, 0.65]);
  const scaleDown2ClipPath = useTransform(
    video2Scroll1,
    [0, 1],
    ["inset(0% 0% 0% 0%)", vid2Inset]
  );

  // Scale up back from 0.65 to 1
  const scaleUp2 = useTransform(video2Scroll2, [0, 1], [0.65, 1]);
  const scaleUp2ClipPath = useTransform(
    video2Scroll2,
    [0, 1],
    [vid2Inset, "inset(0% 0% 0% 0%)"]
  );

  // Final scale to apply to the element
  const finalScale2 = useMotionValue(1);
  const finalClipPath2 = useMotionValue("inset(0% 0% 0% 0%)");

  // Update final scale based on the two transforms
  useEffect(() => {
    const unsubscribe11 = scaleDown2.on("change", (v) => finalScale2.set(v));
    const unsubscribe12 = scaleUp2.on("change", (v) => finalScale2.set(v));
    const unsubscribe21 = scaleDown2ClipPath.on("change", (v) =>
      finalClipPath2.set(v)
    );
    const unsubscribe22 = scaleUp2ClipPath.on("change", (v) =>
      finalClipPath2.set(v)
    );

    return () => {
      unsubscribe11();
      unsubscribe12();
      unsubscribe21();
      unsubscribe22();
    };
  }, [
    scaleDown2,
    scaleUp2,
    finalScale2,
    scaleDown2ClipPath,
    scaleUp2ClipPath,
    finalClipPath2,
  ]);

  ///
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [adjustedHeight, setAdjustedHeight] = useState("auto");

  useLayoutEffect(() => {
    const updateHeight = () => {
      const section = sectionRef.current;
      if (section) {
        const sectionHeight = section.scrollHeight;
        const vh = window.innerHeight / 100;
        const offset = 500 * vh;
        const newHeight = Math.max(0, sectionHeight - offset);
        if (newHeight > 100 * vh) {
          setAdjustedHeight(`${newHeight}px`);
        }
      }
    };

    updateHeight(); // Initial run on mount

    // Add window resize listener
    window.addEventListener("resize", updateHeight);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  //// cursor/link on video hover
  const [videoHover, setVideoHover] = useState(0);
  const { setIsHovering } = useHover();

  useEffect(() => {
    setIsHovering({
      hover: videoHover ? "video" : "none",
      videoNum: videoHover,
    });
  }, [videoHover]);

  return (
    <section id="projects" style={{ height: adjustedHeight }}>
      <div ref={sectionRef}>
        {/* title */}
        <div
          className="z-2 relative h-[200vh]"
          style={{ clipPath: "inset(0 0 100vh 0)" }}
        >
          <div className="grid-system bg-background sticky top-0 flex h-dvh items-center overflow-hidden">
            <div className="relative col-span-7 max-sm:-translate-y-1/2 xl:col-span-10">
              <h2 className="display-1 text-[max(64px,10.41vw)]! max-2xs:text-[50px]! flex flex-col whitespace-pre">
                <span>SELECTED</span>{" "}
                <span className="mt-2 text-right">WORKS</span>
              </h2>
              <p className="text-[max(18px,2vw)]! body-1 absolute left-0 top-[125%] w-[min(250px,80%)] opacity-80 sm:top-[65%] sm:w-[40%]">
                Some opportunities and projects that I’m proud of!
              </p>
            </div>
          </div>
        </div>

        {/* arthyl */}
        <div
          ref={video1Ref}
          className="z-1 bg-background relative h-[500vh] -translate-y-[200vh] sm:h-[600vh] lg:h-[min(700vh,750vw)]"
          style={{ clipPath: "inset(0 0 100vh 0)" }}
        >
          <motion.div
            style={{ scale: finalScale1 }}
            className="sticky top-[200vh] w-full overflow-hidden"
          >
            <div className="z-1 relative h-dvh w-full">
              <motion.div
                style={{ clipPath: finalClipPath1 }}
                className="z-1 absolute min-h-dvh min-w-full object-cover blur-lg brightness-75"
              >
                <video
                  src="/arthyl-screen-recording.mp4"
                  className="min-h-dvh min-w-full object-cover"
                  autoPlay
                  muted
                  loop
                ></video>
              </motion.div>
              <a target="_blank" href="https://arthyl-nextjs.vercel.app/" className="z-1 absolute flex h-dvh w-full items-stretch justify-center">
                <video
                  ref={videoRef1}
                  src="/arthyl-screen-recording.mp4"
                  className="max-h-dvh cursor-pointer object-contain"
                  autoPlay
                  muted
                  loop
                  onMouseEnter={() => {
                    setVideoHover(1);
                  }}
                  onMouseLeave={() => {
                    setVideoHover(0);
                  }}
                  onLoadedMetadata={(e) => {
                    const video = e.currentTarget;
                    video.style.width = `${video.videoWidth}px`;
                    video.style.height = `${video.videoHeight}px`;
                  }}
                ></video>
              </a>
            </div>
          </motion.div>

          <div className="relative z-10 translate-y-[100vh] text-white mix-blend-difference sm:translate-y-[150vh] lg:translate-y-[min(200vh,200vw)]">
            <h2 className="display-1 text-[max(64px,10.41vw)]! max-xs:text-[12vw]! side-padding mb-[50vh] text-right md:mb-[min(60vh,60vw)] xl:mb-[min(80vh,80vw)]">
              ARTHYL.COM
            </h2>
            <p className="grid-system text-[max(16px,1.6vw)]!">
              <span className="col-span-4 max-md:max-w-[485px] md:min-w-[485px] xl:col-span-5">
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

        {/* haifaa bitar */}
        <div
          ref={video2Ref}
          className="bg-background relative z-0 h-[500vh] -translate-y-[400vh] sm:h-[600vh] lg:h-[min(700vh,750vw)]"
          style={{ clipPath: "inset(0 0 100vh 0)" }}
        >
          <motion.div
            style={{ scale: finalScale2 }}
            className="sticky top-[400vh] w-full overflow-hidden"
          >
            <div className="z-1 relative h-dvh w-full">
              <motion.div
                style={{ clipPath: finalClipPath2 }}
                className="z-1 absolute min-h-dvh min-w-full object-cover blur-lg brightness-75"
              >
                <video
                  src="/haifaa-bitar-screen-recording.mp4"
                  className="min-h-dvh min-w-full object-cover"
                  autoPlay
                  muted
                  loop
                ></video>
              </motion.div>
              <a target="_blank" href="https://haifaabitar.com/" className="z-1 absolute flex h-dvh w-full items-stretch justify-center">
                <video
                  ref={videoRef2}
                  src="/haifaa-bitar-screen-recording.mp4"
                  className="max-h-dvh cursor-pointer object-contain"
                  autoPlay
                  muted
                  loop
                  onMouseEnter={() => {
                    setVideoHover(2);
                  }}
                  onMouseLeave={() => {
                    setVideoHover(0);
                  }}
                  onLoadedMetadata={(e) => {
                    const video = e.currentTarget;
                    video.style.width = `${video.videoWidth}px`;
                    video.style.height = `${video.videoHeight}px`;
                  }}
                ></video>
              </a>
            </div>
          </motion.div>

          <div className="relative z-10 translate-y-[100vh] text-white mix-blend-difference sm:translate-y-[150vh] lg:translate-y-[min(200vh,200vw)]">
            <h2 className="display-1 text-[max(52px,9vw)]! max-xs:text-[10vw]! side-padding mb-[50vh] text-right md:mb-[min(60vh,60vw)] xl:mb-[min(80vh,80vw)]">
              HAIFAABITAR.COM
            </h2>
            <p className="grid-system text-[max(16px,1.6vw)]!">
              <span className="col-span-4 max-md:max-w-[485px] md:min-w-[485px] xl:col-span-5">
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
      </div>
    </section>
  );
}
