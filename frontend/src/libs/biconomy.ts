import { ChainId } from "@biconomy/core-types";

export const defaultChainId =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? ChainId.POLYGON_MUMBAI
    : ChainId.POLYGON_MUMBAI;

export const defaultBiconomyApiKey =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? process.env.NEXT_PUBLIC_BICONOMY_MUMBAI_PAYMASTER_API_KEY
    : process.env.NEXT_PUBLIC_BICONOMY_MUMBAI_PAYMASTER_API_KEY;
