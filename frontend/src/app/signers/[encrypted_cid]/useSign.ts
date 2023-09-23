import { useEffect, useCallback } from "react";
import { useBiconomy } from "@/hooks/useBiconomy";
import toast from "react-hot-toast";

type UseSignParams = {
  encryptedCid: string;
};

export const useSign = (params: UseSignParams) => {
  const { encryptedCid } = params;
  const { createSmartAccount, executeContract } = useBiconomy();

  useEffect(() => {
    createSmartAccount();
  }, [createSmartAccount]);

  const signContract = useCallback(async () => {
    await executeContract("signContract", [encryptedCid])
      .then((transactionDetails) => {
        toast.success("Complete Sign!!");
        console.log(
          "Complete Sign!! Transaction Hash is:",
          transactionDetails.receipt.transactionHash,
        );
      })
      .catch((error) => {
        toast.error("Error");
        console.log("Error:", error);
      });
  }, [encryptedCid, executeContract]);

  return { signContract };
};
