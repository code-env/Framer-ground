import React, { ReactNode } from "react";

const MarkettingLayout = ({ children }: { children: ReactNode }) => {
  return <div className="bg-black min-h-screen">{children}</div>;
};

export default MarkettingLayout;
