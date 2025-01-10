"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types";

export interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

const DocsSidebar = ({ items }: DocsSidebarNavProps) => {
  const pathname = usePathname();
  const [closed, setClosed] = useState(new Set<string>());

  useEffect(() => {
    setClosed((current) => {
      const next = new Set(current);
      // Open the current section if one of the child pages is active
      const path = "/docs/" + pathname.split("/")[1];
      if (next.has(path)) {
        next.delete(path);
      }
      return next;
    });

    const node = document.querySelector(`[href="${pathname}"]`);
    if (node) {
      node.scrollIntoView({ behavior: "instant", block: "nearest" });
    }
  }, [pathname]);

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => {
        const isOpen = !closed.has(item.href ?? item.title);

        const toggle = () => {
          setClosed((prev) => {
            const next = new Set(prev);
            if (isOpen) {
              next.add(item.href ?? item.title);
            } else {
              next.delete(item.href ?? item.title);
            }
            return next;
          });
        };

        const specialHeaderCount = 2; // Getting started & contributing;

        return (
          <div key={index} className="z-">
            <div className="z-50 cursor-pointer " onClick={toggle}>
              <h4 className="mb-1 flex items-center gap-1 rounded-md py-1 text-sm font-semibold">
                {item.title}
              </h4>
            </div>
            {!!item?.items?.length && (
              <div
                className={cn("relative", {
                  hidden: !isOpen,
                })}
              >
                <DocsSidebarNavItems items={item.items} pathname={pathname} />
                <div className="absolute top-0 left-2 w-[1px] h-full bg-accent" />
              </div>
            )}
            {index === specialHeaderCount - 1 && (
              <div className="mb-1 mt-4 text-xs font-semibold uppercase text-muted-foreground">
                COMPONENTS
              </div>
            )}

          </div>
        );
      })}
    </div>
  ) : null;
};

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm gap-1 relative">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            href={item.href}
            // onClick={() => setActive(item.href || item.title)}
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-4 py-1 capitalize z-10 relative text-muted-foreground transition-all duration-300 hover:bg-muted/50",
              { "text-primary bg-muted/50": item.href === pathname }
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-lime-300 px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
            {item.href === pathname && (
              <motion.div
                layoutId="active-route-indicator"
                className="absolute top-0 left-[5px] bg-primary w-1 rounded-xl h-full"
              />
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
            )}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </span>
        ),
      )}
    </div>
  ) : null;
}

export default DocsSidebar;
