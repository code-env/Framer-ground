import LiquidMorph from "@/components/navbar/liquid-morph";
import ScrollReveal from "@/components/navbar/scroll-reveal";
import Vercel from "@/components/navbar/vercel";
import NotchBar from "@/components/navbar/notch-bar";
import React from "react";

const Navbars = () => {
  return (
    <div>
      <ScrollReveal />
      <LiquidMorph />
      <Vercel />
      <NotchBar />
    </div>
  );
};

export default Navbars;
