"use client";

import { useProvider } from "@/context/command-menu";
import { ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import MoodToogle from "@/components/mode-toggle";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import Logo from "./logo";

const routes = [
  { name: "Blog", path: "/blog" },
  { name: "Changelog", path: "/docs/changelog" },
];

const DocsHeader = () => {
  const { setShowCommandMenu } = useProvider();

  return (
    <div className="sticky top-0 h-20 border-b flex items-center justify-between bg-background/50 backdrop-blur-md xl:px-10 px-4 z-50 gap-4">
      <div className="block md:hidden">
        <Logo />
      </div>
      <div
        className="md:flex rounded-md hidden items-center gap-2 border py-2 pl-4 pr-2 cursor-pointer lg:max-w-sm w-full max-w-md justify-between bg-background"
        onClick={() => setShowCommandMenu((prev) => !prev)}
      >
        <p className="text-muted-foreground flex items-center gap-2">
          <Search className="size-4" />
          <span className="text-sm">Find something...</span>
        </p>
        <span className="border rounded-sm text-sm py-1 px-2">cmd+k</span>
      </div>
      <div className="flex items-center gap-6 h-full">
        <ul className="md:flex hidden items-center gap-3 ">
          {routes.map((route, idx) => (
            <li key={idx}>
              <Link
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                href={route.path}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="h-1/2 my-auto w-[2px] bg-border hidden md:block" />
        <MoodToogle showBorder />
        <Link
          href={siteConfig.links.pro}
          className={buttonVariants()}
          target="_blank"
        >
          <span>Go pro</span>
          <ExternalLink className="size-4" />
        </Link>
      </div>
    </div>
  );
};

export default DocsHeader;
