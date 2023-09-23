"use client";

import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { SessionProvider } from "next-auth/react";
import { polygonMumbai } from "viem/chains";
import { Web3Modal } from "@web3modal/react";
import { PrivyProvider } from "@privy-io/react-auth";

import { currentChain } from "@/libs/viem";

const projectID = `${process.env.NEXT_PUBLIC_WC_PROJECT_ID}` || "";

const { publicClient, webSocketPublicClient } = configureChains(
  [currentChain],
  [w3mProvider({ projectId: projectID })],
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains: [currentChain], projectId: projectID }),
  publicClient,
  webSocketPublicClient,
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";

  const handlePrivyOnSuccess = () => {
    const path = localStorage.getItem("recepientPath") || "";
    router.push(path);
  };

  const ethereumClient = new EthereumClient(wagmiConfig, [currentChain]);

  return (
    <>
      <Toaster />
      <PrivyProvider
        appId={PRIVY_APP_ID}
        onSuccess={handlePrivyOnSuccess}
        config={{
          loginMethods: ["google", "email"],
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
            logo: "",
          },
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
          },
        }}
      >
        <SessionProvider>
          <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
        </SessionProvider>
      </PrivyProvider>
      <Web3Modal
        projectId={projectID}
        ethereumClient={ethereumClient}
        defaultChain={polygonMumbai}
      />
    </>
  );
};

export default Providers;
