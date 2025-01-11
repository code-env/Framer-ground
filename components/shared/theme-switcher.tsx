"use client";

import { useTheme } from "next-themes";
import { Laptop, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion"

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";


const themes = [
  {
    name: "light",
    icon: Sun,
  },
  {
    name: "dark",
    icon: Moon,
  },
  {
    name: "system",
    icon: Laptop,
  },
];

const ThemeSwitcher = () => {
  const { setTheme, theme: justTheme } = useTheme();
  const mouted = useMounted()

  if (!mouted) return


  return (
    <div className="absolute border bottom-0 right-0 p-1 border-r-0 !z-[999] bg-muted/40 rounded-tl-xl flex items-center gap-2">
      {themes.map((theme, index) => {
        // something
        return (
          <button
            key={index + theme.name}
            className={cn("size-6 flex items-center justify-center relative outline-none ring-0")}
            onClick={() => setTheme(theme.name)}
          >
            <span className="sr-only">{theme.name}</span>
            <theme.icon className="size-4" />
            {justTheme === theme.name && <motion.div layoutId="selected-theme" className="absolute size-full bg-muted -z-10 rounded-md " />}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher
