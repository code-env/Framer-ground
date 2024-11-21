import Apple from "@/components/inputs/apple";
import GoogleInput from "@/components/inputs/google";
import PasswordStrength from "@/components/inputs/password-strength";
import InputVerification from "@/components/inputs/validity";
import Verifier from "@/components/inputs/verifier";
import VerifierWithZod from "@/components/inputs/verifier-with-zod";
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
      <InputVerification />
      <Verifier />
      <VerifierWithZod />
    </div>
  );
};

export default Inputs;
