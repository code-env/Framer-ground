"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CreateNew = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    collapsed: { height: 60, width: 150 },
    expanded: { height: "100%", width: 300 },
  };

  const contentVariants = {
    collapsed: { opacity: 0 },
    expanded: { opacity: 1, transition: { delay: 0.1 } },
  };

  return (
    <div className="h-screen center">
      <div className="h-[260px] flex items-end w-[300px]">
        <motion.div
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={containerVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="border  rounded-[30px] overflow-hidden w-full mx-auto bg-muted flex flex-col"
        >
          <AnimatePresence>
            {!isExpanded && (
              <motion.button
                className={cn(
                  "h-[60px] w-full flex items-center gap-4 px-4 outline-none border-none "
                )}
                layoutId="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                onClick={() => setIsExpanded((prev) => !prev)}
              >
                <motion.span>
                  <Plus className="h-4 w-4" />
                </motion.span>
                <motion.span>Create new</motion.span>
              </motion.button>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="flex flex-col flex-1"
                variants={contentVariants}
              >
                <motion.button
                  onClick={() => setIsExpanded((prev) => !prev)}
                  // layoutId="button"
                  className="h-[60px] items-center"
                >
                  Create new
                </motion.button>
                <div className="flex-1 bg-white "></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateNew;
