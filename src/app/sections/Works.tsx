"use client";
import { useScroll, useTransform, motion, useMotionValue } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useHover } from "../hooks/HoverContext";
import Image from "next/image";
import arthylBanner from "../../../public/arthyl-banner.png";
import haifaaBanner from "../../../public/haifaa-banner.png";

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
    });
  }, [videoHover]);

  //// loading images
  const [vid1Loaded, setVid1Loaded] = useState(false);
  const [vid2Loaded, setVid2Loaded] = useState(false);
  useEffect(() => {
    const video1 = videoRef1.current;
    const video2 = videoRef2.current;
    if (!video1 || !video2) return;

    const handleCanPlay1 = () => {
      setVid1Loaded(true);
    };

    const handleCanPlay2 = () => {
      setVid2Loaded(true);
    };

    video1.addEventListener("canplaythrough", handleCanPlay1);
    video2.addEventListener("canplaythrough", handleCanPlay2);

    video1.load();
    video2.load();

    return () => {
      video1.removeEventListener("canplaythrough", handleCanPlay1);
      video2.removeEventListener("canplaythrough", handleCanPlay2);
    };
  }, []);

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
          {/* videos */}
          <motion.div
            style={{ scale: finalScale1 }}
            className="sticky top-[200vh] w-full overflow-hidden"
          >
            <div className="z-1 relative h-dvh w-full">
              {/* preloading image */}
              {!vid1Loaded && (
                <div className="z-1 absolute min-h-dvh min-w-full object-cover">
                  <Image
                    src={arthylBanner}
                    placeholder="blur"
                    alt="screenshot of Arthyl's website"
                    className="brightness-65 min-h-dvh min-w-full object-cover blur-md"
                  />
                  <p className="body-1 -translate-1/2 absolute left-1/2 top-1/2 text-center text-white">
                    <AnimatedLoading />
                  </p>
                </div>
              )}
              {/* blurred bg video */}
              <motion.div
                style={{ clipPath: finalClipPath1 }}
                className="z-2 absolute min-h-dvh min-w-full object-cover blur-lg brightness-75"
              >
                <video
                  src="/arthyl-1080.mp4"
                  className="min-h-dvh min-w-full object-cover"
                  autoPlay
                  muted
                  loop
                  style={{ opacity: vid1Loaded ? 1 : 0 }}
                ></video>
              </motion.div>
              {/* video */}
              <a
                target="_blank"
                href="https://arthyl-nextjs.vercel.app/"
                className="z-2 absolute flex h-dvh w-full items-stretch justify-center max-lg:pointer-events-none"
              >
                <video
                  ref={videoRef1}
                  src="/arthyl-1080.mp4"
                  className="max-h-dvh cursor-pointer object-contain"
                  autoPlay
                  style={{ opacity: vid1Loaded ? 1 : 0 }}
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

          {/* text */}
          <div className="relative z-10 translate-y-[100vh] text-white mix-blend-difference sm:translate-y-[150vh] lg:translate-y-[min(200vh,200vw)]">
            <h2 className="display-1 text-[max(64px,10.41vw)]! max-xs:text-[12vw]! side-padding mb-[50vh] text-right md:mb-[min(60vh,60vw)] xl:mb-[min(80vh,80vw)]">
              ARTHYL.COM
            </h2>
            <p className="grid-system text-[max(16px,1.6vw)]!">
              <span className="col-span-4 max-md:max-w-[485px] md:min-w-[485px] xl:col-span-5">
                Arthyl is the first plexiglass artist in the Middle East, but
                his old basic website didn’t reflect the artistry or uniqueness
                of his work. This was a personal project where I redesigned and
                rebuilt the entire site to match the bold, experimental nature
                of his art. The result features smooth, advanced scroll-based
                animations and lots of micro-interactions throughout to create a
                more dynamic and immersive experience. It’s one of my favorite
                projects to date, blending creative freedom with advanced
                front-end techniques.
              </span>
            </p>
            <div className="side-padding mt-8 lg:hidden">
              <a
                target="_blank"
                href="https://arthyl-nextjs.vercel.app/"
                className="flex w-max origin-top-left items-center justify-between gap-4 rounded-2xl bg-white px-8 py-5 text-black mix-blend-difference"
              >
                <p className="h4-regular">View Website</p>
                <div className="flex w-6 -rotate-90 items-center justify-center">
                  <svg
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L32 32M32 32V5.5M32 32H5.5"
                      strokeWidth={2}
                      className="stroke-black"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* haifaa bitar */}
        <div
          ref={video2Ref}
          className="bg-background relative z-0 h-[500vh] -translate-y-[400vh] sm:h-[600vh] lg:h-[min(700vh,750vw)]"
          style={{ clipPath: "inset(0 0 100vh 0)" }}
        >
          {/* videos */}
          <motion.div
            style={{ scale: finalScale2 }}
            className="sticky top-[400vh] w-full overflow-hidden"
          >
            <div className="z-1 relative h-dvh w-full">
              {/* preloading image */}
              {!vid2Loaded && (
                <div className="z-1 absolute min-h-dvh min-w-full object-cover">
                  <Image
                    src={haifaaBanner}
                    placeholder="blur"
                    alt="screenshot of Haifaa's website"
                    className="brightness-65 min-h-dvh min-w-full object-cover blur-md"
                  />
                  <p className="body-1 -translate-1/2 absolute left-1/2 top-1/2 text-center text-white">
                    <AnimatedLoading />
                  </p>
                </div>
              )}
              {/* blurred bg video */}
              <motion.div
                style={{ clipPath: finalClipPath2 }}
                className="z-1 absolute min-h-dvh min-w-full object-cover blur-lg brightness-75"
              >
                <video
                  src="/haifaa-1080.mp4"
                  className="min-h-dvh min-w-full object-cover"
                  autoPlay
                  style={{ opacity: vid2Loaded ? 1 : 0 }}
                  muted
                  loop
                ></video>
              </motion.div>
              {/* video */}
              <a
                target="_blank"
                href="https://haifaabitar.com/"
                className="z-1 absolute flex h-dvh w-full items-stretch justify-center max-lg:pointer-events-none"
              >
                <video
                  ref={videoRef2}
                  src="/haifaa-1080.mp4"
                  className="max-h-dvh cursor-pointer object-contain"
                  autoPlay
                  style={{ opacity: vid2Loaded ? 1 : 0 }}
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

          {/* text */}
          <div className="relative z-10 translate-y-[100vh] text-white mix-blend-difference sm:translate-y-[150vh] lg:translate-y-[min(200vh,200vw)]">
            <h2 className="display-1 text-[max(52px,9vw)]! max-xs:text-[10vw]! side-padding mb-[50vh] text-right md:mb-[min(60vh,60vw)] xl:mb-[min(80vh,80vw)]">
              HAIFAABITAR.COM
            </h2>
            <p className="grid-system text-[max(16px,1.6vw)]!">
              <span className="col-span-4 max-md:max-w-[485px] md:min-w-[485px] xl:col-span-5">
                This is a live, client-facing website built for Ms. Haifaa Bitar
                — a professional psychologist and psychoanalyst. The goal was to
                elevate her online presence and position her as a standout in
                her field. The design is clean, calm, and professional, helping
                visitors quickly find everything they need: her services,
                experience, contact details, and a built-in booking system.
                Beyond just looking good, the site was built to build trust —
                making sure potential clients feel informed, comfortable, and
                confident to reach out.
              </span>
            </p>
            <div className="side-padding mt-8 lg:hidden">
              <a
                target="_blank"
                href="https://haifaabitar.com/"
                className="flex w-max origin-top-left items-center justify-between gap-4 rounded-2xl bg-white px-8 py-5 text-black mix-blend-difference"
              >
                <p className="h4-regular">View Website</p>
                <div className="flex w-6 -rotate-90 items-center justify-center">
                  <svg
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L32 32M32 32V5.5M32 32H5.5"
                      strokeWidth={2}
                      className="stroke-black"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedLoading() {
  return (
    <span>
      loading
      <motion.span
        animate={{
          display: ["inline", "none", "none"],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
          times: [0, 0.5, 1],
          delay: 0,
        }}
        className="inline-block"
      >
        .
      </motion.span>
      <motion.span
        animate={{
          display: ["inline", "none", "none"],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
          times: [0, 0.5, 1],
          delay: 0.5,
        }}
        className="inline-block"
      >
        .
      </motion.span>
      <motion.span
        animate={{
          display: ["inline", "none", "none"],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
          times: [0, 0.5, 1],
          delay: 1,
        }}
        className="inline-block"
      >
        .
      </motion.span>
    </span>
  );
}
