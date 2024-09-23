"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types";
import { Icons } from "./icons";

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
        const Icon = item.icon && Icons[item.icon as keyof typeof Icons];

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
          <div key={index} className="z-0 ">
            <div className="cursor-pointer z-50" onClick={toggle}>
              <h4 className="mb-1 flex items-center gap-1 rounded-md py-1 pr-2 text-sm font-semibold">
                {Icon ? (
                  <Icon className="w-4" />
                ) : (
                  <ChevronDown
                    className={cn(
                      "w-4 transform transition-all hover:opacity-50",
                      {
                        "-rotate-90": !isOpen,
                      }
                    )}
                  />
                )}
                {item.title}
                {Boolean(item.items?.length || item.label) &&
                  index >= specialHeaderCount && (
                    <span className="flex aspect-square items-center justify-center rounded-full bg-gray-200 px-1 py-0.5 text-[10px] leading-none text-[#000000] no-underline">
                      {item.label || item.items?.length}
                    </span>
                  )}
              </h4>
            </div>
            {!!item?.items?.length && (
              <div
                className={cn("pb-3 pl-3 relative", {
                  hidden: !isOpen,
                })}
              >
                <DocsSidebarNavItems items={item.items} pathname={pathname} />
              </div>
            )}
            {index === specialHeaderCount - 1 && (
              <div className="mb-1 mt-2 pl-4 text-xs font-semibold uppercase text-muted-foreground">
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
type NavState = {
  opacity: number;
  top: number;
  height: number;
};

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  const [hoverState, setHoverState] = useState<NavState>({
    opacity: 0,
    top: 0,
    height: 0,
  });
  const [activeState, setActiveState] = useState<NavState>({
    opacity: 1,
    top: 0,
    height: 0,
  });
  const [active, setActive] = useState<string | null>(null); // Now a string (title or href)
  const [isHovering, setIsHovering] = useState(false);

  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const currentIndex = items.findIndex(
      (item) => item.href === pathname || item.title === active
    );

    if (itemRefs.current[currentIndex]) {
      const { offsetTop, offsetHeight } = itemRefs.current[currentIndex];
      setActiveState({
        opacity: 1,
        top: offsetTop,
        height: offsetHeight,
      });
    }
  }, [active, pathname, items]);

  const handleMouseEnter = (index: number) => {
    if (!itemRefs.current[index]) return;
    const { offsetTop, offsetHeight } = itemRefs.current[index];
    setHoverState({
      opacity: 1,
      top: offsetTop,
      height: offsetHeight,
    });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setHoverState((prev) => ({
      ...prev,
      opacity: 0,
    }));
    setIsHovering(false);
  };

  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            href={item.href}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setActive(item.href || item.title)}
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 capitalize z-10",
              pathname === item.href
                ? "bg-muted font-normal text-foreground"
                : "text-muted-foreground"
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
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
              item.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </span>
        )
      )}
      <motion.div
        animate={isHovering ? hoverState : activeState}
        className="absolute bg-muted rounded z-0 h-full"
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{
          top: hoverState.top,
          height: hoverState.height,
          width: "100%",
        }}
      />
    </div>
  ) : null;
}

export default DocsSidebar;
