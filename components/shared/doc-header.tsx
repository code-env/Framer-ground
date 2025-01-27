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
    <div className="md:hidden  sticky top-0 h-14 border-b flex items-center justify-between bg-background/50 backdrop-blur-md xl:px-10 px-4 z-50 gap-4">
      <div className="block md:hidden">
        <Logo />
      </div>
      <div
        className="flex rounded-md items-center gap-2 border py-1 pl-4 pr-1 cursor-pointer lg:mstagram from my phone so I can't do thatax-w-sm w-full max-w-md justify-between bg-background"
        onClick={() => setShowCommandMenu((prev) => !prev)}
      >
        <p className="text-muted-foreground flex items-center gap-2">
          <Search className="size-4" />
          <span className="text-sm">Find something...</span>
        </p>
        <span className="border rounded-sm text-sm py-1 px-2">cmd+k</span>
      </div>
    </div>
  );
};

export default DocsHeader;
