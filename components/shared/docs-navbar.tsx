import React from "react";
import Logo from "./logo";
import ModeToggle from "../mode-toggle";

const DocsNavbar = () => {
  return (
    <header className="h-14 fixed top-0 left-0 w-full border-b border-border bg-background/90 backdrop-blur-sm z-50 flex lg:px-10">
      <nav className="mx-auto w-full max-w-[1700px] h-full items-center flex justify-between">
        <Logo />
        <ModeToggle />
      </nav>
    </header>
  );
};

export default DocsNavbar;
