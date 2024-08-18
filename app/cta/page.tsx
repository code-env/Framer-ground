import Button from "@/components/hand-crafted/button";
import SmNavbar from "@/components/hand-crafted/sm-navbar";
import React from "react";

const Buttons = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <Button text="2(Bkm)" starLength={10} />
      <SmNavbar />
    </div>
  );
};

export default Buttons;
