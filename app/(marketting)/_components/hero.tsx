"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import AnimatedArrow from "@/app/(hand-crafted)/icons/animated-arrow";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { fadeIn, projectUrl, stagger } from "@/constants";
import think from "@/public/think.jpg";

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
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl flex gap-3 2xl:text-8xl gradient-text py-3 dark:from-neutral-200 dark:to-neutral-500"
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
                    className="w-full object-cover grayscale hover:grayscale-0 duration-150 transition-all cursor-pointer"
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

export default Hero;
