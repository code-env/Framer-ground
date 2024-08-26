import React from "react";
import Horizontal from "@/components/scroll/horizontal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scroll Animation",
};

const Scroll = () => {
  return (
    <div>
      <div className="h-screen" />
      <Horizontal />
      <div className="h-screen" />
    </div>
  );
};

export default Scroll;
