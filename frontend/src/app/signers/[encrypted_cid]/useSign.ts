import { ABI } from "@/constants";
import { CONTRACT_ADDRESS } from "@/libs/viem";
import { currentBiconomyApiKey, currentChainId } from "@/libs/biconomy";
import { BiconomySmartAccountV2 } from "@biconomy/account";
import { IBundler, Bundler } from "@biconomy/bundler";

import {
  DEFAULT_ENTRYPOINT_ADDRESS,
  ECDSAOwnershipValidationModule,
  DEFAULT_ECDSA_OWNERSHIP_MODULE,
} from "@biconomy/modules";
import {
  IHybridPaymaster,
  SponsorUserOperationDto,
  BiconomyPaymaster,
  PaymasterMode,
} from "@biconomy/paymaster";
import { useWallets } from "@privy-io/react-auth";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { encodeFunctionData } from "viem";

type UseSignParams = {
  encryptedCid: string;
};

export const useSign = (params: UseSignParams) => {
  const { encryptedCid } = params;
  const [biconomySA, setBiconomySA] = useState<BiconomySmartAccountV2>();
  const [paymaster, setPaymaster] =
    useState<IHybridPaymaster<SponsorUserOperationDto>>();
  const { wallets } = useWallets();

  useEffect(() => {
    const createBiconomySmartAccount = async () => {
      const provider = await wallets[0]?.getEthersProvider();
      const signer = provider?.getSigner();
      if (!signer) {
        return;
      }

      const bundler: IBundler = new Bundler({
        chainId: currentChainId,
        bundlerUrl: `https://bundler.biconomy.io/api/v2/${currentChainId}/${process.env.NEXT_PUBLIC_BICONOMY_BUNDLER_API_KEY}`,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      });

      const paymaster: IHybridPaymaster<SponsorUserOperationDto> =
        new BiconomyPaymaster({
          paymasterUrl: `https://paymaster.biconomy.io/api/v1/421613/${currentBiconomyApiKey}`,
        });

      const ownerShipModule = await ECDSAOwnershipValidationModule.create({
        signer: signer,
        moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
      });

      const biconomySmartAccount = await BiconomySmartAccountV2.create({
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        chainId: currentChainId,
        defaultValidationModule: ownerShipModule,
        bundler: bundler,
        paymaster: paymaster,
      });

      setPaymaster(paymaster);
      setBiconomySA(biconomySmartAccount);

      const smartAccountAddress =
        await biconomySmartAccount.getAccountAddress();
      console.log("Smart Account Address:", smartAccountAddress);
    };

    createBiconomySmartAccount();
  }, [wallets]);

  const signContract = useCallback(async () => {
    if (!biconomySA || !paymaster) {
      throw new Error("not found biconomy smart account or paymaster");
    }

    const data = encodeFunctionData({
      abi: ABI,
      functionName: "signContract",
      args: [encryptedCid],
    });
    const tx = {
      to: CONTRACT_ADDRESS,
      data: data,
    };
    const partialUserOp = await biconomySA.buildUserOp([tx]);
    const paymasterServiceData: SponsorUserOperationDto = {
      mode: PaymasterMode.SPONSORED,
    };
    const paymasterAndDataResponse = await paymaster.getPaymasterAndData(
      partialUserOp,
      paymasterServiceData,
    );
    partialUserOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
    const userOpResponse = await biconomySA.sendUserOp(partialUserOp);

    await userOpResponse
      .wait(1)
      .then((transactionDetails) => {
        toast.success("Complete Sign!!");
        console.log(
          "Complete Sign!! Transaction Receipt is:",
          transactionDetails.receipt.transactionHash,
        );
      })
      .catch((error) => {
        toast.error("Error");
        console.log("Error:", error);
      });
  }, [biconomySA, encryptedCid, paymaster]);

  return { signContract };
};
