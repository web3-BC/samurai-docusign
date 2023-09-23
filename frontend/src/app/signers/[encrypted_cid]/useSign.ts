import { currentChainId } from "@/libs/biconomy";
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
} from "@biconomy/paymaster";
import { useWallets } from "@privy-io/react-auth";
import { useState, useEffect } from "react";

export const useSign = () => {
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
          paymasterUrl: `https://paymaster.biconomy.io/api/v1/421613/${process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_API_KEY}`,
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

      const smartAccountAddress =
        await biconomySmartAccount.getAccountAddress();
      console.log("Smart Account Address:", smartAccountAddress);
    };

    createBiconomySmartAccount();
  }, [wallets]);
};
