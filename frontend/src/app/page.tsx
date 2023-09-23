"use client";

import { signIn } from "next-auth/react";
import Button from "@/components/button";

const Home = () => {
  const button = {
    text: "Sign in with WorldCoin",
    className: "",
    onClick: async () => {
      await signIn("worldcoin");
    },
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center pt-10">
      <Button {...button} />
    </main>
  );
};

export default Home;
