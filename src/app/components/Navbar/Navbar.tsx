"use client";
import { useEffect, useRef, useState } from "react";
import BurgerMenuSvg from "./BurgerMenuSvg";
import MobileNavMenu from "./MobileNavMenu";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import HoverLink from "./HoverLink";

const LINKS = [
  {
    name: "RIWA HOUSSARI",
    link: "#riwa",
  },
  {
    name: "Services",
    link: "#services",
  },
  {
    name: "Projects",
    link: "#projects",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
  {
    name: "Contact",
    link: "#contact",
  },
];

export default function Navbar() {
  const [hasMounted, setHasMounted] = useState(false);
  const [hideNavOnScroll, setHideNavOnScroll] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const burgerBtnRef = useRef<HTMLDivElement>(null);

  // Triggers on mount slide down animation for navbar
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Hide navbar when scrolling down, show when scrolling up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    setHideNavOnScroll(latest > previous && latest > 50);
  });

  // Close mobile menu if user clicks outside the menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !burgerBtnRef.current?.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // reduce other links opacity when one is hovered
  const [localHover, setLocalHover] = useState(false);

  return (
    <motion.header
      className={
        "z-100 side-padding sticky top-0 flex w-full items-center justify-between bg-transparent py-6 text-white lg:mix-blend-difference " +
        (mobileMenuOpen
          ? " "
          : " mix-blend-difference")
      }
      initial={{ opacity: 0, y: "-100%" }}
      animate={
        hideNavOnScroll && !mobileMenuOpen
          ? { opacity: 0, y: "-100%" }
          : { opacity: 1, y: "0%" }
      }
      transition={{
        ease: "easeInOut",
        duration: hasMounted ? 0.5 : 0.7,
        delay: hasMounted ? 0 : 0.3,
      }}
    >
      {/* Big Screen Navigation Links */}
      <nav className="navlink flex w-full items-center justify-between">
        {LINKS.map((link, i) => (
          <div
            key={i}
            className={"text-white " + (i !== 0 && " max-lg:hidden")}
          >
            <HoverLink
              localHover={localHover}
              setLocalHover={setLocalHover}
              href={link.link}
              key={i}
            >
              {link.name}
            </HoverLink>
          </div>
        ))}
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="z-1 relative flex w-full items-center justify-end gap-4 lg:hidden">
        {/* Mobile Burger Menu */}
        <div
          ref={burgerBtnRef}
          className="w-7"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <BurgerMenuSvg isOpen={mobileMenuOpen} />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <MobileNavMenu
        ref={mobileMenuRef}
        isOpen={mobileMenuOpen}
        setIsOpen={setMobileMenuOpen}
      />
    </motion.header>
  );
}
