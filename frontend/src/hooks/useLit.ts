"use client";

import { createWalletClient, custom } from "viem";
import { chain, client } from "@/libs/lit";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { SiweMessage } from "siwe";
import { AccessControlConditions, AuthSig } from "@lit-protocol/types";
import { EIP1193Provider } from "@privy-io/react-auth";
import { polygonMumbai } from "viem/chains";

export const useLit = () => {
  const connect = async () => {
    await client.connect();
  };

  const ACCs: AccessControlConditions = [
    {
      contractAddress: "ipfs://QmcgbVu2sJSPpTeFhBd174FnmYmoVYvUFJeDkS7eYtwoFY",
      standardContractType: "LitAction",
      chain: chain,
      method: "go",
      parameters: ["100"],
      returnValueTest: {
        comparator: "=",
        value: "true",
      },
    },
  ];

  const encrypt = async (cid: string) => {
    await connect();

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
    
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(cid);

    const encryptedSymmetricKey = await client.saveEncryptionKey({
      accessControlConditions: ACCs,
      symmetricKey,
      authSig,
      chain,
      permanent: false,
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
    connect();

    const ACCs: AccessControlConditions = [
      {
        contractAddress: "ipfs://QmcgbVu2sJSPpTeFhBd174FnmYmoVYvUFJeDkS7eYtwoFY",
        standardContractType: "LitAction",
        chain: chain,
        method: "go",
        parameters: ["120"],
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
      uri: "http://localhost:3000/signers/sign-in",
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

  const updateACCs = async(
    provider: EIP1193Provider,
    address: string,
    encryptedSymmetricKey: string) => {

    connect();

    const siweMessage = new SiweMessage({
      domain: "localhost:3000",
      address,
      statement: "",
      uri: "http://localhost:3000/signers/sign-in",
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

    const newAccessControlConditions: AccessControlConditions = [
      {
        contractAddress: "ipfs://QmcgbVu2sJSPpTeFhBd174FnmYmoVYvUFJeDkS7eYtwoFY",
        standardContractType: "LitAction",
        chain: chain,
        method: "go",
        parameters: ["120"],
        returnValueTest: {
          comparator: "=",
          value: "true",
        },
      },
    ];

    const symmetricKey = await client.getEncryptionKey({
      accessControlConditions: ACCs,
      toDecrypt: encryptedSymmetricKey,
      authSig,
      chain,
    });

    const newEncryptedSymmetricKey = await client.saveEncryptionKey({
      accessControlConditions: newAccessControlConditions,
      symmetricKey,
      authSig,
      chain,
      permanent: false,
    });

    console.log(newEncryptedSymmetricKey);
    alert(newEncryptedSymmetricKey);
    console.log(LitJsSdk.uint8arrayToString(
      newEncryptedSymmetricKey,
      "base16",
    ));
    alert(LitJsSdk.uint8arrayToString(
      newEncryptedSymmetricKey,
      "base16",
    ));
    return {newEncryptedSymmetricKey}
  }

  return { encrypt, decrypt, updateACCs };
};
