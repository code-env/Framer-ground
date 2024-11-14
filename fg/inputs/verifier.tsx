import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

const Verifier = () => {
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordLength, setPasswordLength] = useState(0);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setPasswordData({ ...passwordData, [name]: value });
  };

  useEffect(() => {
    setPasswordLength(passwordData.password.length);
  }, [passwordData.password]);

  return (
    <div className="size-full center">
      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="flex flex-col relative">
          <Input
            placeholder="password"
            type="password"
            name="password"
            value={passwordData.password}
            onChange={handlePasswordChange}
            className="bg-transparent tracking-[2rem] h-12"
          />
          <div
            style={{
              width: (25 * passwordData.password.length) / 4,
            }}
            className="absolute h-[80%] top-0 bottom-0 my-auto left-3 pointer-events-none flex items-center -z-10 justify-center"
          >
            {passwordData.confirmPassword.length > 0 &&
              Array.from({ length: passwordLength }).map((_, index) => {
                return (
                  <div
                    style={{
                      background: "red",
                    }}
                  />
                );
              })}
          </div>
        </div>
        <div className="flex flex-col">
          <Input
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            className="h-12"
          />
        </div>
      </div>
    </div>
  );
};

export default Verifier;
