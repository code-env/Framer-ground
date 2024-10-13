"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MicOff, Phone, X } from "lucide-react";
import { useState } from "react";

const callUsers = [
  { name: "John Doe", image: "path_to_image_1.jpg", id: 1 },
  { name: "Jane Doe", image: "path_to_image_2.jpg", id: 2 },
  { name: "John Doe", image: "path_to_image_3.jpg", id: 3 },
  { name: "Jane Doe", image: "path_to_image_4.jpg", id: 4 },
];

type Status = "idle" | "open" | "hovered";

const springTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

const Call = () => {
  const [status, setStatus] = useState<Status>("idle");
  const isOpen = status === "open";

  const renderUserProfiles = (stacked?: boolean, details?: boolean) =>
    callUsers.map((user) => (
      <div key={user.id} className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <motion.div
            layoutId={`userprofile-${user.id}`}
            className={cn(
              "size-12 bg-red-500 rounded-full border-2 border-white dark:border-black border-b",
              {
                "-ml-3": stacked,
              }
            )}
            style={{
              backgroundImage: `url(${user.image || "default_image.jpg"})`,
              backgroundSize: "cover",
            }}
          />
          {details && (
            <div className="flex flex-col gap-1">
              <motion.h1
                layoutId={`username-${user.id}`}
                className="font-bold text-black dark:text-white"
              >
                {user.name}
              </motion.h1>
            </div>
          )}
        </div>
        {details && (
          <button className="border-red-500 border bg-red-100 text-red-500 text-sm p-1 rounded font-semibold">
            Remove {user.name} from call
          </button>
        )}
      </div>
    ));

  return (
    <div className="h-screen relative w-full center border-t border bg-muted">
      <motion.div
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          overflow: "hidden",
          borderRadius: 22,
          width: 500,
          height: "auto",
        }}
        onClick={() => setStatus(isOpen ? "idle" : "open")}
        whileTap={{ scale: 0.95 }}
        className="flex gap-5 flex-col cursor-pointer bg-white dark:bg-black shadow-md text-primary-foreground p-5 tracking-tight overflow-y-clip"
        aria-expanded={isOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") setStatus(isOpen ? "idle" : "open");
        }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={springTransition}
              className="flex flex-col gap-5"
            >
              {renderUserProfiles(false, true)}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="text-muted-foreground flex items-center gap-2">
              <motion.div
                layoutId="call-status"
                className="!size-6 !min-w-6 rounded-full bg-green-500 center"
              >
                <Phone size={12} fill="white" strokeWidth={0} />
              </motion.div>
              <motion.span> Active call . 04:16</motion.span>
            </div>
            <motion.h1
              layoutId="call-company"
              className="font-bold text-black dark:text-white text-3xl"
            >
              OpenAI
            </motion.h1>
          </div>
          <AnimatePresence>
            {!isOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex"
              >
                {renderUserProfiles(true)}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={springTransition}
                className="flex gap-2"
              >
                <motion.button
                  layout
                  onClick={() => setStatus("idle")}
                  className="size-6 flex items-center justify-center rounded-full bg-muted"
                >
                  <X className="size-4 text-tight text-secondary-foreground" />
                </motion.button>
                <motion.button
                  layout
                  onClick={() => setStatus("idle")}
                  className="size-6 flex items-center justify-center rounded-full bg-muted"
                >
                  <MicOff className="size-4 text-tight text-secondary-foreground" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Call;
