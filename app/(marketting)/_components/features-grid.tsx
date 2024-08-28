"use client";

import React from "react";
import { motion } from "framer-motion";

import { fadeIn, stagger } from "@/constants";

const FeaturesGrid = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {[
            "Cards",
            "Galleries",
            "Navbars",
            "Buttons",
            "Inputs",
            "Modals",
            "Tooltips",
            "Sliders",
          ].map((item, index) => (
            <motion.div
              key={item}
              variants={fadeIn}
              className="flex flex-col items-center space-y-2 p-4 bg-background/ rounded-lg shadow-sm"
            >
              <div className="p-2 bg-primary/10 rounded-full">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="w-10 h-10 bg-primary rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold">{item}</h3>
              <p className="text-sm text-muted-foreground text-center">
                Beautifully animated {item.toLowerCase()} for your web projects
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
