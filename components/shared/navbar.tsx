"use client";

import { CommandIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimateEnter } from "@/components/shared/animate-enter";
import { Icons } from "@/components/shared/icons";
import Logo from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import MoodToogle from "../mode-toggle";
import { useProvider } from "@/context/command-menu";

const Navbar = () => {
  const { setShowCommandMenu } = useProvider();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleIsActive(href: string) {
    return pathname === href;
  }

  const navbarItems = [
    {
      title: "Get Started",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs",
    },
    {
      title: "Templates",
      href: "/templates",
      label: "New",
    },
  ];

  return (
    <header
      className={cn(
        "fixed w-full z-40 h-16 top-0 left-0 right-0 backdrop-blur-lg border-b border-transparent",
        isScrolled && "bg-black/80 border-border/40 text-white"
      )}
    >
      <nav className="mx-auto max-w-[1350px] px-4 flex items-center justify-between gap-6 h-full">
        <AnimateEnter className="flex items-center gap-5">
          <Logo />
          {
            // Navbar items
            navbarItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "text-sm leading-none max-sm:hidden flex items-center",
                  handleIsActive(item.href)
                    ? "text-primary"
                    : "duration-150 hover:text-primary"
                )}
              >
                {item.title}
                {item.label && (
                  <span className="text-xs bg-lime-300  text-black rounded-md px-1.5 ml-1">
                    {item.label}
                  </span>
                )}
              </Link>
            ))
          }
        </AnimateEnter>
        <AnimateEnter
          delay={0.2}
          className="flex flex-1 items-center gap-4 justify-end"
        >
          <div
            onClick={() => setShowCommandMenu(true)}
            className="max-sm:flex-1 w-auto flex items-center justify-between gap-6 sm:w-56 px-3 py-1.5 rounded-lg border text-sm  duration-300 hover:bg-accent cursor-pointer"
          >
            <span className="flex items-center gap-2 text-neutral-500">
              <SearchIcon size={12} />
              Search...
            </span>
            <span className="border border-border px-1.5 rounded-md text-[10px] flex items-center gap-0.5 max-sm:hidden">
              <CommandIcon size={10} />
              <span>K</span>
            </span>
          </div>
          <Link
            href="https://github.com/code-env/framer-ground"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md duration-150 hover:text-primary"
          >
            <Icons.gitHub className="fill-secondary w-4 h-4" />
          </Link>
          <Link
            href="https://x.com/bossadizenith"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md duration-150 fill-primary"
          >
            <Icons.twitter className="w-3.5 h-3.5" />
          </Link>
          <MoodToogle />
        </AnimateEnter>
      </nav>
    </header>
  );
};

export default Navbar;
