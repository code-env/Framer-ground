"use client";

import * as React from "react";

import { useMounted } from "@/hooks/use-mounted";
import { TableOfContents } from "@/lib/toc";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TocProps {
  toc: TableOfContents;
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
          .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
          .flat()
          .map((id) => id?.split("#")[1] ?? "")
          .filter(Boolean)
        : [],
    [toc],
  );
  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  if (!toc?.items || !mounted) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  );
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string>();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
    );

    itemIds?.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContents;
  level?: number;
  activeItem?: string;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none relative pl-3", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0  relative py-1")}>
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline hover:text-foreground transition-all duration-200",

                {
                  "text-primary": item.url === `#${activeItem}`,
                  "text-muted-foreground": item.url !== `#${activeItem}`,
                },
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}

            {item.url === `#${activeItem}` && (
              <motion.div
                layoutId="toc-active-toc-indicator"
                className={cn(
                  "absolute h-full bg-primary rounded-full w-1 top-0 bottom-0 my-auto",
                )}
                style={{ left: level === 1 ? -13 : level * -12 + -5 }}
              />
            )}
          </li>
        );
      })}
      {level === 1 && (
        <div className="absolute left-0 top-0 h-full w-[1px] bg-muted rounded-full" />
      )}
    </ul>
  ) : null;
}
