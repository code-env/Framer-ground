import Delete from "@/components/buttons/delete";
import Github from "@/components/buttons/github";
import Two from "@/components/buttons/two";
import React from "react";

const Buttons = () => {
  return (
    <div className="min-h-screen">
      <Delete />
      <Two text="User" />
      <Github />
    </div>
  );
};

export default Buttons;