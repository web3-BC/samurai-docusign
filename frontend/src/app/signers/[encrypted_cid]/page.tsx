"use client";

import Button from "@/components/button";
import { useEffect } from "react";
import { useAuthRecipient } from "@/hooks/useAuthRecipient";
import { getEmailFromUserId, getUserIdFromJwt } from "@/libs/privy";
import PDFViewer from "@/components/pdfViewer";

const decryptCid = (enCid: string) => {
  return enCid;
};

const SignPage = ({ params }: { params: { encrypted_cid: string } }) => {
  const { user, getAccessToken } = useAuthRecipient();

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
  const cid = decryptCid(params.encrypted_cid);

  const url = `https://ipfs.io/ipfs/${cid}`;
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
