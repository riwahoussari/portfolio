"use client";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  useMotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const SKILLS = [
  {
    title: "Web Design",
    list: [
      "Figma",
      "Animations",
      "Responsiveness",
      "Motion Design",
      "Typography",
      "Colors",
    ],
  },
  {
    title: "Frontend Development",
    list: ["Nextjs", "React", "Framer Motion", "Webflow", "Gsap", "Tailwind"],
  },
  {
    title: "Backend Development",
    list: ["Nodejs", "Django", "Flask", "MongoDB", "MySQL", "APIs"],
  },
];

export default function Services() {
  // marquee
  const marqueeVariants = {
    animate: {
      x: ["0%", "-50%"],
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

  // Scroll Progress IN/OUT
  const sectionRef = useRef(null);
  const { scrollYProgress: sectionScrollIn } = useScroll({
    target: sectionRef,
    offset: ["start end", "start -50vh"],
  });
  const { scrollYProgress: sectionScrollOut } = useScroll({
    target: sectionRef,
    offset: ["end 150vh", "end end"],
  });

  // services text opacity animate in
  const [servicesHidden, setServicesHidden] = useState(true);
  useMotionValueEvent(sectionScrollIn, "change", (latest) => {
    setServicesHidden(latest < 0.66);
  });

  // Background Gradient opacity animate in-out
  const gradientOpacityIn = useTransform(sectionScrollIn, [0.33, 0.66], [0, 1]);
  const gradientOpacityOut = useTransform(sectionScrollOut, [0, 1], [1, 0]);
  const gradientOpacity = useMotionValue(0);
  useEffect(() => {
    const unsub1 = gradientOpacityIn.on("change", (v) =>
      gradientOpacity.set(v)
    );
    const unsub2 = gradientOpacityOut.on("change", (v) =>
      gradientOpacity.set(v)
    );
    return () => {
      unsub1();
      unsub2();
    };
  }, [gradientOpacityIn, gradientOpacityOut]);

  //  clippath animate in-out
  const clipPathIn = useTransform(
    sectionScrollIn,
    [0.66, 1],
    ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]
  );

  const clipPathOut = useTransform(
    sectionScrollOut,
    [0, 1],
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
  );

  return (
    <section id="services" ref={sectionRef} className="relative md:mt-[25vh]">
      <div className="sticky top-0 h-dvh">
        {/* gradient background */}
        <motion.div
          style={{ opacity: gradientOpacity }}
          className="bg-accent-gradient absolute left-0 right-0 top-0 z-0 h-dvh"
        />

        {/* Services Title Text */}
        <div className="z-1 flex h-dvh flex-col items-center justify-center">
          <motion.div
            animate={servicesHidden ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:scale-y-200 sm:scale-y-250 scale-y-250 max-xs:-translate-y-full xs:origin-bottom relative w-full origin-bottom overflow-hidden"
          >
            <motion.div
              className="text-foreground absolute whitespace-pre"
              animate="animate"
              variants={marqueeVariants}
            >
              <h2 className="display-1 bold sm:text-[clamp(125px,14vw,230px)]! text-[90px]! spaced inline w-max">
                SERVICES SKILLS{" "}
              </h2>
              <h2
                aria-hidden
                className="display-1 bold sm:text-[clamp(125px,14vw,230px)]! text-[90px]! spaced inline w-max"
              >
                SERVICES SKILLS{" "}
              </h2>
            </motion.div>
            {/* placeholder to maintain container height */}
            <h2
              aria-hidden
              className="display-1 bold sm:text-[clamp(125px,14vw,230px)]! text-[90px]! spaced inline w-max whitespace-nowrap opacity-0"
            >
              SERVICES SKILLS{" "}
            </h2>
          </motion.div>

          <motion.div
            animate={servicesHidden ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
            className="md:scale-y-200 sm:scale-y-250 scale-y-250 xs:origin-top relative w-full origin-center -scale-x-100 overflow-hidden"
          >
            <motion.div
              className="text-foreground absolute whitespace-pre"
              animate="animate"
              variants={marqueeVariants}
            >
              <h2 className="display-1 text-outline bold sm:text-[clamp(125px,14vw,230px)]! text-[90px]! spaced inline w-max">
                SKILLS SERVICES{" "}
              </h2>
              <h2
                aria-hidden
                className="display-1 text-outline bold sm:text-[clamp(125px,14vw,230px)]! text-[90px]! spaced inline w-max"
              >
                SKILLS SERVICES{" "}
              </h2>
            </motion.div>
            {/* placeholder to maintain container height */}
            <h2
              aria-hidden
              className="display-1 text-outline bold sm:text-[clamp(125px,14vw,230px)]! text-[90px]! spaced inline w-max whitespace-nowrap opacity-0"
            >
              SKILLS SERVICES{" "}
            </h2>
          </motion.div>

          <motion.div
            animate={servicesHidden ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:scale-y-200 sm:scale-y-250 scale-y-250 xs:hidden relative w-full origin-top translate-y-full overflow-hidden"
          >
            <motion.div
              className="text-foreground absolute whitespace-pre"
              animate="animate"
              variants={marqueeVariants}
            >
              <h2 className="display-1 bold sm:text-[clamp(125px,14vw,230px)]! text-[90px]! spaced inline w-max">
                SKILLS SERVICES{" "}
              </h2>
              <h2
                aria-hidden
                className="display-1 bold sm:text-[clamp(125px,14vw,230px)]! text-[90px]! spaced inline w-max"
              >
                SKILLS SERVICES{" "}
              </h2>
            </motion.div>
            {/* placeholder to maintain container height */}
            <h2
              aria-hidden
              className="display-1 bold sm:text-[clamp(125px,14vw,230px)]! text-[90px]! spaced inline w-max whitespace-nowrap opacity-0"
            >
              SKILLS SERVICES{" "}
            </h2>
          </motion.div>
        </div>

        <motion.div
          style={{ clipPath: clipPathIn }}
          className="bg-background absolute right-0 top-0 h-dvh lg:w-2/3 xl:w-[60%] 2xl:w-1/2"
        />
        <motion.div
          style={{ clipPath: clipPathOut }}
          className="bg-background absolute left-0 top-0 h-dvh w-full max-lg:hidden"
        />
      </div>

      {/* Services */}
      <div className="z-2 relative ms-auto mt-[20vh] grid pb-[min(33vh,20vw)] max-lg:pb-[100vh] lg:w-2/3 xl:w-[60%] 2xl:w-1/2">
        <div className="bg-background absolute h-dvh left-0 right-0 top-0 lg:hidden" />

        <motion.div
          style={{ clipPath: clipPathIn }}
          className="side-padding bg-background relative pt-[max(150px,13vh)] sm:pt-[max(300px,25vh)] lg:pt-0"
        >
          {SKILLS.map((skill) => (
            <div
              key={skill.title}
              className="mb-[max(150px,13vh)] sm:mb-[max(300px,25vh)] lg:mb-[33vh]"
            >
              <h3 className="display-1 md:text-[max(72px,6vw)]! text-[max(8vw,44px)]!">
                {skill.title}
              </h3>
              <div className="xs:gap-5 mt-10 flex flex-wrap gap-4 md:gap-6">
                {skill.list.map((item) => (
                  <p
                    key={item}
                    className="md:text-[max(30px,2vw)]! xs:text-[24px]! border-foreground xs:px-5 rounded-[10px] border-2 px-4 py-2 text-[20px] sm:rounded-xl md:px-6 md:py-3"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
