"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";

const formSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // Show the error on confirmPassword field
  });

const Verifier = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [shake, setShake] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    try {
      formSchema.parse(formData);
      setFormErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) errors[err.path[0] as string] = err.message;
        });
        setFormErrors(errors);
      }
    }
  };

  const bounceAnimation = {
    x: shake ? [-10, 10, -10, 10, 0] : 0,
    transition: { duration: 0.5 },
  };

  const getLetterStatus = (letter: string, index: number) => {
    if (!formData.confirmPassword[index]) return "";
    return formData.confirmPassword[index] === letter
      ? "bg-green-500/30"
      : "bg-red-500/30";
  };

  const matchAnimation = {
    scale: formData.password === formData.confirmPassword ? [1, 1.05, 1] : 1,
    transition: { duration: 0.3 },
  };

  const borderAnimation = {
    borderColor:
      formData.password === formData.confirmPassword ? "#10B981" : "",
    transition: { duration: 0.3 },
  };

  const handleBlur = () => {
    validateForm();
  };

  return (
    <main className="relative flex size-full w-full items-start justify-center px-4 py-10 md:items-center">
      <div className="z-10 flex w-full flex-col items-center">
        <div className="mx-auto flex h-full w-full max-w-lg flex-col items-center justify-center gap-8 p-16">
          <div className="relative flex w-full flex-col items-start justify-center gap-4">
            {/* Password input */}
            <div className="w-full">
              {!showConfirm ? (
                <motion.input
                  className="h-[52px] w-full rounded-xl border-2 px-3.5 py-3 tracking-[.59rem] outline-none placeholder:tracking-widest focus:border-foreground-muted"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              ) : (
                <motion.div
                  className={cn(
                    "h-[52px] w-full rounded-xl border-2 px-2 py-2 bg-muted/40"
                  )}
                  animate={{
                    ...bounceAnimation,
                    ...matchAnimation,
                    ...borderAnimation,
                  }}
                >
                  <div className="relative h-full w-fit overflow-hidden rounded-lg ">
                    <div className="z-10 flex h-full items-center justify-center px-0 py-1">
                      {formData.password.split("").map((_, index) => (
                        <div
                          key={index}
                          className="flex h-full w-4 shrink-0 items-center justify-center"
                        >
                          <span className="size-[5px] rounded-full bg-muted-foreground" />
                        </div>
                      ))}
                    </div>

                    <div className="absolute bottom-0 left-0 top-0 z-0 flex h-full w-full items-center justify-start">
                      {formData.password.split("").map((letter, index) => (
                        <motion.div
                          key={index}
                          className={cn(
                            "ease absolute h-full w-4 transition-all duration-300",
                            getLetterStatus(letter, index)
                          )}
                          style={{
                            left: `${index * 16}px`,
                            scaleX: formData.confirmPassword[index] ? 1 : 0,
                            transformOrigin: "left",
                          }}
                        ></motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Confirm password input */}
            <motion.div
              className="h-[52px] w-full overflow-hidden rounded-xl"
              animate={matchAnimation}
            >
              <motion.input
                className={cn(
                  "h-full w-full rounded-xl border-2 px-3.5 py-3 tracking-[.59rem] outline-none placeholder:tracking-widest focus:border-foreground-muted",
                  {
                    "border-red-500": formErrors.confirmPassword,
                    "border-green-500":
                      formData.confirmPassword &&
                      formData.password === formData.confirmPassword,
                    "border-gray-300":
                      !formErrors.confirmPassword &&
                      (!formData.confirmPassword ||
                        formData.password !== formData.confirmPassword),
                  }
                )}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onFocus={() => setShowConfirm(true)}
                onBlur={handleBlur} // Trigger validation on blur
              />
            </motion.div>
            {formErrors.confirmPassword && (
              <p className="text-red-500">{formErrors.confirmPassword}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Verifier;
