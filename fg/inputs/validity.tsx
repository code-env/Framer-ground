"use client";

import { Input } from "@/components/ui/input";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";

// Define a Zod schema for password validation
const passwordSchema = z.string().superRefine((val, ctx) => {
  if (val.length < 8) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_small,
      message: "At least 8 characters",
      minimum: 8,
      inclusive: true,
      type: "string",
    });
  }
  if (!/[0-9]/.test(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least 1 number",
    });
  }
  if (!/[a-z]/.test(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least 1 lowercase letter",
    });
  }
  if (!/[A-Z]/.test(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least 1 uppercase letter",
    });
  }
});

const InputVerification = () => {
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    validatePassword(password);
  }, []);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const validatePassword = (pass: string) => {
    const validationResult = passwordSchema.safeParse(pass);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.issues.map(
        (issue) => issue.message
      );
      setErrors(errorMessages);
    } else {
      setErrors([]); // No errors if validation passed
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pass = e.target.value;
    setPassword(pass);
    validatePassword(pass);
  };

  const strengthScore = 4 - errors.length;

  const getStrengthColor = (score: number) => {
    if (score === 0) return "#e0e0e0"; // Gray for empty or invalid
    if (score <= 1) return "#f87171"; // Red for weak
    if (score <= 2) return "#fb923c"; // Orange for medium
    if (score === 3) return "#facc15"; // Yellow for medium-strong
    return "#4ade80"; // Green for strong
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  return (
    <motion.div
      className="size-full center flex-col"
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-lg w-full">
        <div className="relative">
          <Input
            id="input-51"
            className="pe-9"
            placeholder="Password"
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={handleChange}
            aria-invalid={strengthScore < 4}
            aria-describedby="password-strength"
          />
          <button
            className="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Password strength indicator */}
        <div
          className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuenow={strengthScore}
          aria-valuemin={0}
          aria-valuemax={4}
          aria-label="Password strength"
        >
          <div
            className={`h-full transition-all duration-500 ease-out`}
            style={{
              backgroundColor: getStrengthColor(strengthScore),
              width: `${(strengthScore / 4) * 100}%`,
            }}
          ></div>
        </div>

        {/* Password strength description */}
        <p
          id="password-strength"
          className="mb-2 text-sm font-medium text-foreground"
        >
          {getStrengthText(strengthScore)}. Must contain:
        </p>

        {/* Password requirements list */}
        <ul className="space-y-1.5" aria-label="Password requirements">
          {[
            "At least 8 characters",
            "At least 1 number",
            "At least 1 lowercase letter",
            "At least 1 uppercase letter",
          ].map((reqText, index) => (
            <li key={index} className="flex items-center space-x-2">
              {errors.includes(reqText) ? (
                <X
                  size={16}
                  className="text-muted-foreground/80"
                  aria-hidden="true"
                />
              ) : (
                <Check
                  size={16}
                  className="text-emerald-500"
                  aria-hidden="true"
                />
              )}
              <span
                className={`text-xs ${
                  errors.includes(reqText)
                    ? "text-muted-foreground"
                    : "text-emerald-600"
                }`}
              >
                {reqText}
                <span className="sr-only">
                  {errors.includes(reqText)
                    ? " - Requirement not met"
                    : " - Requirement met"}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default InputVerification;
