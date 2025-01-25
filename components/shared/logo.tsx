import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icons } from "@/components/icons";

const Logo = ({ link, withText }: { link?: string; withText?: boolean }) => {
  return (
    <Link className="flex items-center gap-2" href={link ? link : "/"}>
      <Icons.logo />{" "}
      {withText && <span className="font-semibold">{siteConfig.name}</span>}
    </Link>
  );
};

export default Logo;
