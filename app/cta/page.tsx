"use client";

import Button from "@/components/hand-crafted/button";
import SmNavbar from "@/components/hand-crafted/sm-navbar";
import React, { useEffect } from "react";

const Buttons = () => {
  const [starcount, setStarcount] = React.useState(0);
  useEffect(() => {
    setTimeout(() => {
      setStarcount(randomNumberGenerator(2, 50));
    }, 1000);
  }, [starcount]);

  const randomNumberGenerator = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <Button text="2(Bkm)" starLength={starcount} />
      <SmNavbar />
    </div>
  );
};

export default Buttons;
