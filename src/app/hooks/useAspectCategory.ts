import { useEffect, useState } from "react";

export default function useAspectCategory() {
  const [category, setCategory] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    const updateCategory = () => {
      const ratio = window.innerWidth / window.innerHeight;

      if (ratio > 1.2) {
        setCategory("desktop"); // landscape
      } else if (ratio > 0.6) {
        setCategory("tablet"); // wide/short portrait
      } else {
        setCategory("mobile"); // narrow/long portrait
      }
    };

    updateCategory();
    window.addEventListener("resize", updateCategory);
    return () => window.removeEventListener("resize", updateCategory);
  }, []);

  return category;
}
