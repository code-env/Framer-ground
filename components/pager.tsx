"use client";

import Link from "next/link";
import { Doc } from "contentlayer/generated";

import { buttonVariants } from "@/components/ui/button";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { NavItem, NavItemWithChildren } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import Arrow from "./shared/arrow";

interface DocsPagerProps {
  doc: Doc;
}

export function DocsPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredRight, setIsHoveredRight] = useState(false);
  const [isHoveredLeft, setIsHoveredLeft] = useState(false);

  if (!pager) {
    return null;
  }

  return (
    <div className="flex flex-row items-center !justify-between">
      {pager?.prev?.href && (
        <Link
          href={pager.prev.href}
          className={buttonVariants({
            variant: "outline",
            className: "flex items-center gap-2",
          })}
          onMouseEnter={() => {
            setIsHoveredLeft(true);
            setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Arrow isHovered={isHoveredLeft && isHovered} angle={180} />

          {pager.prev.title}
        </Link>
      )}
      {pager?.next?.href && (
        <Link
          href={pager.next.href}
          className={buttonVariants({
            variant: "outline",
            className: "flex items-center gap-2 ml-auto",
          })}
          onMouseEnter={() => {
            setIsHoveredRight(true);
            setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          {pager.next.title}
          <Arrow isHovered={isHoveredRight && isHovered} />
        </Link>
      )}
    </div>
  );
}

export function getPagerForDoc(doc: Doc) {
  const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null];
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link?.href
  );
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

export function flatten(links: NavItemWithChildren[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      return flat.concat(link.items?.length ? flatten(link.items) : link);
    }, [])
    .filter((link) => !link?.disabled);
}
