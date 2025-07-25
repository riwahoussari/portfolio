import { AnimatePresence, motion } from "motion/react";
import { MouseEventHandler } from "react";
import Link from "next/link";
import { useLenis } from "../Global/LenisScrollWrapper";

const LINKS = [
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

export default function MobileNavMenu({
  isOpen,
  setIsOpen,
  ref,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={ref} // Attach the ref to track clicks outside
          variants={menuSlide}
          initial="initial"
          animate="enter"
          exit="exit"
          className="bg-background text-foreground absolute left-0 right-0 top-0 z-0 h-dvh pb-6 lg:hidden"
        >
          <nav>
            {LINKS.map((link, i) => (
              <MobileNavLink
                key={link.link} // Use unique key for better React reconciliation
                index={i}
                href={link.link}
                onClick={() => setIsOpen(false)} // Close menu on link click
              >
                {link.name}
              </MobileNavLink>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Motion animation variants for the menu slide-in effect
const menuSlide = {
  initial: { y: "-100%" }, // Start off-screen above
  enter: { y: "0%", transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { y: "-100%", transition: { duration: 0.5, ease: "easeInOut" } },
};

// Component for individual navigation links
function MobileNavLink({
  index,
  onClick,
  href,
  ...props
}: {
  href: string;
  index: number;
  onClick: MouseEventHandler<HTMLDivElement>;
} & React.ComponentProps<typeof Link>) {

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
      console.log("lenis");
      lenis.scrollTo(y, { immediate: false, duration: Math.min(duration, 3) });
    } else {
      console.log("NOT lenis");
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      custom={LINKS.length - index} // Pass custom value for staggered animation
      variants={linkSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      onClick={onClick}
      className="cursor-pointer"
    >
      <a
        onClick={handleClick}
        href={href}
        {...props}
        className="text-foreground display-1 side-padding-15 text-[min(120px,15vw)]! flex h-[25vh] cursor-pointer items-center"
      >
        {props.children}
      </a>
    </motion.div>
  );
}

// Motion animation variants for individual link animations
const linkSlide = {
  initial: { y: "-200%" }, // Start off-screen above
  enter: (i: number) => ({
    y: "0%", // Animate to normal position
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 0.1 * i, // Staggered effect for each link
    },
  }),
};
