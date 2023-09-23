import { createPublicClient, fallback } from "viem";
import { arbitrum, polygonMumbai } from "viem/chains";
import { RPC_LIST } from "../constants";

export const currentChain =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? arbitrum
    : polygonMumbai;

export const publicClient = createPublicClient({
  chain: currentChain,
  transport: fallback(
    RPC_LIST[
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
        ? "arbitrumGoerli"
        : "polygonMumbai"
    ],
  ),
});

export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "0x24c73a5C2dB4111166AE1cdf3fEe7dA8EFFf80D5"
    : "0x24c73a5C2dB4111166AE1cdf3fEe7dA8EFFf80D5";
