"use client";
import React from "react";
import { ExternalLink, Globe, MoreHorizontal, Search } from "lucide-react";

import Logo from "./logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { useProvider } from "@/context/command-menu";

const links = [
  {
    item: "Portfolio",
    url: siteConfig.links.user,
    icon: Globe,
  },
  {
    item: "Twitter",
    url: siteConfig.links.twitter,
    icon: Icons.twitter,
  },
  {
    item: "GitHub",
    url: siteConfig.links.ghuser,
    icon: Icons.gitHub,
  },
];

const DocsActions = () => {
  const { setShowCommandMenu } = useProvider();
  return (
    <div className="px-4 space-y-1.5">
      <div className="h-12 border-b flex items-center justify-between">
        <Logo withText />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="!size-8 bg-transparent border-transparent outline-none"
            >
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {links.map((link, idx) => (
              <DropdownMenuItem asChild className="py-2">
                <Link
                  href={link.url}
                  target="_blank"
                  className="flex items-center justify-between text-muted-foreground"
                >
                  <span className="flex items-center gap-2">
                    <link.icon className="size-4 " />
                    <span>{link.item}</span>
                  </span>
                  <ExternalLink className="size-4" />
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className="md:flex rounded-md hidden items-center gap-2 border py-1 pl-4 pr-1 cursor-pointer lg:max-w-sm w-full max-w-md justify-between"
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

export default DocsActions;
