import LiquidMorph from "@/components/navbar/liquid-morph";
import ScrollReveal from "@/components/navbar/scroll-reveal";
import Vercel from "@/components/navbar/vercel";
import NotchBar from "@/components/navbar/notch-bar";
import React from "react";
import Chevron from "@/components/navbar/chevron";
import DimensionNavbar from "@/components/navbar/dimension";

const Navbars = () => {
  return (
    <div>
      {/* <ScrollReveal /> */}
      <DimensionNavbar />
      {/* <LiquidMorph />
      <Vercel />
      <NotchBar />
      <Chevron /> */}

      <div className="h-[300vh]"></div>
    </div>
  );
};

export default Navbars;
