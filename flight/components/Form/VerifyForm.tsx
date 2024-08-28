"use client";
import React, { useState } from "react";
import useVerifyForm from "@/hooks/useVerifyForm";
import { postData } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
const VerifyForm = () => {
  const { code, handleChange, handleKeyDown, handlePaste, handleRef } =
    useVerifyForm();
  const [error, setError] = useState("");
  const router = useRouter();
  const token = localStorage.getItem("flyghtt_token");
  const { mutate, data, isError, isPending } = useMutation({
    mutationKey: ["verify"],
    mutationFn: ({ data, token }: { data: { otp: number }; token: string }) =>
      postData({
        data: data,
        token: token,
        url: "https://flyghtt-backend.onrender.com/api/v1/authentication/verify/otp",
      }),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      if (data && data.emailVerified) {
        router.push("/email-verified");
        setError("");
      } else {
        setError(data.message);
      }
    },
  });
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (code.includes("")) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    console.log(code.join(""));

    const data = {
      otp: Number(code.join("")),
    };
    console.log(token, "tokenverifyyform");
    mutate({ data: data, token: token || "" });
  };
  return (
    <form
      className="mt-5 bg-white w-[500px] rounded-xl min-h-[300px] flex items-center p-8 flex-col"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-semibold mb-2">Verify email to continue</h1>
      <p className=" text-center mb-3">
        {" "}
        Please check your email for a 6 digits code and enter the code in the
        box below
      </p>
      <div className="space-x-2 flex justify-center items-center mt-3">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            autoComplete="none"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => handleRef(el, index)}
            onPaste={handlePaste}
            className="w-10 h-10 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      {/* TODO: resend email */}
      <button
        type="submit"
        className="w-full bg-dark text-white py-2 mt-6 rounded-md flex items-center justify-center"
      >
        Continue
      </button>
      <p className="text-red-500 text-xs mt-4">{error && error}</p>
      {isPending && (
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green mt-3"></div>
      )}
    </form>
  );
};

export default VerifyForm;