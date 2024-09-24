"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

type NavState = {
  opacity: number;
  top: number;
  height: number;
};

const Vercel = () => {
  const [state, setState] = useState<NavState>({
    opacity: 0,
    top: 0,
    height: 0,
  });

  const ref = useRef<HTMLLIElement | null>(null);

  const routes = [
    {
      name: "Home",
    },
    {
      name: "About us",
    },
    {
      name: "Contact us",
    },
    {
      name: "Zenith noble",
    },
  ];

  const handleMouseEnter = (event: React.MouseEvent<HTMLLIElement>) => {
    if (!ref.current) return;

    const { height } = event.currentTarget.getBoundingClientRect();
    const top = event.currentTarget.offsetTop;

    setState({
      height,
      opacity: 1,
      top,
    });
  };

  const handleMouseLeave = () =>
    setState((prev) => ({
      ...prev,
      opacity: 0,
    }));

  return (
    <div className="center text-white h-full w-full">
      <div className="w-fit h-fit rounded bg-primary mx-auto border border-border">
        <nav className="p-1 h-fit">
          <ul className="flex flex-col h-full items-start gap-2 relative">
            {routes.map((route, index) => {
              return (
                <li
                  ref={ref}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  key={index}
                  className="w-full flex relative items-center justify-start p-2 z-10 cursor-pointer mix-blend-difference"
                >
                  {route.name}
                </li>
              );
            })}
            <motion.li
              animate={state}
              className="absolute bg-muted rounded z-0 w-full"
            />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Vercel;
