"use client";

import { createWalletClient, custom } from "viem";
import { chain, client, litActionUrl } from "@/libs/lit";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { SiweMessage } from "siwe";
import { AccessControlConditions, AuthSig } from "@lit-protocol/types";
import { EIP1193Provider } from "@privy-io/react-auth";
import { polygonMumbai } from "viem/chains";
import { toast } from "react-hot-toast";

export const useLit = () => {
  const connect = async () => {
    await client.connect();
  };

  const encrypt = async (cid: string) => {
    await connect();

    const ACCs: AccessControlConditions = [
      {
        contractAddress: litActionUrl,
        standardContractType: "LitAction",
        chain: chain,
        method: "verify",
        parameters: ["", ""],
        returnValueTest: {
          comparator: "=",
          value: "true",
        },
      },
    ];

    // check if wallet is connected
    if (localStorage.getItem("wagmi.connected") != "true") {
      toast.error("Please connect wallet");
      return { encryptedCID: "", encryptedSymmetricKey: "" };
    }
    localStorage.setItem("lit-web3-provider", "metamask");

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });

    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(cid);

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

  const decrypt = async (
    provider: EIP1193Provider,
    address: string,
    encryptedString: string,
    encryptedSymmetricKey: string,
  ) => {
    await connect();

    const ACCs: AccessControlConditions = [
      {
        contractAddress: litActionUrl,
        standardContractType: "LitAction",
        chain: chain,
        method: "verify",
        parameters: ["", ""],
        returnValueTest: {
          comparator: "=",
          value: "true",
        },
      },
    ];

    const siweMessage = new SiweMessage({
      domain: "localhost:3000",
      address,
      statement: "",
      uri: "http://localhost:3000/signers/TLZ_dBPayaEHI-l7BWcv0YpyIsO24pKH1LW0wwWFTctAbXAXwpgqo2sFHcXJbqdCRivoojzlj5IL76Yvl2evDQ",
      version: "1",
      chainId: 1,
    });

    const wallet = createWalletClient({
      chain: polygonMumbai,
      transport: custom(provider),
    });

    const messageToSign = siweMessage.prepareMessage();

    const [account] = await wallet.getAddresses();
    if (!account) {
      throw Error("account not found");
    }

    const signature = await wallet.signMessage({
      account: account,
      message: messageToSign,
    });

    const authSig: AuthSig = {
      sig: signature,
      derivedVia: "web3.eth.personal.sign",
      signedMessage: messageToSign,
      address: address,
    };

    const symmetricKey = await client.getEncryptionKey({
      accessControlConditions: ACCs,
      toDecrypt: encryptedSymmetricKey,
      authSig,
      chain,
    });

    const encryptedCID = await LitJsSdk.base64StringToBlob(encryptedString);

    const CID = await LitJsSdk.decryptString(encryptedCID, symmetricKey);
    return { CID };
  };

  return { encrypt, decrypt };
};