"use client";

import Lenis from "lenis";
import { ReactNode, useEffect } from "react";

export default function LenisScrollWrapper({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({duration: 4});
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });

  return <>{children}</>;
}
