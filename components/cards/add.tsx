"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const Add = () => {
  const [isActive, setIsActive] = useState(false);

  const variants = {
    initial: {
      width: 50,
      height: 50,
    },
    hovering: {
      width: 200,
      height: 50,
    },
    active: {
      width: 400,
      height: 500,
    },
  };
  return (
    <div className="h-screen relative w-full center">
      <div className="h-[500px] w-[400px] flex items-start relative">
        <motion.div
          variants={variants}
          initial="initial"
          animate={isActive ? "active" : "initial"}
          whileHover={!isActive ? "hovering" : undefined}
          onClick={() => setIsActive(true)}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className={cn(
            "border-dashed rounded-[25px] border-black/90 border overflow-hidden cursor-pointer relative",
            {
              "cursor-default": isActive,
            }
          )}
        >
          <motion.button
            className={cn(
              "h-[50px] rounded-full w-[50px] center cursor-pointer pointer-events-none absolute right-0 transition-all duration-300",
              isActive && "right-0 rotate-45 pointer-events-auto"
            )}
            onClick={() => setIsActive(false)}
          >
            <Plus className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Add;
