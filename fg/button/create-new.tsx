"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BellRing,
  ClipboardList,
  Flag,
  Folder,
  Plus,
  StickyNote,
  Trophy,
  X,
} from "lucide-react";
import { useState } from "react";

const transition = { type: "spring", bounce: 0, duration: 0.4 };

const Items = [
  {
    name: "Project",
    icon: Folder,
  },
  {
    name: "Task",
    icon: ClipboardList,
  },
  {
    name: "Note",
    icon: StickyNote,
  },
  {
    name: "Goal",
    icon: Trophy,
  },
  {
    name: "Milestone",
    icon: Flag,
  },
  {
    name: "Reminder",
    icon: BellRing,
  },
];

const CreateNew = () => {
  const [status, setStatus] = useState<string>("idle");
  const isOpen = status === "open";
  const isHovered = status === "hovered";

  return (
    <div className="size-full center">
      <AnimatePresence>
        {isOpen || isHovered ? (
          <motion.div
            layoutId="Wrapper"
            style={{ borderRadius: 22 }}
            className="bg-primary tracking-tight text-primary-foreground"
          >
            <div className="flex w-full items-center justify-between py-2.5 pl-5 pr-2.5">
              <motion.span layoutId="create-new" className="relative">
                Create New
              </motion.span>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1, scale: 0.95 } : { opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2.5 rounded-[22px] bg-muted-foreground p-2.5 border"
            >
              <div className="grid grid-cols-3 gap-2.5 ">
                {Items.map((item, index) => (
                  <button
                    key={index}
                    className="size-24 grid cursor-pointer place-items-center rounded-2xl bg-background transition duration-500 ease-in-out hover:bg-background hover:duration-200 active:scale-90"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <item.icon className="text-muted-foreground" />
                      <p className="text-[#6b6967]">{item.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.button
            layoutId="Wrapper"
            onClick={() => setStatus("open")}
            whileTap={{ scale: 0.95 }}
            style={{ borderRadius: 22 }}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground px-5 py-2.5 tracking-tight"
          >
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ...transition, delay: 0.05 }}
            >
              <Plus className="size-4" />
            </motion.div>
            <motion.span layoutId="create-new" className="relative">
              Create New
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateNew;
