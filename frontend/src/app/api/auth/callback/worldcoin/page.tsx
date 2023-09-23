"use client";
import { useRouter } from "next/navigation"

const TemporaryPage = () => {
  const router = useRouter()
  router.push("/issuers/contracts/new?step=1")
  return <div>Redirecting...</div>;
};

export default TemporaryPage;
