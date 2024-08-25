import Delete from "@/components/buttons/delete";
import Two from "@/components/buttons/two";
import React from "react";

const Buttons = () => {
  return (
    <div className="min-h-screen">
      <Delete />
      <Two text="User" />
    </div>
  );
};

export default Buttons;
