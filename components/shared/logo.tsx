import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icons } from "@/components/icons";

const Logo = ({
  link,
  isFooter,
  home,
}: {
  link?: string;
  isFooter?: boolean;
  home?: boolean;
}) => {
  return (
    <Link className="flex items-center gap-2" href={link ? link : "/"}>
      <Icons.logo /> <span className="font-semibold">{siteConfig.name}</span>
    </Link>
  );
};

export default Logo;
