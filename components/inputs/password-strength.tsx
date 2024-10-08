"use client";

import {
  motion,
  useTransform,
  useMotionValue,
  useAnimationControls,
} from "framer-motion";
import React, { useState, useEffect } from "react";
import { LucideEyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

const PasswordStrength = () => {
  const [value, setValue] = useState("");
  const passwordLength = useMotionValue(value.length);
  const background = useTransform(
    passwordLength,
    [0, 3, 6, 8],
    ["#ffcccb", "#ffa07a", "#90ee90", "#32cd32"]
  );
  const scaleControls = useAnimationControls();

  const [percentage, setPercentage] = useState(0);

  const words = [
    "",
    "Very weak",
    "Weak",
    "Fair",
    "Moderate",
    "Good",
    "Strong",
    "Very Strong",
    "Excellent",
  ];

  useEffect(() => {
    const val = (value.length / 8) * 100;
    setPercentage(val > 100 ? 100 : val);
    passwordLength.set(value.length);

    // for the scaling down and up of the input
    if (value.length === 8) {
      scaleControls.start({
        scale: [1, 0.9, 1.1, 1],
        transition: { duration: 0.5 },
      });
    }
  }, [value, passwordLength, scaleControls]);

  return (
    <div className="h-screen w-full center border-t">
      <div className="max-w-lg mx-auto w-full center flex-col gap-4">
        <motion.div
          animate={scaleControls}
          className="w-full h-20 rounded-lg bg-muted p-2 relative z-0 overflow-hidden"
        >
          <div className="h-full  m-auto w-full bg-primary rounded-lg overflow-hidden">
            <input
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter your password"
              type="password"
              className="h-full w-full outline-none border-none px-5 pr-12 z-10 text-muted-foreground"
            />
            <LucideEyeOff className="my-auto absolute right-5 top-0 bottom-0 text-muted-foreground" />
            <motion.div
              style={{
                background,
              }}
              animate={{ width: `${percentage}%` }}
              className={cn(`absolute top-0 left-0 bg-primary h-full -z-10`)}
            />
          </div>
        </motion.div>
        <p className="text-muted-foreground">
          {words[value.length > 8 ? words.length - 1 : value.length]}
        </p>
      </div>
    </div>
  );
};

export default PasswordStrength;
