import { useHover } from "@/app/hooks/HoverContext";
import useMousePosition from "@/app/hooks/useMousePosition";
import { motion } from "motion/react";
import ArrowSvg from "../SVGs/ArrowSvg";

export default function Cursor() {
  const { x, y } = useMousePosition();
  const { isHovering } = useHover();
  return (
    <>
      <motion.div
        className="z-1000 absolute aspect-square w-4 rounded-full bg-white opacity-0 mix-blend-difference lg:opacity-100"
        animate={{
          top: y,
          left: x,
          translate: isHovering.hover === "normal" ? "30px 0px" : "30px 30px",
          scale:
            isHovering.hover === "normal"
              ? 1.2
              : isHovering.hover === "video"
                ? 0
                : 1,
          backgroundColor:
            isHovering.hover === "normal" ? "#fd2c2a" : "#ffffff",
        }}
        style={
          isHovering.hover === "normal"
            ? { mixBlendMode: "normal" }
            : { mixBlendMode: "difference" }
        }
        transition={{ type: "tween", ease: "backOut", duration: 0.7 }}
      ></motion.div>

      {/* video hover cursor/link */}
      <motion.div
        className="z-1000 scale-80 absolute flex items-center justify-between gap-4 rounded-2xl bg-white p-6 text-black opacity-0 mix-blend-difference lg:opacity-100 w-max origin-top-left"
        animate={{
          top: y,
          left: x,
          translate: "20px 20px",
          scale: isHovering.hover === "video" ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.7 }}
      >
        <p className="body-1">View Website</p>
        <div className="flex w-8 -rotate-90 items-center justify-center">
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
      </motion.div>
    </>
  );
}
