"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  {
    name: "Sonnet 3.5",
    description: "Advanced reasoning",
    icon: User,
  },
  {
    name: "llama 3.2",
    description: "Versatile problem solving",
    icon: User,
  },
  {
    name: "Quen 2.5",
    description: "Rapid text generation",
    icon: User,
  },
  {
    name: "Gemma 2",
    description: "Efficient task completion",
    icon: User,
  },
];

const transition = { type: "spring", bounce: 0, duration: 0.4 };

const Options = () => {
  const [status, setStatus] = useState<string>("idle");
  const isOpen = status === "open";
  const isHovered = status === "hovered";
  const [active, setActive] = useState(0);

  return (
    <div className="h-screen center">
      <AnimatePresence>
        {isOpen || isHovered ? (
          <motion.div
            layoutId="option-container"
            style={{ borderRadius: 22, width: 400 }}
            className="tracking-tight p-5 border flex flex-col gap-4"
          >
            <div className="flex w-full items-center justify-between">
              <motion.span className="relative">Choose Model</motion.span>
              <div className="relative">
                <AnimatePresence>
                  {isHovered && (
                    <motion.p
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="absolute -left-11 top-0.5 text-sm "
                    >
                      Close
                    </motion.p>
                  )}
                </AnimatePresence>
                <motion.button
                  layout
                  onClick={() => setStatus("idle")}
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -20, y: 10 }}
                  transition={{ ...transition, delay: 0.15 }}
                  whileTap={{
                    scale: 0.9,
                    transition: { ...transition, duration: 0.2 },
                  }}
                  onHoverStart={() => setStatus("hovered")}
                  onHoverEnd={() => setStatus("open")}
                  className="size-6 flex items-center justify-center rounded-full bg-background"
                >
                  <X className="size-4 text-tight text-secondary-foreground" />
                </motion.button>
              </div>
            </div>
            <div className="flex flex-col  overflow-clip">
              {options.map((option, index) => (
                <motion.div
                  key={index}
                  onClick={() => {
                    setStatus("iddle");
                    setActive(index);
                  }}
                  className="flex items-center  cursor-pointer"
                >
                  <Option option={option} active={false} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            layoutId="option-container"
            style={{
              borderRadius: 10,
              width: 250,
            }}
            className="border p-2 flex items-center cursor-pointer"
            onClick={() => setStatus("open")}
          >
            <div className="w-full flex items-center justify-between">
              <Option option={options[active]} active={true} />
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ ...transition, delay: 0.15 }}
                layoutId={`active-profile-icon-${options[active].name}`}
              >
                <ChevronDown className="size-4 text-secondary-foreground" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Option = ({
  option,
  active,
}: {
  option: (typeof options)[number];
  active: boolean;
}) => {
  return (
    <motion.div
      className={cn(
        "flex items-center gap-2 w-full",
        !active && "hover:bg-muted/30 p-2 rounded-lg"
      )}
    >
      <motion.div
        layoutId={`active-profile-${option.name}`}
        className="size-12 border rounded-full center"
      >
        <option.icon className="size-4" />
      </motion.div>
      <div>
        <motion.p
          layoutId={`active-profile-name-${option.name}`}
          className="text-base font-semibold"
        >
          {option.name}
        </motion.p>
        {!active && (
          <motion.p
            layoutId={`active-profile-description-${option.name}`}
            className="text-muted-foreground text-sm"
          >
            {option.description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default Options;
