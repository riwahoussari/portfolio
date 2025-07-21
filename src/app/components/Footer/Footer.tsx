"use client";
import { useScroll, useTransform, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useLayoutEffect, useRef, useState } from "react";
import ArrowSvg from "../SVGs/ArrowSvg";

export default function Footer() {
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

  return (
    <footer
      ref={footerRef}
      className="bg-foreground z-2 absolute w-full -translate-y-[100vh]"
    >
      <div className="relative h-[175vh] md:h-[150vh]">
        <div className="z-1 footer-y-padding sticky top-[100vh] flex h-[100vh] flex-col justify-between overflow-hidden">
          {/* top row */}
          <div className="text-background side-padding flex justify-between max-lg:flex-col-reverse max-lg:items-center">
            {/* video of 3d 34 */}
            <video
              src={src}
              className="w-[min(30vw,360px)] object-contain max-lg:my-12"
              autoPlay
              muted
              loop
            ></video>

            {/* contact form */}
            <form
              action=""
              className="body-3 flex w-[min(90vw,500px)] flex-col gap-10 pt-12 xl:w-[min(50vw,600px)]"
            >
              <div className="flex items-center justify-between">
                <h2 className="h2-medium">Let's Talk</h2>
                <div className="bg-background relative aspect-square w-16 rounded-full text-white">
                  <div className="-translate-1/2 absolute left-1/2 top-1/2 -rotate-90">
                    <ArrowSvg width={24} strokeWidth={3} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  className="border-background cursor-pointer rounded-full border-2 px-8 py-3"
                />
                <input
                  type="tel"
                  name="phone-number"
                  placeholder="Phone Number"
                  className="border-background cursor-pointer rounded-full border-2 px-8 py-3"
                />
                <textarea
                  name="message"
                  id="message"
                  placeholder="Your Message"
                  rows={4}
                  className="border-background rounded-4xl cursor-pointer resize-none border-2 px-8 py-3"
                ></textarea>
              </div>
            </form>
          </div>

          {/* bottom row */}
          <motion.div
            style={{ translateY: bottomRowY }}
            className="text-background footer-b-padding side-padding absolute bottom-0 left-0 flex w-full flex-col items-end justify-between sm:flex-row gap-6"
          >
            {/* let's connect */}
            <h2 className="display-1 spaced max-sm:hidden opacity-20">
              RIWA <br />
              HOUSSARI
            </h2>
            {/* links */}
            <div className="navlink flex justify-between gap-x-8 gap-y-6 max-sm:w-full max-sm:flex-wrap sm:flex-col sm:items-end sm:gap-4">
              <p>EMAIL</p>
              <p>WHATSAPP</p>
              <p>GITHUB</p>
              <p>INSTAGRAM</p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
