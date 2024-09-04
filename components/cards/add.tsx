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
    <div className="h-screen relative w-full">
      <div className="absolute top-20 left-0 right-0 mx-auto w-[500px]">
        <motion.button className="h-[50px] rounded-full w-[50px] center">
          {/* <Plus className="h-5 w-5" />
          <span>New site</span> */}
        </motion.button>
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
            "border-dashed absolute top-0 rounded-[25px] border-black/90 border overflow-hidden cursor-pointer",
            {
              "cursor-default": isActive,
            }
          )}
        ></motion.div>
      </div>
    </div>
  );
};

export default Add;
