"use client";
import { useHover } from "@/app/hooks/HoverContext";
import React, {
  AnchorHTMLAttributes,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from "react";

type HoverAnchorProps = {
  localHover: boolean;
  setLocalHover: Dispatch<SetStateAction<boolean>>;
  children: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function HoverAnchor({
  localHover,
  setLocalHover,
  children,
  ...props
}: HoverAnchorProps) {
  const { setIsHovering } = useHover();
  return (
    <a
      onMouseLeave={() => {
        setIsHovering({hover: "none"})
        setLocalHover(false);
      }}
      onMouseEnter={() => {
        setIsHovering({hover: "normal"});
        setLocalHover(true);
      }}
      {...props}
      className={`hover:opacity-100! ${localHover ? "md:opacity-20" : ""} duration-300 ease-in-out group relative flex justify-center overflow-hidden lg:justify-start`}
    >
      {/* Invisible placeholder to maintain height */}
      <span className="whitespace-pre opacity-0">
        {renderLetters(children)}
      </span>
      {/* Text moves up & out of view on hover */}
      <span className="absolute bottom-0 whitespace-pre" aria-hidden>
        {renderLetters(children, "out")}
      </span>
      {/* Text moves up & into view on hover  */}
      <span className="absolute top-full whitespace-pre" aria-hidden>
        {renderLetters(children, "in")}
      </span>
    </a>
  );
}

/**
 * Renders animated letter spans for hover effects.
 * @param text - The text to split into individual letter spans.
 * @param effect - Determines animation type: "in" for enter, "out" for exit.
 */
function renderLetters(text: string, effect?: "in" | "out") {
  return text.split("").map((letter, i) => (
    <span
      key={i}
      className={
        effect === "in"
          ? "-rotate-x-90 group-hover:rotate-x-0 inline-block duration-300 ease-in-out group-hover:translate-y-[-100%]"
          : effect === "out"
            ? "group-hover:rotate-x-90 inline-block delay-[10] duration-300 ease-in-out group-hover:-translate-y-[100%]"
            : "inline-block"
      }
      style={effect ? { transitionDelay: `${i * 25}ms` } : undefined}
    >
      {letter}
    </span>
  ));
}
