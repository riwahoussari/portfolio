import Link from "next/link";
import React from "react";

type HoverLinkProps = {
  children: string;
} & React.ComponentProps<typeof Link>;

export default function HoverLink({ children, ...props }: HoverLinkProps) {
  return (
    
    <Link {...props} className="group relative flex lg:justify-start justify-center overflow-hidden">
      {/* Invisible placeholder to maintain height */}
      <span className="opacity-0 whitespace-pre">{renderLetters(children)}</span>
      {/* Text moves up & out of view on hover */}
      <span className="absolute bottom-0 whitespace-pre" aria-hidden>
        {renderLetters(children, "out")} 
      </span>
      {/* Text moves up & into view on hover  */}
      <span className="absolute top-full whitespace-pre" aria-hidden>
        {renderLetters(children, "in")} 
      </span>
    </Link>
    
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