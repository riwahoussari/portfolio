"use client";

import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const SKILLS = [
  ["Figma", "Responsiveness", "Motion Design", "Animations", "Typography", "Colors"],
  ["Nextjs", "React", "Gsap", "Motion", "Tailwind", "Webflow"],
  ["Nodejs", "Django", "Flask", "MongoDB", "MySQL", "APIs"],
];

export default function Services() {
  // background color based on user theme preference
  const [initialColor, setInitialColor] = useState("#000000");
  useEffect(() => {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--foreground")
      .trim();

    setInitialColor(color);
  }, []);

  // section scroll progress
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["-100vh start", "end 200vh"],
  });

  // Transforms

  // text div scroll up
  const translateY = useTransform(scrollYProgress, [0, 1], ["60%", "-40%"]);

  // each service horizontal scroll
  const translateX1 = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66],
    ["20%", "11%", "20%"]
  );
  const translateX2 = useTransform(
    scrollYProgress,
    [0.33, 0.66, 1],
    ["0%", "11%", "0%"]
  );
  const translateX3 = useTransform(scrollYProgress, [0.66, 1], ["20%", "11%"]);

  // text opacity
  const opacity1 = useTransform(scrollYProgress, [0, 0.33, 0.66], [0, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.33, 0.66, 1], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.66, 1], [0, 1]);

  // text color
  const color1 = useTransform(
    scrollYProgress,
    [0, 0.33],
    [initialColor, "#fd2c2a"]
  );
  const color2 = useTransform(
    scrollYProgress,
    [0.33, 0.66],
    [initialColor, "#ffd230"]
  );
  const color3 = useTransform(
    scrollYProgress,
    [0.66, 1],
    [initialColor, "#9810fa"]
  );

  // circle size and color
  const scale = useTransform(
    scrollYProgress,
    [0.12, 0.25, 0.38, 0.5, 0.61, 0.71, 0.83, 0.95],
    [0, 1, 1, 0, 1, 1, 0, 1]
  );
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.12, 0.25, 0.38, 0.5, 0.61, 0.71, 0.83, 0.95],
    [
      "#fd2c2a",
      "#fd2c2a",
      "#fd2c2a",
      "#ffd230",
      "#ffd230",
      "#ffd230",
      "#9810fa",
      "#9810fa",
    ]
  );

  const [serviceIndex, setServiceIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.5) {
      setServiceIndex(0);
    } else if (latest < 0.75) {
      setServiceIndex(1);
    } else {
      setServiceIndex(2);
    }
  });

  return (
    <section
      ref={sectionRef}
      className="bg-background z-2 relative h-[300vh] -translate-y-[100vh] pt-40"
    >
      <div className="sticky top-[100vh] flex h-dvh flex-col justify-center">
        <div
          style={{ rowGap: 0 }}
          className="grid-system relative items-center overflow-hidden max-lg:h-dvh max-lg:grid-rows-[3fr_2fr]"
        >
          {/* Services */}
          <div className="relative col-span-4 max-lg:[align-self:end] md:col-span-8 lg:col-span-5 xl:col-span-7">
            {/* Red Dot */}
            <motion.div
              style={{ scale, backgroundColor }}
              className="xl:top-34/100 lg:top-33/100 md:top-36/100 sm:top-36/100 top-35/100 bg-accen absolute left-2 aspect-square w-[min(20px,3vw)] rounded-full sm:left-6 md:left-8 md:w-5 lg:left-4 lg:w-6"
            />

            {/* services */}
            <motion.div
              style={{ translateY: translateY }}
              className="font-neue-montreal col-span-4 text-[min(48px,7vw)] font-medium max-lg:[align-self:end] md:col-span-8 lg:col-span-5 lg:text-[48px] xl:col-span-7 xl:text-[56px] 2xl:text-[64px]"
            >
              <motion.h3
                className="lg:pb-18 pb-[clamp(25px,6vh,40px)] 2xl:pb-20"
                style={{
                  translateX: translateX1,
                  opacity: opacity1,
                  color: color1,
                }}
              >
                Web Design
              </motion.h3>
              <motion.h3
                className="lg:pb-18 pb-[clamp(25px,6vh,40px)] 2xl:pb-20"
                style={{
                  translateX: translateX2,
                  opacity: opacity2,
                  color: color2,
                }}
              >
                Frontend Development
              </motion.h3>
              <motion.h3
                className="lg:pb-18 pb-[clamp(25px,6vh,40px)] 2xl:pb-20"
                style={{
                  translateX: translateX3,
                  opacity: opacity3,
                  color: color3,
                }}
              >
                Backend Development
              </motion.h3>
            </motion.div>
          </div>

          {/* Skills */}

          <div className="bg-background z-1 h4-light relative col-span-4 max-h-[80vh] self-start max-lg:max-w-[600px] max-md:!text-[clamp(18px,3vw,20px)] md:col-span-8 lg:col-span-3 lg:col-start-6 xl:col-span-5 xl:col-start-8 2xl:col-span-4 2xl:col-start-9">
            <AnimatePresence>
              <motion.div
                key={serviceIndex}
                className="lg:divide-y-1 absolute left-0 top-0 flex flex-col flex-wrap max-lg:flex-row max-lg:overflow-y-hidden w-full"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0, delay: 0.45, ease: "easeInOut" },
                }}
                exit={{ y: 1, transition: { duration: 0.5, ease: "easeInOut" } }}
              >
                {SKILLS[serviceIndex].map((skill, i) => (
                  <div
                    key={`${serviceIndex}_${i}`}
                    className="border-1 group relative min-w-24 overflow-hidden py-3 text-center max-lg:w-1/3 lg:px-4 lg:py-5"
                  >
                    <p className="z-1 relative text-white mix-blend-difference ">
                      {skill}
                    </p>
                    <motion.div
                      aria-hidden
                      className="bg-foreground absolute bottom-0 left-0 right-0 top-0 z-20  group-hover:translate-y-0"
                      initial={{ y: 0 }}
                      animate={{
                        y: "-100%",
                        transition: {
                          duration: 0.5,
                          delay: 0.5,
                          ease: "easeInOut",
                        },
                      }}
                      exit={{
                        y: 0,
                        transition: { duration: 0.5, ease: "easeInOut" },
                      }}
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// {
//   /* title */
// }
// <div className=" mb-[min(80px,5vh)]">
//   <h2 className=" h4-regular  border-b-1 inline-block pb-1">
//     Services & Skills
//   </h2>
// </div>
