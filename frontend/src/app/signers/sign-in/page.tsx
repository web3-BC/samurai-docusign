"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect } from "react";

const SignerPage = () => {
  const { login } = usePrivy();
  const { wallets } = useWallets();

  useEffect(() => {
    const getEOA = async () => {
      const provider = await wallets[0]?.getEthersProvider();
      const signer = provider?.getSigner();
      if (!signer) {
        throw new Error("Signer not found");
      }
    };
    getEOA();
  }, [wallets]);

  return (
    <main className="mx-auto min-h-screen max-w-5xl pt-10">
      <div className="mx-auto max-w-fit bg-white px-10 py-8">
        <p className="mb-8 text-center text-2xl">Start signing your contract</p>
        <button
          type="button"
          className="mb-2 mr-2 flex items-center rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
          onClick={login}
        >
          Sign in
        </button>
      </div>
    </main>
  );
};

export default SignerPage;
