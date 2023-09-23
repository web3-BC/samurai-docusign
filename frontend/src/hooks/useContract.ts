import { ABI } from "@/constants";
import { CONTRACT_ADDRESS, publicClient } from "@/libs/viem";
import { useCallback } from "react";

export const useContract = () => {
  const getContractByEncryptedCid = useCallback(
    async (encryptedCID: string) => {
      const contract = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "getContractByEncryptedCid",
        args: [encryptedCID],
      });
      return contract;
    },
    [],
  );

  return { getContractByEncryptedCid };
};
