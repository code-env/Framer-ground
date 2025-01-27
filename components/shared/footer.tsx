"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { AnimateEnter } from "@/components/shared/animate-enter";
import Logo from "@/components/shared/logo";
import { siteConfig } from "@/config/site";

const Footer = () => {
  const footerLinks = [
    {
      href: siteConfig.links.github,
      label: "Source code",
      external: true,
    },
    {
      href: siteConfig.links.ghuser,
      label: "GitHub",
      external: true,
    },
    {
      href: siteConfig.links.twitter,
      label: "Twitter",
      external: true,
    },
    {
      href: siteConfig.links.discord,
      label: "Discord",
      external: true,
    },
    {
      href: siteConfig.links.linkedin,
      label: "LinkedIn",
      external: true,
    },
  ];

  return (
    <footer className="border-t relative z-10 border-border bg-background overflow-hidden">
      <div className="px-8 mx-auto max-w-[1400px] w-full py-16">
        <div className="flex max-md:flex-col gap-10 md:justify-between">
          <div className="flex flex-col gap-5">
            <AnimateEnter>
              <Logo withText />
            </AnimateEnter>

            <AnimateEnter delay={0.1} className="flex flex-col gap-4">
              <p className="text-foreground font-medium text-sm">
                Elevate your web projects with fine, small animated components.
              </p>
              <span className="text-foreground font-medium text-sm ">
                Made with 🩶 by{" "}
                <Link
                  href="https://bossadizenith.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/90 duration-200"
                >
                  Bossadi Zenith.
                </Link>
              </span>
            </AnimateEnter>
          </div>
          <AnimateEnter delay={0.3} className="space-y-4">
            <ul className="text-sm flex flex-col gap-4">
              <Link
                href="/docs"
                className="text-foreground duration-200 hover:text-primary"
              >
                Explore all components
              </Link>
              {footerLinks.map(({ href, label, external }) => (
                <Link
                  key={label}
                  href={href}
                  target={external ? "_blank" : "_self"}
                  rel={external ? "noopener noreferrer" : ""}
                  className="flex items-center gap-1 text-foreground duration-200 hover:text-primary"
                >
                  {label}
                  <ArrowUpRightIcon size={10} />
                </Link>
              ))}
            </ul>
          </AnimateEnter>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
