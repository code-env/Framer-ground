import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ link, isFooter }: { link?: string; isFooter?: boolean }) => {
  return (
    <Link
      className="flex items-center gap-2 text-white"
      href={link ? link : "/"}
    >
      <Image
        className=""
        src="/logo.svg"
        alt={`${siteConfig.name} logo`}
        width={30}
        height={30}
      />
      <p className={cn("font-bold text-xl hidden md:flex", isFooter && "flex")}>
        {siteConfig.name}
      </p>
    </Link>
  );
};

export default Logo;
