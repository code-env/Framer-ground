"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import AnimatedArrow from "@/app/(hand-crafted)/icons/animated-arrow";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { fadeIn, projectUrl, stagger } from "@/constants";
import think from "@/public/think.jpg";
import { Icons } from "@/components/icons";

const Hero = ({ stars }: { stars: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="h-[800px] w-full bg-background dark:bg-grid-neutral-500/10 bg-grid-neutral-500/10 relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="h-40 w-full absolute bottom-0 bg-gradient-to-b from-transparent via-background/90 to-background" />
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <motion.h1
              variants={fadeIn}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl flex gap-3 2xl:text-8xl gradient-text py-3 dark:from-neutral-200 dark:to-neutral-500 group"
            >
              <span>Copy.</span>
              <span>Paste.</span>
              <span>
                An
                <div className="relative inline-flex md:w-8 2xl:w-10 md:h-12 w-7 h-8 xl:h-16 2xl:h-20 rounded-full overflow-hidden">
                  <Image
                    src={think}
                    alt={`${siteConfig.name} thinking image`}
                    fill
                    className="w-full object-cover grayscale group-hover:grayscale-0 duration-150 transition-all cursor-pointer"
                  />
                </div>
                mate.
              </span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="mx-auto max-w-[800px] text-muted-foreground md:text-xl xl:text-2xl"
            >
              Elevate your web projects with fine, small animated components.
              Cards, galleries, navbars, buttons, and inputs - all powered by
              Framer Motion.
            </motion.p>
            <motion.div variants={fadeIn} className="space-x-4">
              <Link
                href="/docs"
                className={buttonVariants()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="mr-2">Get Started</span>
                <AnimatedArrow isHovered={isHovered} />
              </Link>
              <Link
                className={buttonVariants({ variant: "outline" })}
                href={projectUrl}
                target="_blank"
              >
                <Star className="mr-2 h-4 w-4 " />
                <span className="mr-2">{stars} Stars on GitHub</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const NewHero = () => {
  const words = ["COPY", "PASTE", "ANIMATE"];
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-40 container flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col max-w-md gap-4">
        <h1 className="text-4xl font-bold flex items-center">
          {words.map((word, idx) => (
            <span key={idx} className="flex items-center relative px-2 py-1">
              {word}
              {idx === index && (
                <motion.span
                  layoutId="active-word-indicator"
                  className="absolute  inset-0 -z-10 border border-neutral-500/20 dark:bg-muted/20 bg-muted/50"
                >
                  <motion.span
                    layoutId="active-indicator-top-left"
                    className="absolute -top-1 -left-1 size-2 bg-neutral-500/20 rounded-full"
                  />
                  <motion.span
                    layoutId="active-indicator-top-right"
                    className="absolute -top-1 -right-1 size-2 bg-neutral-500/20 rounded-full"
                  />
                  <motion.span
                    layoutId="active-indicator-bottom-left"
                    className="absolute -bottom-1 -left-1 size-2 bg-neutral-500/20 rounded-full"
                  />
                  <motion.span
                    layoutId="active-indicator-bottom-right"
                    className="absolute -bottom-1 -right-1 size-2 bg-neutral-500/20 rounded-full"
                  />
                </motion.span>
              )}
            </span>
          ))}
        </h1>
        <p className="text-center text-muted-foreground text-lg">
          Handcrafted animated modern components build for performance and ready
          to use in your app.
        </p>
        <div className="flex items-center gap-4">
          <Link
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={buttonVariants()}
            href="/docs/components"
          >
            <span>View Components</span>
            <AnimatedArrow isHovered={isHovered} />
          </Link>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={projectUrl}
            target="_blank"
          >
            <Icons.gitHub className="size-4" />
            <span className="mr-2">Star on GitHub</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NewHero;
