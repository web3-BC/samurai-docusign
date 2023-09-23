"use client";

import Button from "@/components/button";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter()
  const button = {
    text: "Create New Contract",
    className: "",
    onClick: () => {
      router.push("/issuers/contracts/new")
    },
  };

  return (
    <main className="h-[calc(100vh-70px)] bg-slate-50 py-16 mx-auto flex w-full items-center justify-center pt-10">
      <Button {...button} />
    </main>
  );
};

export default LandingPage;
