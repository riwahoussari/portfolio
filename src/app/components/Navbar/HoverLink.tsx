"use client";
import { useHover } from "@/app/hooks/HoverContext";
// import Link from "next/link";
import React, { AnchorHTMLAttributes, Dispatch, SetStateAction } from "react";
import { useLenis } from "../Global/LenisScrollWrapper";

type HoverLinkProps = {
  children: string;
  href: string;
  localHover: boolean;
  setLocalHover: Dispatch<SetStateAction<boolean>>
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function HoverLink({
  children,
  href,
  localHover,
  setLocalHover,
  ...props
}: HoverLinkProps) {
  const { setIsHovering } = useHover();

  const lenis = useLenis();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    const y =
      href === "#contact"
        ? document.body.clientHeight
        : target.getBoundingClientRect().top + window.scrollY;

    let duration =
      Math.round((Math.abs(y - window.scrollY) / 1500) * 100) / 100;

    if (lenis) {
      lenis.scrollTo(y, { immediate: false, duration: Math.min(duration, 3) });
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <a
      onClick={handleClick}
      href={href}
      onMouseLeave={() => {
        setIsHovering({ hover: "none" });
        setLocalHover(false)
      }}
      onMouseEnter={() => {
        setIsHovering({ hover: "normal" });
        setLocalHover(true)
      }}
      {...props}
      className="group relative flex justify-center overflow-hidden lg:justify-start hover:opacity-100! duration-200 ease-in-out"
      style={{opacity: localHover ? 0.2 : 1}}
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
          ? "-rotate-x-90 group-hover:rotate-x-0 inline-block duration-200 ease-in-out group-hover:translate-y-[-100%]"
          : effect === "out"
            ? "group-hover:rotate-x-90 inline-block delay-[10] duration-200 ease-in-out group-hover:-translate-y-[100%]"
            : "inline-block"
      }
      style={effect ? { transitionDelay: `${i * 25}ms` } : undefined}
    >
      {letter}
    </span>
  ));
}
