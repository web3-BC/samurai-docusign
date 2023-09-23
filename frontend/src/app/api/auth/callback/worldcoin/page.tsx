"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TemporaryPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/issuers/contracts/new?step=1");
  }, []);
  return <div>Redirecting...</div>;
};

export default TemporaryPage;
