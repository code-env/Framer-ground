import React from "react";

import Nothing from "@/components/carousel/another";
import MouseMove from "@/components/carousel/mouse-move";
import Spinner from "@/components/carousel/spinner";
import Swipe from "@/components/carousel/swipe";

const Carousel = () => {
  return (
    <div className="min-h-screen w-full">
      <MouseMove />
      <Swipe />
      <Nothing />
      <Spinner />
    </div>
  );
};

export default Carousel;
