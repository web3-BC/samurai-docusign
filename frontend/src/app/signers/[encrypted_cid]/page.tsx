"use client";

import Button from "@/components/button";
import { useEffect, useState } from "react";
import { useAuthRecipient } from "@/hooks/useAuthRecipient";
import { getEmailFromUserId, getUserIdFromJwt } from "@/libs/privy";
import { useWallets } from "@privy-io/react-auth";
import PDFViewer from "@/components/pdfViewer";
import { useLit } from "@/hooks/useLit";

const SignPage = ({ params }: { params: { encrypted_cid: string } }) => {
  const { user, getAccessToken } = useAuthRecipient();
  const { decrypt } = useLit();
  const { wallets } = useWallets();
  const [ CID, setCID ] = useState<string>("");

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

  useEffect(() => {
    const effect = async () => {
      if (embeddedWallet) {
        const provider = await embeddedWallet.getEthereumProvider();
        const addr = embeddedWallet?.address;

        const symmetrickKey = "" // TODO

        try {
          setCID(await decrypt(provider, addr, params.encrypted_cid, symmetrickKey))
        } catch (e) {
          console.dir(e, { depth: null });
        }
      }
    };
    void effect();
  }, []);

  const url = `https://ipfs.io/ipfs/${CID}`;
  return (
    <main className="h-[calc(100vh-70px)] bg-slate-50 py-16">
      <div className="mx-auto flex h-full w-3/4 flex-row justify-around">
        <PDFViewer file={url} className="max-h-[720px]" />
        <div className="flex flex-col justify-around">
          <Button
            className="mt-8 w-72"
            text="Sign Contract"
            onClick={() => {
              console.log("sign");
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default SignPage;
