"use client";
import { useScroll, useTransform, motion } from "motion/react";
import { useTheme } from "next-themes";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import HoverAnchor from "./HoverAnchor";
import FooterForm from "./Form";

export default function Footer({
  setMediaLoaded,
}: {
  setMediaLoaded: Dispatch<SetStateAction<boolean[]>>;
}) {
  const { resolvedTheme } = useTheme();
  const [src, setSrc] = useState("/black.mp4");

  useLayoutEffect(() => {
    setSrc(resolvedTheme === "dark" ? "white-720.mp4" : "black-720.mp4");
  }, [resolvedTheme]);

  const footerRef = useRef(null);
  const { scrollYProgress: footerScroll } = useScroll({
    target: footerRef,
    offset: ["start 1.5", "end 2"],
  });

  const bottomRowY = useTransform(footerScroll, [0, 1], ["100%", "0%"]);

  const [localHover, setLocalHover] = useState(false);

  //// preloader
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    // vid 1
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      console.log('footer loaded')
      setMediaLoaded((prev) => {
        return [prev[0], prev[1], true];
      });
    };

    video.addEventListener("canplaythrough", handleCanPlay);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-foreground z-2 absolute w-full -translate-y-[100vh]"
    >
      <div className="relative h-[175vh] md:h-[150vh]">
        <div className="z-1 footer-y-padding sticky top-[100vh] flex h-[100vh] flex-col justify-between overflow-hidden">
          {/* top row */}
          <div className="text-background side-padding flex items-start justify-between max-lg:flex-col-reverse max-lg:items-center">
            {/* video of 3d 34 */}
            <video
              ref={videoRef}
              src={src}
              className="w-[min(30vw,360px)] object-contain pt-12 max-lg:my-12"
              autoPlay
              muted
              loop
            ></video>

            {/* contact form */}
            <div
              className={`duration-300 ease-in-out ${localHover ? "md:opacity-20" : ""}`}
            >
              <FooterForm />
            </div>
          </div>

          {/* bottom row */}
          <motion.div
            id="contact"
            style={{ translateY: bottomRowY }}
            className="text-background footer-b-padding side-padding absolute bottom-0 left-0 flex w-full flex-col items-end justify-between gap-6 sm:flex-row"
          >
            {/* let's connect */}
            <h2
              className={`display-1 spaced opacity-20 max-sm:hidden ${localHover ? "md:opacity-5" : ""} duration-300 ease-in-out`}
            >
              RIWA <br />
              HOUSSARI
            </h2>
            {/* links */}
            <div className="navlink flex justify-between gap-x-8 gap-y-6 max-sm:w-full max-sm:flex-wrap sm:flex-col sm:items-end sm:gap-4">
              <HoverAnchor
                setLocalHover={setLocalHover}
                localHover={localHover}
                href="mailto:houssaririwa@gmail.com"
              >
                EMAIL
              </HoverAnchor>
              <HoverAnchor
                setLocalHover={setLocalHover}
                localHover={localHover}
                target="_blank"
                href="https://wa.me/96181059119"
              >
                WHATSAPP
              </HoverAnchor>
              {/* <HoverAnchor setLocalHover={setLocalHover} localHover={localHover} target="_blank" href="">GITHUB</HoverAnchor> */}
              <HoverAnchor
                setLocalHover={setLocalHover}
                localHover={localHover}
                target="_blank"
                href="https://instagram.com/riwahoussari34"
              >
                INSTAGRAM
              </HoverAnchor>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
