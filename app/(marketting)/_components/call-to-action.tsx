"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import AnimatedArrow from "@/app/(hand-crafted)/icons/animated-arrow";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/lamp";
import { siteConfig } from "@/config/site";
import { fadeIn, stagger } from "@/constants";

const CallToAction = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <LampContainer>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl font-bold tracking-tighter sm:text-5xl"
            >
              Start Building with Framer-ground
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
            >
              Join thousands of developers creating stunning animated interfaces
              with ease.
            </motion.p>
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
                <Icons.gitHub className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </LampContainer>
  );
};

export default CallToAction;
