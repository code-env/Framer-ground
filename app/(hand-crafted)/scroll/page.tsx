import React from "react";
import Horizontal from "@/components/scroll/horizontal";
import Scroller from "@/components/scroll/scroller";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scroll Animation",
};

const Scroll = () => {
  return (
    <div>
      {/* <div className="h-screen" />
      <Horizontal />
      <div className="h-screen" /> */}
      <Scroller />
    </div>
  );
};

export default Scroll;
