import React from "react";
import Marquee from "./marquee";

const VerticalMarquee = () => {
  return (
    <div className="flex flex-col">
      <Marquee vertical repeat={2}>
        <div className="h-20 w-20 bg-red-500"></div>
        <div className="h-20 w-20 bg-red-500"></div>
        <div className="h-20 w-20 bg-red-500"></div>
      </Marquee>
    </div>
  );
};

export default VerticalMarquee;
