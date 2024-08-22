import Apple from "@/components/inputs/apple";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inputs",
  description: "This page showcases the different types of input animation",
};

const Inputs = () => {
  return (
    <div className="min-h-screen">
      <Apple />
    </div>
  );
};

export default Inputs;
