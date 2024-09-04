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

  const handleMoundeEnter = () => {
    if (!ref.current) return;

    const { width } = ref.current.getBoundingClientRect();

    const left = ref.current.offsetLeft;
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
    <div className="h-screen p-20 bg-black text-white">
      <div className="w-fit h-14 rounded bg-white/10 mx-auto">
        <nav className="p-2 h-full">
          <ul className="flex h-full items-center gap-2 relative ">
            {routes.map((route, index) => {
              return (
                <li
                  ref={ref}
                  onMouseEnter={handleMoundeEnter}
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
              className="absolute bg-black rounded z-0 h-full"
            />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Vercel;
