import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "@/lib/SessionWrapper"; // Update the import path as necessary

import LoginButton from "@/components/LoginButton";

export default function Login() {
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      // Wait until the session state is determined
      if (session === null) {
        // Session not determined yet
        return;
      }

      if (session) {
        // No session means user is not authenticated
        navigate("/");
      }
    };

    checkSession();
  }, [session]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 flex flex-col items-center rounded-lg bg-white p-8 mx-6 shadow-md">
        <h1 className="w-full text-center text-3xl font-bold">
          Let's get started
        </h1>
        <div>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
