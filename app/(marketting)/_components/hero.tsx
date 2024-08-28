"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, projectUrl, stagger } from "@/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import AnimatedArrow from "@/app/(hand-crafted)/icons/animated-arrow";
import Link from "next/link";
import { Star } from "lucide-react";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="h-[800px] w-full bg-black  bg-grid-white/10 relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="h-40 w-full absolute bottom-0 bg-gradient-to-b from-transparent via-black/50  to-black" />
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
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-3"
            >
              Rethink the animations on <br className="hidden lg:block" /> your
              websites
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
              <Button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="mr-2">Get Started</span>
                <AnimatedArrow isHovered={isHovered} />
              </Button>
              <Link
                className={buttonVariants({ variant: "outline" })}
                href={projectUrl}
                target="_blank"
              >
                <Star className="mr-2 h-4 w-4 " />
                <span className="mr-2">Star us on GitHub</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
