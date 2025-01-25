"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import AnimatedArrow from "@/app/(hand-crafted)/icons/animated-arrow";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { fadeIn, stagger } from "@/constants";

const CallToAction = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <section className="w-full pb-40">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-col items-center space-y-4 text-center"
        >
          <div>
            <motion.h2
              variants={fadeIn}
              className="text-3xl font-bold tracking-tighter"
            >
              Start Building with Framer-ground
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="mx-auto max-w-[700px] text-muted-foreground md:text-lg"
            >
              Build for developers by developers.
            </motion.p>
          </div>
          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/docs"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={buttonVariants({ size: "lg" })}
            >
              <span className="mr-2"> View Documentation</span>
              <AnimatedArrow isHovered={isHovered} />
            </Link>
            <Link
              href={siteConfig.links.github}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <Icons.gitHub className="size-4 mr-2" />
              Star on GitHub
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
