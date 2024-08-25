import React from "react";
import Airpods from "@/components/scroll/air-pods";
import Horizontal from "@/components/scroll/horizontal";
import TestClient from "@/components/test-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scroll Animation",
};

const Scroll = () => {
  return (
    <div>
      <div className="h-screen" />
      <Horizontal />
      <TestClient />
      <div className="h-screen" />
    </div>
  );
};

export default Scroll;
