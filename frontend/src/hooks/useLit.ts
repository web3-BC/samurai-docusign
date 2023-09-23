"use client";

import { chain, client } from "@/libs/lit";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { AccessControlConditions } from "@lit-protocol/types";

export const useLit = () => {
  const connect = async () => {
    await client.connect();
  };

  const encrypt = async (cid: string) => {
    await connect();

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(cid);

    const ACCs: AccessControlConditions = [
      {
        contractAddress:
          "ipfs://QmcgbVu2sJSPpTeFhBd174FnmYmoVYvUFJeDkS7eYtwoFY",
        standardContractType: "LitAction",
        chain: chain,
        method: "go",
        parameters: ["40"],
        returnValueTest: {
          comparator: "=",
          value: "true",
        },
      },
    ];

    const encryptedSymmetricKey = await client.saveEncryptionKey({
      accessControlConditions: ACCs,
      symmetricKey,
      authSig,
      chain,
    });

    const encryptedCID = await LitJsSdk.blobToBase64String(encryptedString);

    return {
      encryptedCID: encryptedCID,
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
        encryptedSymmetricKey,
        "base16",
      ),
    };
  };

  return { encrypt };
};