import Button from "@/components/hand-crafted/button";
import SmNavbar from "@/components/hand-crafted/sm-navbar";
import React from "react";

const Buttons = () => {


  const randomNumberGenerator = (min: number, max: number) => {

    return Math.random() * (max - min) + min;
  }


  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <Button text="2(Bkm)" starLength={randomNumberGenerator(2,5)} />
      <SmNavbar />
    </div>
  );
};

export default Buttons;
