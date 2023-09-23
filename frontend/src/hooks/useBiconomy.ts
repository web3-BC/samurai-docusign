import { ABI } from "@/constants";
import { currentChainId, currentBiconomyApiKey } from "@/libs/biconomy";
import { CONTRACT_ADDRESS } from "@/libs/viem";
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
import { useCallback, useState } from "react";
import { encodeFunctionData } from "viem";

export const useBiconomy = () => {
  const [biconomySA, setBiconomySA] = useState<BiconomySmartAccountV2>();
  const [paymaster, setPaymaster] =
    useState<IHybridPaymaster<SponsorUserOperationDto>>();
  const { wallets } = useWallets();

  const createSmartAccount = async () => {
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

    const smartAccountAddress = await biconomySmartAccount.getAccountAddress();
    console.log("Smart Account Address:", smartAccountAddress);
  };

  const executeContract = useCallback(
    async (functionName: string, args: Array<unknown>) => {
      if (!biconomySA || !paymaster) {
        throw new Error("not found biconomy smart account or paymaster");
      }

      const data = encodeFunctionData({
        abi: ABI,
        functionName: functionName,
        args: args,
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
      partialUserOp.paymasterAndData =
        paymasterAndDataResponse.paymasterAndData;
      const userOpResponse = await biconomySA.sendUserOp(partialUserOp);

      const transactionDetails = await userOpResponse.wait(1);
      return transactionDetails;
    },
    [biconomySA, paymaster],
  );

  return { createSmartAccount, executeContract };
};
