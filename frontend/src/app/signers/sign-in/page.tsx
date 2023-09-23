"use client";
import { useLit } from "@/hooks/useLit";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

const SignerPage = () => {
  const { login } = usePrivy();
  const { wallets } = useWallets();
  const [enCid, setEnCid] = useState('');
  const [key, setKey] = useState('');
  const { decrypt } = useLit();
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');

  const handleChangeEnCid = (e: any) => {
    setEnCid(e.target.value);
  };

  const handleChangeKey = (e: any) => {
    setKey(e.target.value);
  };

  const handleClickBtn = async (e: any) => {
    if (embeddedWallet) {
      const provider = await embeddedWallet.getEthereumProvider();
      console.log('provider: ' + provider);
      const addr = embeddedWallet?.address;
      console.log('addr: ' + addr);
      
      try{
        const {CID} = await decrypt(provider, addr, enCid, key);
        alert(CID);
        console.log(CID);
      }catch(e){
        console.dir(e,  { depth: null });
        alert(e)
      }
    }
  }

  // useEffect(() => {
  //   const getEOA = async () => {
  //     const provider = await wallets[0]?.getEthersProvider();
  //     const signer = provider?.getSigner();
  //     if (!signer) {
  //       throw new Error("Signer not found");
  //     }
  //   };
  //   getEOA();
  // }, [wallets]);

  return (
    <main className="mx-auto min-h-screen max-w-5xl pt-10">
      <div className="mx-auto max-w-fit bg-white px-10 py-8">
        <p className="mb-8 text-center text-2xl">Start signing your contract</p>
        <button
          type="button"
          className="mb-2 mr-2 flex items-center rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
          onClick={login}
        >
          Sign in
        </button>
        <input type='text' placeholder="enCid" onChange={handleChangeEnCid} />
        <input type='text' placeholder="key" onChange={handleChangeKey} />
        <button
          type="button"
          className="mb-2 mr-2 flex items-center rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
          onClick={handleClickBtn}
        >decrypt</button>
      </div>
    </main>
  );
};

export default SignerPage;