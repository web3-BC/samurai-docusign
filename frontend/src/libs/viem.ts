import { createPublicClient, fallback } from "viem";
import { polygonMumbai } from "viem/chains";
import { RPC_LIST } from "../constants";

export const currentChain =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? polygonMumbai
    : polygonMumbai;

export const publicClient = createPublicClient({
  chain: currentChain,
  transport: fallback(
    RPC_LIST[
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
        ? "polygonMumbai"
        : "polygonMumbai"
    ],
  ),
});

export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "0x9bB307572c5041b0B1b6e0f71a42bba9F3E69DB8"
    : "0x9bB307572c5041b0B1b6e0f71a42bba9F3E69DB8";
