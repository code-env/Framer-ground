"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

const Scroller = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 50) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <div className="relative">
      <div className="h-screen center">
        <motion.button
          layoutId="ChatButton"
          className={cn(
            "px-10 py-2 rounded-lg bg-black text-white",
            isHidden && "opacity-0 pointer-events-none"
          )}
        >
          Nothing
        </motion.button>
      </div>
      <div className="h-screen"></div>
      <ChatButton isHidden={isHidden} />
    </div>
  );
};

const ChatButton = ({ isHidden }: { isHidden: boolean }) => {
  return (
    <AnimatePresence mode="sync">
      {isHidden && (
        <motion.div
          layoutId="ChatButton"
          animate={{
            width: 50,
            height: 50,
            opacity: isHidden ? 1 : 0,
          }}
          className="rounded-full bg-black fixed bottom-10 right-10 text-white center cursor-pointer"
        >
          <MessageCircle className="h-4 w-4" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Scroller;
