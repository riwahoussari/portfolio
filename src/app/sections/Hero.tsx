"use client";
import { motion } from "motion/react";
import Image from "next/image";
import ArrowSvg from "../components/SVGs/ArrowSvg";
import MyImage from "../../../public/me.png";
import ThemeButton from "../components/Global/ThemeButton";

export default function Hero() {
  const marqueeVariants = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        x: {
          duration: 10,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      },
    },
  };
  return (
    <section className="relative flex flex-col pb-20 pt-32 md:min-h-dvh md:justify-between">
      <div className="grid-system">
        <h1 className="h1-regular col-span-4 xl:col-span-5">
          Web Designer & Developer
        </h1>
      </div>

      <div className="mt-14 w-full max-md:relative md:mt-32 xl:mt-40">
        <div className="grid-system">
          <p className="body-3 spaced col-span-4 text-justify xl:col-start-5">
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris.
          </p>
        </div>

        <div className="side-padding mt-14 xl:mt-0 xl:-translate-y-full">
          <ArrowSvg aria-hidden width={32} strokeWidth={2} />
        </div>

        <div className="relative mt-32 w-full overflow-hidden md:mt-16">
          <motion.div
            className="absolute whitespace-pre text-white mix-blend-difference"
            animate="animate"
            variants={marqueeVariants}
          >
            <h1 className="display-1 spaced inline w-max">RIWA HOUSSARI — </h1>
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
          <div className="max-md:aspect-5/6 relative col-span-4 max-md:max-w-[380px] max-md:translate-x-1/4 md:col-start-5 xl:col-start-9">
            <Image
              alt="Image of Riwa Houssari Playing Basketball."
              src={MyImage}
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="grid-system z-2 absolute bottom-0 w-full overflow-hidden max-md:translate-y-3/4 max-md:justify-items-end md:bottom-10">
          <div className="max-md:aspect-5/6 relative col-span-4 max-md:max-w-[380px] max-md:translate-x-1/4 md:col-start-5 xl:col-start-9">
            <Image
              alt="Image of Riwa Houssari Playing Basketball."
              src={MyImage}
              className="object-cover object-top opacity-0"
              aria-hidden
            />
            <div className="z-100 absolute right-3 top-3 w-[60px]">
              <ThemeButton className="bg-background group hover:scale-110 hover:rounded-sm ease-in-out duration-300 cursor-pointer p-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
