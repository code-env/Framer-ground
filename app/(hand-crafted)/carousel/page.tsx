import Nothing from "@/components/carousel/another";
import MouseMove from "@/components/carousel/mouse-move";
import Swipe from "@/components/carousel/swipe";
import React from "react";

const Carousel = () => {
  return (
    <div className="min-h-screen w-full">
      <MouseMove />
      <Swipe />
      <Nothing />
    </div>
  );
};

export default Carousel;
