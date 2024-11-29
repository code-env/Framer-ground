"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

type NavState = {
  opacity: number;
  left: number;
  width: number;
};

const Vercel = () => {
  const [state, setState] = useState<NavState>({
    opacity: 0,
    left: 0,
    width: 0,
  });

  const ref = useRef<HTMLLIElement | null>(null);

  const routes = [
    { name: "Home" },
    { name: "About us" },
    { name: "Contact us" },
    { name: "Zenith noble" },
  ];

  const handleMouseEnter = (event: React.MouseEvent<HTMLLIElement>) => {
    if (!ref.current) return;

    const { width } = event.currentTarget.getBoundingClientRect();

    const left = event.currentTarget.offsetLeft;
    setState({
      width,
      opacity: 1,
      left,
    });
  };

  const handleMouseLeave = () =>
    setState((prev) => ({
      ...prev,
      opacity: 0,
    }));

  return (
    <div className="center text-white h-full w-full">
      <div className="w-fit h-14 rounded bg-primary  mx-auto border border-border">
        <nav className="p-1 h-full">
          <ul className="flex h-full items-center gap-2 relative">
            {routes.map((route, index) => {
              return (
                <li
                  ref={ref}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  key={index}
                  className="h-full flex relative items-center justify-center px-5 z-10 cursor-pointer mix-blend-difference"
                >
                  {route.name}
                </li>
              );
            })}
            <motion.li
              animate={state}
              className="absolute bg-muted rounded z-0 h-full"
            />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Vercel;
