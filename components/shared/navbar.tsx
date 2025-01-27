"use client";

import { CommandIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimateEnter } from "@/components/shared/animate-enter";
import { Icons } from "@/components/shared/icons";
import Logo from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import ModeToggle from "../mode-toggle";
import { useProvider } from "@/context/command-menu";
import { siteConfig } from "@/config/site";

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

  return (
    <header
      className={cn(
        "sticky w-full z-40 h-16 top-0 backdrop-blur-lg border-b border-transparent",
        {
          "bg-background/80 border-border/40": isScrolled,
        }
      )}
    >
      <nav className="mx-auto max-w-[1350px] px-4 flex items-center justify-between gap-6 h-full">
        <Logo withText />
        <div>
          <AnimateEnter
            delay={0.2}
            className="flex flex-1 items-center justify-end "
          >
            <div
              onClick={() => setShowCommandMenu(true)}
              className="hidden !max-w-lg md:flex w-full  border py-1 pl-4 pr-1 items-center justify-between rounded-lg"
            >
              <span className="flex items-center gap-2 text-neutral-500">
                <SearchIcon className="size-4" />
                Find something...
              </span>

              <span className="border rounded-sm text-sm py-1 px-2">cmd+k</span>
            </div>
            <div className="flex items-center gap-4 md:ml-4">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md duration-150 hover:text-primary"
              >
                <Icons.gitHub className="fill-secondary w-4 h-4" />
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md duration-150 fill-primary"
              >
                <Icons.twitter className="w-3.5 h-3.5" />
              </Link>
            </div>
            <ModeToggle />
          </AnimateEnter>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
