/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Button from "@/components/button";
import { ReactNode, useEffect, useState } from "react";
import { useAuthRecipient } from "@/hooks/useAuthRecipient";
import { getEmailFromUserId, getUserIdFromJwt } from "@/libs/privy";
import { useWallets } from "@privy-io/react-auth";
import PDFViewer from "@/components/pdfViewer";
import { useLit } from "@/hooks/useLit";
import { EncryptState } from "./encryptState";
import Spinner from "@/components/spinner";
import { useSign } from "./useSign";

const SignPage = ({ params }: { params: { encrypted_cid: string } }) => {
  const { user, getAccessToken } = useAuthRecipient();
  const { decrypt } = useLit();
  const { wallets } = useWallets();
  const [CID, setCID] = useState<string>(params.encrypted_cid);
  const [encryptState, setEncryptState] = useState<EncryptState>(
    EncryptState.Success,
  );
  const { signContract } = useSign({ encryptedCid: params.encrypted_cid });

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy",
  );

  useEffect(() => {
    const effect = async () => {
      if (!user) {
        return;
      }
      const jwt = await getAccessToken();
      if (!jwt) return;
      const userId = await getUserIdFromJwt(jwt);

      if (!userId) return;
      const email = await getEmailFromUserId(userId);
      console.log(email);
    };

    void effect();
  }, [user, getAccessToken]);

  // useEffect(() => {
  //   const effect = async () => {
  //     if (embeddedWallet) {
  //       const provider = await embeddedWallet.getEthereumProvider();
  //       const addr = embeddedWallet?.address;
  //
  //       const symmetrickKey = ""; // TODO
  //
  //       try {
  //         const { CID } = await decrypt(
  //           provider,
  //           addr,
  //           params.encrypted_cid,
  //           symmetrickKey,
  //         );
  //         setCID(CID);
  //         setEncryptState(EncryptState.Success);
  //       } catch (e) {
  //         console.dir(e, { depth: null });
  //         setEncryptState(EncryptState.Fail);
  //       }
  //     }
  //   };
  //   void effect();
  // }, []);

  const url = `https://ipfs.io/ipfs/${CID}`;
  return (
    <main className="h-[calc(100vh-70px)] bg-slate-50 py-16">
      {(() => {
        switch (encryptState) {
          case EncryptState.InProgress:
            return (
              <div className="mx-auto w-48 text-center">
                <Spinner className="mx-auto mb-4" />
                <span className="mx-auto inline-block">
                  Decrypting contract...
                </span>
              </div>
            );
          case EncryptState.Success:
            return (
              <div className="mx-auto flex h-full w-3/4 flex-row justify-around">
                <PDFViewer file={url} className="max-h-[720px]" />
                <div className="flex flex-col justify-around">
                  <Button
                    className="mt-8 w-72"
                    text="Sign Contract"
                    onClick={signContract}
                  />
                </div>
              </div>
            );
          case EncryptState.Fail:
            return (
              <div
                className="relative mx-auto w-3/4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                role="alert"
              >
                <strong className="font-bold">Decryption failed. </strong>
                <span className="block sm:inline">
                  You cannot show this contract.
                </span>
              </div>
            );
        }
      })()}
    </main>
  );
};

export default SignPage;
