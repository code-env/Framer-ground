import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icons } from "@/components/icons";

interface LogoProps {
  className?: string;
  link?: string;
  withText?: boolean;
}

const Logo = ({ link, withText, className }: LogoProps) => {
  return (
    <Link
      className={cn("flex items-center gap-2", className)}
      href={link ? link : "/"}
    >
      <Icons.logo />{" "}
      {withText && <span className="font-semibold">{siteConfig.name}</span>}
    </Link>
  );
};

export default Logo;
