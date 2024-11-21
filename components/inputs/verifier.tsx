"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

const Verifier = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      confirmPassword.length >= password.length &&
      e.target.value.length > confirmPassword.length
    ) {
      setShake(true);
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  const getLetterStatus = (letter: string, index: number) => {
    if (!confirmPassword[index]) return "";
    return confirmPassword[index] === letter
      ? "bg-green-500/30"
      : "bg-red-500/30";
  };

  const passwordsMatch = password === confirmPassword && password.length > 0;

  const bounceAnimation = {
    x: shake ? [-10, 10, -10, 10, 0] : 0,
    transition: { duration: 0.5 },
  };

  const matchAnimation = {
    // scale: passwordsMatch ? [1, 1.05, 1] : 1,
    transition: { duration: 0.3 },
  };

  const borderAnimation = {
    borderColor: passwordsMatch ? "#22c55e" : "",
    transition: { duration: 0.3 },
  };

  return (
    <main className="relative flex min-h-screen w-full items-start justify-center px-4 py-10 md:items-center">
      <div className="z-10 flex w-full flex-col items-center">
        <div className="mx-auto flex h-full w-full max-w-lg flex-col items-center justify-center gap-8 p-16">
          <div className="relative flex w-full flex-col items-start justify-center gap-4">
            <div className="w-full">
              {!showConfirm ? (
                <motion.input
                  className="h-[52px] w-full rounded-xl border-2 px-3.5 py-3 tracking-[.59rem] outline-none placeholder:tracking-widest focus:border-foreground-muted"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={handlePasswordChange}
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
                      {password.split("").map((_, index) => (
                        <div
                          key={index}
                          className="flex h-full w-4 shrink-0 items-center justify-center"
                        >
                          <span className="size-[5px] rounded-full bg-muted-foreground" />
                        </div>
                      ))}
                    </div>

                    <div className="absolute bottom-0 left-0 top-0 z-0 flex h-full w-full items-center justify-start">
                      {password.split("").map((letter, index) => (
                        <motion.div
                          key={index}
                          className={cn(
                            "ease absolute h-full w-4 transition-all duration-300",
                            getLetterStatus(letter, index)
                          )}
                          style={{
                            left: `${index * 16}px`,
                            scaleX: confirmPassword[index] ? 1 : 0,
                            transformOrigin: "left",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div
              className="h-[52px] w-full overflow-hidden rounded-xl relative"
              animate={matchAnimation}
            >
              <motion.input
                className={cn(
                  "h-full w-full rounded-xl border-2 px-3.5 py-3 tracking-[.59rem] outline-none placeholder:tracking-widest focus:border-foreground-muted"
                )}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onFocus={() => setShowConfirm(true)}
                onBlur={() => {
                  if (!passwordsMatch) setShowConfirm(false);
                }}
                animate={borderAnimation}
              />
              <AnimatePresence>
                {passwordsMatch && (
                  <motion.div
                    className="absolute right-2 top-0 bottom-0 my-auto size-6 flex items-center justify-center rounded-full bg-green-500"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="size-4 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Verifier;
