"use client";

import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
} from "framer-motion";
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
import React from "react";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

function InnerContent() {
  const ctx = React.useContext(Context);
  const isOpen = ctx.status === "open";
  const isHovered = ctx.status === "hovered";

  return (
    <div className="h-screen border-y border-red-500 center">
      <AnimatePresence>
        {isOpen || isHovered ? (
          <motion.div
            layoutId="container"
            style={{ borderRadius: 22 }}
            className="bg-[#f7f6ef] tracking-tight text-[#6b6967] shadow-mixed ring-2 ring-black/[8%]"
          >
            <div className="flex w-full items-center justify-between py-2.5 pl-5 pr-2.5">
              <motion.span layoutId="label" className="relative">
                Create New
              </motion.span>
              <div className="relative">
                <AnimatePresence>
                  {isHovered && (
                    <motion.p
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="absolute -left-11 top-0.5 text-sm text-[#6b6967]/70"
                    >
                      Close
                    </motion.p>
                  )}
                </AnimatePresence>
                <motion.button
                  layout
                  onClick={() => ctx.setStatus("idle")}
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -20, y: 10 }}
                  transition={{ ...transition, delay: 0.15 }}
                  whileTap={{
                    scale: 0.9,
                    transition: { ...transition, duration: 0.2 },
                  }}
                  onHoverStart={() => ctx.setStatus("hovered")}
                  onHoverEnd={() => ctx.setStatus("open")}
                  className="size-6 flex items-center justify-center rounded-full bg-[#b8b6af]"
                >
                  <X
                    strokeWidth={4}
                    className="size-4 text-tight text-[#fafafa]"
                  />
                </motion.button>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={
                isHovered
                  ? { opacity: 1, scaleX: 0.95, scaleY: 0.92 }
                  : { opacity: 1 }
              }
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2.5 rounded-[22px] bg-[#fafafa] p-2.5 shadow-[0_-3px_3px_-1.5px_rgba(0,0,0,0.08)] ring-1 ring-black/[8%]"
            >
              <div className="flex gap-2.5 text-[#b8b6af]">
                <button
                  onClick={() => ctx.setStatus("idle")}
                  className="size-24 grid cursor-pointer place-items-center rounded-2xl bg-[#fefefe] transition duration-500 ease-in-out hover:bg-[#f6f4f0] hover:duration-200 active:scale-90"
                >
                  <div className="flex flex-col items-center gap-1">
                    <Folder />
                    <p className="text-[#6b6967]">Project</p>
                  </div>
                </button>
                <button
                  onClick={() => ctx.setStatus("idle")}
                  className="size-24 grid cursor-pointer place-items-center rounded-2xl bg-[#fefefe] transition duration-500 ease-in-out hover:bg-[#f6f4f0] hover:duration-200 active:scale-90"
                >
                  <div className="flex flex-col items-center gap-1">
                    <ClipboardList />
                    <p className="text-[#6b6967]">Task</p>
                  </div>
                </button>
                <button
                  onClick={() => ctx.setStatus("idle")}
                  className="size-24 grid cursor-pointer place-items-center rounded-2xl bg-[#fefefe] transition duration-500 ease-in-out hover:bg-[#f6f4f0] hover:duration-200 active:scale-90"
                >
                  <div className="flex flex-col items-center gap-1">
                    <StickyNote />
                    <p className="text-[#6b6967]">Note</p>
                  </div>
                </button>
              </div>
              <div className="flex gap-2.5 text-[#b8b6af]">
                <button
                  onClick={() => ctx.setStatus("idle")}
                  className="size-24 grid cursor-pointer place-items-center rounded-2xl bg-[#fefefe] transition duration-500 ease-in-out hover:bg-[#f6f4f0] hover:duration-200 active:scale-90"
                >
                  <div className="flex flex-col items-center gap-1">
                    <Trophy />
                    <p className="text-[#6b6967]">Goal</p>
                  </div>
                </button>
                <button
                  onClick={() => ctx.setStatus("idle")}
                  className="size-24 grid cursor-pointer place-items-center rounded-2xl bg-[#fefefe] transition duration-500 ease-in-out hover:bg-[#f6f4f0] hover:duration-200 active:scale-90"
                >
                  <div className="flex flex-col items-center gap-1">
                    <Flag />
                    <p className="text-[#6b6967]">Milestone</p>
                  </div>
                </button>
                <button
                  onClick={() => ctx.setStatus("idle")}
                  className="size-24 grid cursor-pointer place-items-center rounded-2xl bg-[#fefefe] transition duration-500 ease-in-out hover:bg-[#f6f4f0] hover:duration-200 active:scale-90"
                >
                  <div className="flex flex-col items-center gap-1">
                    <BellRing />
                    <p className="text-[#6b6967]">Reminder</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.button
            layoutId="container"
            onClick={() => ctx.setStatus("open")}
            whileTap={{ scale: 0.95 }}
            style={{ borderRadius: 22 }}
            className="flex items-center gap-1.5 bg-[#fafafa] px-5 py-2.5 tracking-tight text-[#202020] shadow-mixed ring-1 ring-black/[8%] transition-[box-shadow] active:shadow-none"
          >
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ...transition, delay: 0.05 }}
            >
              <Plus strokeWidth={1} />
            </motion.div>
            <motion.span layoutId="label" className="relative">
              Create New
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomePage() {
  const [status, setStatus] = React.useState("idle");

  React.useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setStatus("idle");
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setStatus]);

  return (
    <Context.Provider value={{ status, setStatus }}>
      <MotionConfig transition={transition}>
        <main className="relative flex h-screen items-center justify-center bg-[#fdfdfc] font-medium">
          <InnerContent />
        </main>
      </MotionConfig>
    </Context.Provider>
  );
}
