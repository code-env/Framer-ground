"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

const Drop = () => {
  const [isIn, setIsIn] = useState(false);
  return (
    <div className="h-screen w-full center">
      <div className="h-2/4 w-2/4 border border-dashed rounded-[40px] hover:bg-muted/20"></div>
    </div>
  );
};

export default Drop;
