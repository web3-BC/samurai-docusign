import { ABI } from "@/constants";
import { defaultChainId, defaultBiconomyApiKey } from "@/libs/biconomy";
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
import { useCallback } from "react";
import { encodeFunctionData } from "viem";

export const useBiconomy = () => {
  const { wallets } = useWallets();

  const createSmartAccount = async () => {
    const provider = await wallets[0]?.getEthersProvider();
    const signer = provider?.getSigner();
    if (!signer) {
      return;
    }

    const ownerShipModule = await ECDSAOwnershipValidationModule.create({
      signer: signer,
      moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
    });

    const biconomySmartAccount = await BiconomySmartAccountV2.create({
      entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      chainId: defaultChainId,
      defaultValidationModule: ownerShipModule,
    });

    return biconomySmartAccount;
  };

  const executeContract = useCallback(
    async (
      biconomySmartAccount: BiconomySmartAccountV2,
      functionName: string,
      args: Array<unknown>,
    ) => {
      const bundler: IBundler = new Bundler({
        chainId: defaultChainId,
        bundlerUrl: `https://bundler.biconomy.io/api/v2/${defaultChainId}/${process.env.NEXT_PUBLIC_BICONOMY_BUNDLER_API_KEY}`,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      });
      biconomySmartAccount.bundler = bundler;

      const paymaster: IHybridPaymaster<SponsorUserOperationDto> =
        new BiconomyPaymaster({
          paymasterUrl: `https://paymaster.biconomy.io/api/v1/421613/${defaultBiconomyApiKey}`,
        });
      biconomySmartAccount.paymaster = paymaster;

      const data = encodeFunctionData({
        abi: ABI,
        functionName: functionName,
        args: args,
      });
      const tx = {
        to: CONTRACT_ADDRESS,
        data: data,
      };

      const partialUserOp = await biconomySmartAccount.buildUserOp([tx]);
      const paymasterServiceData: SponsorUserOperationDto = {
        mode: PaymasterMode.SPONSORED,
      };
      const paymasterAndDataResponse = await paymaster.getPaymasterAndData(
        partialUserOp,
        paymasterServiceData,
      );
      partialUserOp.paymasterAndData =
        paymasterAndDataResponse.paymasterAndData;
      const userOpResponse =
        await biconomySmartAccount.sendUserOp(partialUserOp);

      const transactionDetails = await userOpResponse.wait(1);
      return transactionDetails;
    },
    [],
  );

  return { createSmartAccount, executeContract };
};
