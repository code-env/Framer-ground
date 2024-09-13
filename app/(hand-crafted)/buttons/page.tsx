import Checkout from "@/components/buttons/checkout";
import CreateNew from "@/components/buttons/create-new";
import Delete from "@/components/buttons/delete";
import GetStarted from "@/components/buttons/get-started";
import Github from "@/components/buttons/github";
import Two from "@/components/buttons/two";
import React from "react";

const Buttons = () => {
  return (
    <div className="min-h-screen">
      <Delete />
      <Two text="User" />
      <Github />
      <Checkout />
      <CreateNew />
      <GetStarted />
    </div>
  );
};

export default Buttons;
