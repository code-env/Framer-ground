"use client";

import { Button } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/lamp";
import { fadeIn, stagger } from "@/constants";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

const CallToAction = () => {
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
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-background"
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
              <Button size="lg">View Documentation</Button>
              <Button size="lg" variant="outline">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </LampContainer>
  );
};

export default CallToAction;
