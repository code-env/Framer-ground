"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Add = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<string>("idle");
  const isOpen = status === "open";
  const isHovered = status === "hovered";

  const variants = {
    initial: {
      width: 50,
      height: 50,
    },
    hovering: {
      width: 200,
      height: 50,
    },
  };

  const buttonSpanVariant = {
    initial: {
      opacity: 0,
    },
    hovering: {
      opacity: 1,
    },
  };

  const transition = {
    type: "spring",
    stiffness: 260,
    damping: 20,
  };

  return (
    <div className="h-screen relative w-full center">
      <div className="h-[500px] w-[400px] flex items-start relative">
        <AnimatePresence>
          {!isOpen ? (
            <motion.button
              onClick={() => setStatus("open")}
              layoutId="notifications"
              className="size-12 border center"
              style={{
                borderRadius: 24,
              }}
            >
              <Bell />
            </motion.button>
          ) : (
            <motion.div
              layoutId="notifications"
              className="flex border p-4"
              style={{
                width: 300,
                height: 500,
                borderRadius: 24,
              }}
            >
              <motion.div className="w-full h-fit flex items-center justify-between">
                <Bell />
                <button onClick={() => setStatus("idle")}>
                  <X />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Add;
