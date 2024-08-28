"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, stagger } from "@/constants";
import { Button } from "@/components/ui/button";

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
              <Button>Get Started</Button>
              <Button
                variant="outline"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="mr-2">Learn More</span>

                <motion.svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : -10,
                      width: 20,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ x: 0 }}
                    animate={{ x: isHovered ? 0 : -7 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.svg>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
