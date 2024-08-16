import Loading from "@/components/hand-crafted/loading";
import TransButton from "@/components/hand-crafted/trans";
import FirstNavbar from "@/components/navbar/first";
import React from "react";

const BtnTrans = () => {
  return (
    <div className="h-[200vh">
      <div className="flex items-center justify-center h-screen flex-col gap-5 relative">
        <h1 className="text-7xl font-extrabold text-center text-white mb-52">
          Checkout the navbar <br /> and it's gestures
        </h1>
        <FirstNavbar />
      </div>
      <Loading />
    </div>
  );
};

export default BtnTrans;
