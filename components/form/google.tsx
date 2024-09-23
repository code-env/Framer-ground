"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { z } from "zod";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const labelVariants = {
    default: { top: "10px", fontSize: "16px", color: "#999" },
    active: { top: "-20px", fontSize: "12px", color: "#4285f4" },
  };

  return (
    <div className="relative w-full mb-6">
      <input
        type={type}
        id={id}
        className={`w-full px-3 py-2 text-base border rounded transition-colors ${
          error ? "border-red-500" : "border-gray-300 focus:border-blue-500"
        }`}
        placeholder=" "
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <motion.label
        htmlFor={id}
        className="absolute left-3 bg-white px-1 pointer-events-none"
        initial="default"
        animate={isFocused || value ? "active" : "default"}
        variants={labelVariants}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof formSchema>;

const Google: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<z.ZodError["formErrors"]["fieldErrors"]>(
    {}
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateForm = (): boolean => {
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.formErrors.fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <InputField
          id="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name?.[0]}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email?.[0]}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password?.[0]}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Google;
