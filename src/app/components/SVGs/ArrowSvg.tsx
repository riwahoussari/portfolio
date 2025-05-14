import { SVGProps } from "react";

export default function ArrowSvg({
  width = 32,
  strokeWidth = 2,
  ...props
}: { width?: number; strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1L32 32M32 32V5.5M32 32H5.5"
        strokeWidth={strokeWidth}
        className="stroke-foreground"
      />
    </svg>
  );
}
