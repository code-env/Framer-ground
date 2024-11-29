"use client";

import React, {
  useState,
  useRef,
  createContext,
  useContext,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Context for Navbar state
const NavbarContext = createContext<{
  activeItem: string | null;
  setActiveItem: (name: string, rect: DOMRect) => void;
  setIndicator: (state: { width: number; left: number }) => void;
  resetIndicator: () => void;
  indicatorType: "default" | "bg" | "border" | "dot";
} | null>(null);

const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbarContext must be used within a Navbar component.");
  }
  return context;
};

// Navbar Component (Parent)
export const Navbar = ({
  children,
  indicatorType = "default",
  className,
}: {
  children: React.ReactNode;
  indicatorType?: "default" | "bg" | "border" | "dot";
  className?: string;
}) => {
  const [activeItem, setActiveItemState] = useState<string | null>(null);
  const [indicatorState, setIndicatorState] = useState({ width: 0, left: 0 });

  const setIndicator = (state: { width: number; left: number }) => {
    setIndicatorState(state);
  };

  const resetIndicator = () => {
    if (activeItem) {
      const activeElement = document.querySelector(
        `[data-name="${activeItem}"]`
      ) as HTMLElement;
      if (activeElement) {
        const { width, left } = activeElement.getBoundingClientRect();
        setIndicatorState({ width, left });
      }
    }
  };

  const setActiveItem = (name: string, rect: DOMRect) => {
    setActiveItemState(name);
    setIndicator({ width: rect.width, left: rect.left });
  };

  useEffect(() => {
    resetIndicator();
  }, [activeItem]);

  return (
    <NavbarContext.Provider
      value={{
        activeItem,
        setActiveItem,
        setIndicator,
        resetIndicator,
        indicatorType,
      }}
    >
      <nav className={cn("!relative flex items-center h-16 py-2", className)}>
        {children}
        <NavbarActiveIndicator
          width={indicatorState.width}
          left={indicatorState.left}
        />
      </nav>
    </NavbarContext.Provider>
  );
};

// NavbarItems Component (Container for NavbarItem)
export const NavbarItems = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex items-center gap-4", className)}>{children}</div>
);

// NavbarItem Component (Individual Item)
export const NavbarItem = ({
  children,
  name,
  isActive,
  className,
}: {
  children: React.ReactNode;
  name: string;
  isActive?: boolean;
  className?: string;
}) => {
  const { activeItem, setActiveItem, setIndicator, resetIndicator } =
    useNavbarContext();
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    if (!ref.current) return;
    const { width, left } = ref.current.getBoundingClientRect();
    setIndicator({ width, left });
  };

  const handleMouseLeave = () => {
    resetIndicator();
  };

  const handleClick = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setActiveItem(name, rect);
  };

  useEffect(() => {
    // Synchronize with `isActive` prop
    if (isActive && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setActiveItem(name, rect);
    }
  }, [isActive, name, setActiveItem]);

  return (
    <div
      ref={ref}
      data-name={name}
      className={cn(
        "cursor-pointer px-3 py-1.5 rounded-full relative z-10 mix-blend-difference",
        className,
        { "font-bold": activeItem === name }
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

// NavbarActiveIndicator Component
export const NavbarActiveIndicator = ({
  width,
  left,
}: {
  width: number;
  left: number;
}) => {
  const { indicatorType } = useNavbarContext();

  const activeIndicatorVariants = cva("absolute bottom-0 h-1", {
    variants: {
      type: {
        default: "bg-primary rounded-t",
        bg: "bg-primary h-[70%] top-0 bottom-0 my-auto rounded-3xl text-red-500",
        border: "border-b-2 border-primary",
        dot: "w-2 h-2 bg-primary rounded-full",
      },
    },
  });

  return (
    <motion.div
      animate={{ width: indicatorType === "dot" ? 4 : width, left }}
      transition={{ type: "spring", stiffness: 70, damping: 20, duration: 0.3 }}
      className={cn(activeIndicatorVariants({ type: indicatorType }))}
    />
  );
};
