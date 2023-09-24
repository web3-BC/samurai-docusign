import { useCallback } from "react";
import { useBiconomy } from "@/hooks/useBiconomy";
import toast from "react-hot-toast";

type UseSignParams = {
  encryptedCid: string;
};

export const useSign = (params: UseSignParams) => {
  const { encryptedCid } = params;
  const { createSmartAccount, executeContract } = useBiconomy();

  const signContract = useCallback(async () => {
    const biconomySmartAccount = await createSmartAccount();
    if (!biconomySmartAccount) {
      throw new Error("Failed to create smart account");
    }
    await executeContract(biconomySmartAccount, "signContract", [encryptedCid])
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
  }, [createSmartAccount, encryptedCid, executeContract]);

  return { signContract };
};
