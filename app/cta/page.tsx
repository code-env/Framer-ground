"use client"
import Button from "@/components/hand-crafted/button";
import SmNavbar from "@/components/hand-crafted/sm-navbar";
import React from "react";

const Buttons = () => {
  const [counter,setcounter] = React.useState(1)


  const test = () => {
    setcounter(counter+1)
  }



  return (

    <div className="min-h-screen flex items-center justify-center flex-col">
      <Button text="2(Bkm)" starLength={counter} onClick={test}/>
      <SmNavbar />
    </div>
  );
};

export default Buttons;
