import Apple from "@/components/inputs/apple";
import GoogleInput from "@/components/inputs/google";
import PasswordStrength from "@/components/inputs/password-strength";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inputs",
  description: "This page showcases the different types of input animation",
};

const Inputs = () => {
  return (
    <div className="min-h-screen">
      <Apple />
      <PasswordStrength />
      <GoogleInput label="Email address" />
    </div>
  );
};

export default Inputs;
