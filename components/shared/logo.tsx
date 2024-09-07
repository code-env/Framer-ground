import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
    <Link
      className="flex items-center gap-2 text-white"
      href={link ? link : "/"}
    >
      {!home ? (
        <>
          <Image
            className="block dark:hidden"
            src="/logo-dark.svg"
            alt={`${siteConfig.name} logo`}
            width={30}
            height={30}
          />
          <Image
            className="hidden dark:block"
            src="/logo.svg"
            alt={`${siteConfig.name} logo`}
            width={30}
            height={30}
          />
        </>
      ) : (
        <Image
          src="/logo.svg"
          alt={`${siteConfig.name} logo`}
          width={30}
          height={30}
        />
      )}
      <p
        className={cn(
          "font-bold text-xl hidden md:flex text-black dark:text-white",
          isFooter && "flex",
          home && "text-white"
        )}
      >
        {siteConfig.name}
      </p>
    </Link>
  );
};

export default Logo;
