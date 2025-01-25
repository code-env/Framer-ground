"use client";

import { useProvider } from "@/context/command-menu";
import { ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import MoodToogle from "../mode-toggle";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "../ui/button";

const routes = [
  { name: "Blog", path: "/blog" },
  { name: "Changelog", path: "/changelog" },
];

const DocsHeader = () => {
  const { setShowCommandMenu } = useProvider();

  return (
    <div className="sticky top-0 h-20 border-b flex items-center justify-between bg-background/50 backdrop-blur-md px-10 z-50">
      <div
        className="rounded-md flex items-center gap-2 border py-2 pl-6 pr-2 cursor-pointer lg:max-w-xl w-full max-w-md justify-between"
        onClick={() => setShowCommandMenu((prev) => !prev)}
      >
        <p className="text-muted-foreground flex items-center gap-2">
          <Search className="size-4" />
          <span className="">Find something... </span>
        </p>
        <span className="border rounded text-sm py-1 px-2">cmd+k</span>
      </div>
      <div className="flex items-center gap-6 h-full">
        <ul className="flex items-center gap-3">
          {routes.map((route, idx) => (
            <li>
              <Link href={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
        <div className="h-1/2 my-auto w-[2px] bg-border" />
        <MoodToogle showBorder />
        <Link href={siteConfig.links.pro} className={buttonVariants()}>
          <span>Go pro</span>
          <ExternalLink className="size-4" />
        </Link>
      </div>
    </div>
  );
};

export default DocsHeader;
