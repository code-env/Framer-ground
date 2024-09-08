"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, CodeSquare, Calendar } from "lucide-react";

const Drop = () => {
  const [isIn, setIsIn] = useState(false);
  return (
    <div className="h-screen w-full center">
      <div className="h-fit w-2/4 border border-dashed rounded-[40px] hover:bg-muted/20 bg-muted/40 group py-20 flex items-center  flex-col gap-10">
        <div className="relative w-fit mx-auto flex gap-10 group-hover:gap-20 transition-all duration-300">
          <div className="h-14 w-14 rounded-xl center bg-background border-2 -rotate-6 group-hover:-rotate-12">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="h-14 w-14 rounded-xl center bg-background border-2 absolute left-0 right-0 mx-auto z-10">
            <Link className="w-5 h-5" />
          </div>
          <div className="h-14 w-14 rounded-xl center bg-background border-2 rotate-6 group-hover:rotate-12">
            <CodeSquare className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-4xl font-semibold">No forms created</h1>
          <p className="text-muted-foreground max-w-96 text-center text-2xl">
            You can create a template to add in your pages
          </p>
        </div>
        <button className="border bg-background rounded-lg h-14 flex px-10 items-center justify-center text-xl hover:bg-background/50">
          Create form
        </button>
      </div>
    </div>
  );
};

export default Drop;
