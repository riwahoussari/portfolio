import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed z-1000 top-0 w-full opacity-">
      <nav className="side-padding navlink flex justify-between items-center py-6 bg-transparent backdrop-blur-md max-md:opacity-0">
        <Link href="">About</Link>
        <Link href="">Services</Link>
        <Link href="">Projects</Link>
        <Link href="">Testimonials</Link>
        <Link href="">Contact</Link>
      </nav>
    </header>
  );
}
