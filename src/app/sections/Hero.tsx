"use client";
import { motion, useAnimation } from "motion/react";
import Image from "next/image";
import ArrowSvg from "../components/SVGs/ArrowSvg";
import MyImageGray from "../../../public/me-gray.png";
import ThemeButton from "../components/Global/ThemeButton";
import { useEffect } from "react";

export default function Hero({ revealAnimEnded }: { revealAnimEnded: number }) {
  const marqueeControls = useAnimation();
  const marqueeVariants = {
    animate: {
      x: ["0%", "-25%"],
      transition: {
        x: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      },
    },
  };
  useEffect(() => {
    if (revealAnimEnded >= 2) {
      marqueeControls.start("animate");
    }
  }, [revealAnimEnded]);

  return (
    <>
      {/* hero */}
      <section
        id="riwa"
        className="relative flex flex-col pb-20 pt-12 md:min-h-dvh md:justify-between"
      >
        <div className="grid-system">
          <h1 className="h1-regular col-span-4 flex flex-wrap whitespace-pre xl:col-span-5">
            {"Web Designer & Developer".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-y-hidden">
                <motion.span
                  key={i}
                  initial={{ translateY: "100%" }}
                  animate={
                    revealAnimEnded >= 2
                      ? { translateY: "0%" }
                      : { translateY: "100%" }
                  }
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                    delay: 0.1 * i,
                  }}
                  className="inline-block"
                >
                  {word}{" "}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <div className="mt-14 w-full max-md:relative md:mt-32 xl:mt-40">
          <div className="grid-system">
            <p className="body-3 spaced col-span-4 text-justify xl:col-start-5">
              {"I design clean, modern and smooth web interfaces then code them into reality — always leveling up, one project and one late-night bug fix at a time."
                .split(" ")
                .map((word, i) => (
                  <span key={i} className="inline-block overflow-y-hidden">
                    <motion.span
                      key={i}
                      initial={{ translateY: "100%" }}
                      animate={
                        revealAnimEnded >= 2
                          ? { translateY: "0%" }
                          : { translateY: "100%" }
                      }
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                        delay: 0.3 + 0.01 * i,
                      }}
                      className="inline-block whitespace-pre"
                    >
                      {word}{" "}
                    </motion.span>
                  </span>
                ))}
            </p>
          </div>

          <div className="side-padding mt-14 max-md:flex max-md:items-center max-md:justify-between xl:mt-0 xl:-translate-y-full">
            <motion.div
              initial={{ opacity: 0, translateY: "-30px", translateX: "-30px" }}
              animate={
                revealAnimEnded >= 2
                  ? { opacity: 1, translateY: "0", translateX: "0" }
                  : { opacity: 0, translateY: "-30px", translateX: "-30px" }
              }
              transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
            >
              <ArrowSvg aria-hidden width={32} strokeWidth={2} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, rotateZ: "-45deg" }}
              animate={
                revealAnimEnded >= 2
                  ? { opacity: 1, rotateZ: "0deg" }
                  : { opacity: 0, rotateZ: "-45deg" }
              }
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
              className="w-[60px] md:hidden"
            >
              <ThemeButton className="bg-background group cursor-pointer p-3 duration-300 ease-in-out hover:scale-110 hover:rounded-sm" />
            </motion.div>
          </div>

          <div className="relative mt-32 w-full overflow-hidden md:mt-16">
            <motion.div
              className="absolute overflow-y-hidden whitespace-pre text-white mix-blend-difference"
              animate={marqueeControls}
              variants={marqueeVariants}
            >
              <h1 className="display-1 spaced inline w-max">
                {"RIWA HOUSSARI —".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ translateY: "100%" }}
                    animate={
                      revealAnimEnded >= 2
                        ? { translateY: "0%" }
                        : { translateY: "100%" }
                    }
                    transition={{
                      duration: 0.25,
                      ease: "easeInOut",
                      delay: 0.8 + 0.1 * i,
                    }}
                    className="inline-block"
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </h1>
              <h1 aria-hidden className="display-1 spaced inline w-max">
                {"RIWA HOUSSARI —".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ translateY: "100%" }}
                    animate={
                      revealAnimEnded >= 2
                        ? { translateY: "0%" }
                        : { translateY: "100%" }
                    }
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                      delay: 0.9 + 0.1 * i,
                    }}
                    className="inline-block"
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </h1>
              <h1 aria-hidden className="display-1 spaced inline w-max">
                RIWA HOUSSARI —{" "}
              </h1>
              <h1 aria-hidden className="display-1 spaced inline w-max">
                RIWA HOUSSARI —{" "}
              </h1>
            </motion.div>
            {/* placeholder to maintain container height */}
            <h1
              aria-hidden
              className="display-1 spaced inline w-max whitespace-nowrap opacity-0"
            >
              RIWA HOUSSARI —{" "}
            </h1>
          </div>

          <div className="grid-system -z-1 absolute bottom-0 w-full overflow-hidden max-md:translate-y-3/4 max-md:justify-items-end md:bottom-10">
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={
                revealAnimEnded >= 2
                  ? { clipPath: "inset(0 0 0 0)" }
                  : { clipPath: "inset(0 0 100% 0)" }
              }
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              className="max-md:aspect-5/6 relative col-span-4 bg-green-300 max-md:max-w-[380px] max-md:translate-x-1/4 md:col-start-5 xl:col-start-9"
            >
              <Image
                alt="Image of Riwa Houssari Playing Basketball."
                src={MyImageGray}
                className="object-cover object-top"
                placeholder="blur"
              />
            </motion.div>
          </div>

          <div className="grid-system z-2 max-md:hidden! absolute bottom-0 w-full overflow-hidden max-md:translate-y-3/4 max-md:justify-items-end md:bottom-10">
            <div className="max-md:aspect-5/6 relative col-span-4 max-md:max-w-[380px] max-md:translate-x-1/4 md:col-start-5 xl:col-start-9">
              <Image
                alt="Image of Riwa Houssari Playing Basketball."
                src={MyImageGray}
                className="object-cover object-top opacity-0"
                aria-hidden
              />
              <motion.div
                className="absolute right-3 top-3 z-10 w-[60px]"
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={
                  revealAnimEnded >= 2
                    ? { clipPath: "inset(0 0 0 0)" }
                    : { clipPath: "inset(0 0 100% 0)" }
                }
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.5 }}
              >
                <ThemeButton className="bg-background group cursor-pointer p-3 duration-300 ease-in-out hover:scale-110 hover:rounded-sm" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}




