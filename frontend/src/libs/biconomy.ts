import { ChainId } from "@biconomy/core-types";

export const currentChainId =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? ChainId.ARBITRUM_ONE_MAINNET
    : ChainId.POLYGON_MUMBAI;
