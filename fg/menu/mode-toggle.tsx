"use client";

import { useMounted } from "@/hooks/use-mounted";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useTheme } from "next-themes";

const ModeToggle = () => {
  const mounted = useMounted();
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      return;
    }

    setTheme("light");
  };

  if (!mounted) return;

  return (
    <div className="size-full rounded-[14px] flex items-center justify-center">
      <MotionConfig
        transition={{
          duration: 0.4,
          type: "tween",
          ease: "easeInOut",
        }}
      >
        <AnimatePresence initial={false}>
          <motion.button
            className={`relative isolate flex  items-center rounded-full p-2 border ${
              theme === "light" ? "justify-end" : "justify-start"
            }`}
            style={{
              height: 100,
              width: 200,
            }}
            animate={{
              backgroundColor: theme === "light" ? "#ffffff" : "#272727",
            }}
            onClick={toggleTheme}
          >
            <motion.div
              className="absolute left-0 -z-10 flex w-full justify-between text-xl font-medium tracking-[0.0475rem]"
              animate={{ color: theme === "light" ? "#797979" : "#A2A2A2" }}
            >
              <span className="flex w-full justify-center">light</span>
              <span className="flex w-full justify-center">dark</span>
            </motion.div>

            <motion.div
              layout
              className="flex aspect-square h-full rounded-full border-2 p-2 shadow-[0px_12px_43px_0px_rgba(0,0,0,0.70)]"
              animate={{
                backgroundColor: theme === "light" ? "#ffffff" : "#363636",
                borderColor: theme === "light" ? "#D8D8D8" : "#535353",
              }}
            >
              <motion.div
                className="h-full w-full rounded-full"
                animate={{
                  color: theme === "light" ? "#D6D6D6" : "#464646",
                  boxShadow:
                    theme === "light"
                      ? "2px 80px 72.5px -31px rgba(0, 0, 0, 0.2) inset, 0px 4px 13.4px 0px rgba(0, 0, 0, 0.43)"
                      : "2px 80px 72.5px -31px rgba(0, 0, 0, 0.49) inset, 0px 4px 13.4px 0px rgba(0, 0, 0, 0.43)",
                }}
              ></motion.div>
            </motion.div>
          </motion.button>
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
};

export default ModeToggle;
