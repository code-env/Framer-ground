"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Logo from "./logo";
import { MarkettingFooterRoutes, MarkettingSocialLinks } from "@/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-500/20 bg-black text-white">
      <div className="container mx-auto px-4 py-12 md:py-24 ">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <Logo isFooter />
            <p className="mt-4 text-sm text-muted-foreground">
              Elevate your web projects with fine, small animated components.
            </p>
          </div>

          {MarkettingFooterRoutes.map((item, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{item.name}</h3>
              <ul className="space-y-2">
                {item.routes.map((item, index) => (
                  <li key={index}>
                    <Link
                      className="text-sm text-muted-foreground hover:text-muted-foreground/80"
                      href={item.path}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-5  mt-20">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Framer-ground. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {MarkettingSocialLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                target="_blank"
                className="text-muted-foreground hover:text-muted-foreground/80"
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
