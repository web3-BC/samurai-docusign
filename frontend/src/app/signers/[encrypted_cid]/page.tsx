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
import { useContract } from "@/hooks/useContract";

const SignPage = ({ params }: { params: { encrypted_cid: string } }) => {
  const { user, getAccessToken } = useAuthRecipient();
  const { decrypt } = useLit();
  const { wallets } = useWallets();
  const [CID, setCID] = useState<string>("");
  const [encryptState, setEncryptState] = useState<EncryptState>(
    EncryptState.Success,
  );
  const { signContract, isSigning } = useSign({
    encryptedCid: params.encrypted_cid,
  });
  const [isFirstLitReq, setIsFirstLitReq] = useState(true);
  const { getContractByEncryptedCid } = useContract();

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

      if (embeddedWallet && isFirstLitReq) {
        const provider = await embeddedWallet.getEthereumProvider();
        const addr = embeddedWallet?.address;
        console.log('addr' + addr);

        const { encryptedSymmetricKey } = await getContractByEncryptedCid(params.encrypted_cid);
        try {
          console.log('encryptedSymmetricKey:' + encryptedSymmetricKey);
          console.log('cid: ' + params.encrypted_cid)
          const { CID } = await decrypt(
            provider,
            addr,
            params.encrypted_cid,
            encryptedSymmetricKey,
          );
          setCID(CID);
          setEncryptState(EncryptState.Success);
          setIsFirstLitReq(false);
        } catch (e) {
          console.dir(e, { depth: null });
          setEncryptState(EncryptState.Fail);
        }
      }
    };

    void effect();
  }, [user, getAccessToken]);

  const url = `https://ipfs.io/ipfs/${CID}`;
  return (
    <main className="h-[calc(100vh-70px)] py-16">
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
                    isLoading={isSigning}
                    loadingText="Signing now..."
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
