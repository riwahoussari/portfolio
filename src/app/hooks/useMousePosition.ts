import { useEffect, useState } from "react";

type Coordinates = { x: number; y: number };

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<Coordinates>({
    x: 0,
    y: 0,
  });

  // Store the latest mouse Y so we can combine it with scrollY
  let latestClientY = 0;

  const updateMousePosition = (e: MouseEvent) => {
    latestClientY = e.clientY;
    setMousePosition({
      x: e.clientX,
      y: e.clientY + window.scrollY,
    });
  };

  const updateOnScroll = () => {
    setMousePosition((prev) => ({
      x: prev.x,
      y: latestClientY + window.scrollY,
    }));
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("scroll", updateOnScroll);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("scroll", updateOnScroll);
    };
  }, []);

  return mousePosition;
}
