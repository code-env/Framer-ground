"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navbarRoutes = [
  {
    id: 1,
    name: "Home",
    component: () => {
      return <div>something</div>;
    },
  },
  {
    id: 2,
    name: "About",
    component: () => {
      return <div>something</div>;
    },
  },
  {
    id: 3,
    name: "others",
    component: () => {
      return <div>something</div>;
    },
  },
];
const Chevron = () => {
  return <div>Chevron</div>;
};

const Routes = () => {
  const [active, setActive] = useState<number | null>(null);
  const [direction, setDirection] = useState<null | "right" | "left">(null);

  const changeSelected = (value: number | null) => {
    if (typeof active === "number" && typeof value === "number") {
      setDirection(active > value ? "right" : "left");
    } else if (value === null) {
      setDirection(null);
    }

    setActive(value);
  };
  return <div></div>;
};

export default Chevron;
