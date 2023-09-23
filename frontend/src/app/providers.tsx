"use client";

import { Toaster } from "react-hot-toast";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { SessionProvider } from "next-auth/react";
import { arbitrumGoerli } from "viem/chains";
import { Web3Modal } from "@web3modal/react";

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
  const ethereumClient = new EthereumClient(wagmiConfig, [currentChain]);

  return (
    <>
      <Toaster />
      <SessionProvider>
        <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      </SessionProvider>
      <Web3Modal
        projectId={projectID}
        ethereumClient={ethereumClient}
        defaultChain={arbitrumGoerli}
      />
    </>
  );
};

export default Providers;
