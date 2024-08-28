import React, { ReactNode } from "react";

import { MarkettingNavbar } from "./_components";

const MarkettingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-black min-h-screen">
      <MarkettingNavbar />
      {children}
    </div>
  );
};

export default MarkettingLayout;
