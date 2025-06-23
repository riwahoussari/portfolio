"use client";

import { useTheme } from "next-themes";
import { motion as m } from "motion/react";

export default function ThemeButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { setTheme, resolvedTheme } = useTheme();

  const raysVariants = {
    hidden: {
      strokeOpacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      strokeOpacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rayVariant = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      // Start from center of the circle
      scale: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        // Customize timing for each property
        pathLength: { duration: 0.3 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    },
  };

  const sunPath =
    "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z";
  const moonPath =
    "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z";
  return (
    <button
      {...props}
      onClick={() =>
        resolvedTheme === "dark" ? setTheme("light") : setTheme("dark")
      }
    >
      <m.svg
        strokeLinecap="round"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative aspect-square w-full group-hover:rotate-[-15deg] duration-300 ease-in-out"
      >
        {/* sun rays */}
        <m.g
          variants={raysVariants}
          initial="hidden"
          animate={resolvedTheme === "light" ? "visible" : "hidden"}
          className="stroke-3 stroke-foreground"
          style={{ strokeLinecap: "round" }}
        >
          <m.path
            className="origin-center"
            variants={rayVariant}
            d="M50 2V11"
          />
          <m.path variants={rayVariant} d="M85 15L78 22" />
          <m.path variants={rayVariant} d="M98 50H89" />
          <m.path variants={rayVariant} d="M85 85L78 78" />
          <m.path variants={rayVariant} d="M50 98V89" />
          <m.path variants={rayVariant} d="M23 78L16 84" />
          <m.path variants={rayVariant} d="M11 50H2" />
          <m.path variants={rayVariant} d="M23 23L16 16" />
        </m.g>

        {/* sun to moon  */}
        <m.path
          strokeLinejoin="round"
          d={sunPath}
          fill="transparent"
          transition={{ duration: 1, type: "spring" }}
          initial={{ strokeOpacity: 0 }}
          animate={
            resolvedTheme === "dark"
              ? {
                  strokeWidth: 2,
                  d: moonPath,
                  rotate: -360,
                  scale: 2,
                  stroke: "var(--color-foreground)",
                  strokeOpacity: 1,
                  transition: { delay: 0.1 },
                }
              : {
                  strokeWidth: 3,
                  d: sunPath,
                  rotate: 0,
                  stroke: "var(--color-foreground)",
                  strokeOpacity: 1,
                }
          }
        />
      </m.svg>
    </button>
  );
}
