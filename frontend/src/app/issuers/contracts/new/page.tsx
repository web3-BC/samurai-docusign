"use client";

import { useState } from "react";
import FileUploader from "./fileUploader";
import Stepper from "./stepper";
import { useIPFS } from "@/hooks/useIpfs";
import { useLit } from "@/hooks/useLit";
import Button from "@/components/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import WorldCoinButton from "@/components/worldcoinButton";
import { createWalletClient, custom } from "viem";
import { CONTRACT_ADDRESS, currentChain, publicClient } from "@/libs/viem";
import { ABI } from "@/constants";
import toast from "react-hot-toast";
import Spinner from "@/components/spinner";
import CopyURL from "@/components/copyUrl";
import { hashEmail } from "@/utils";
import { Steps } from "./steps";

const CreateContractPage = () => {
  const searchParams = useSearchParams();
  const queryStep = searchParams?.get("step") || "0";
  const initialStep = Number(queryStep);
  const [currentStep, setCurrentStep] = useState<Steps>(initialStep);
  const [file, setFile] = useState<File>();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [encryptedCID, setEncryptedCID] = useState<string>("");

  const { upload } = useIPFS();
  const { encrypt } = useLit();
  const onClickIssueContract = async () => {
    if (file) {
      const cid = await upload(file);

      const { encryptedCID, encryptedSymmetricKey } = await encrypt(cid);
      console.log("encryptedCID:", encryptedCID);
      console.log("encryptedSymmetricKey:", encryptedSymmetricKey);

      const hashedEmail = hashEmail(email);

      const walletClient = createWalletClient({
        chain: currentChain,
        transport: custom(window.ethereum),
      });
      const [account] = await walletClient.getAddresses();

      try {
        const { request } = await publicClient.simulateContract({
          account,
          address: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: "issueContract",
          args: [encryptedCID, hashedEmail, encryptedSymmetricKey],
        });
        const result = await walletClient.writeContract(request);
        console.log({ result });
      } catch (error) {
        toast.error(error as string);
        setIsLoading(false);
        return;
      }

      setEncryptedCID(encryptedCID);
      setIsLoading(false);
      setCurrentStep(Steps.GetLink);
    } else {
      toast.error("input is invalid");
    }
  };

  return (
    <main className="h-[calc(100vh-70px)] py-16">
      <div className="mx-auto w-[1200px]">
        <Stepper currentStep={currentStep} className="mb-8" />
        {(() => {
          switch (currentStep) {
            case Steps.VerifyHuman:
              return (
                <div className="w-1/3">
                  <WorldCoinButton
                    onClick={() => {
                      signIn("worldcoin");
                    }}
                  />
                </div>
              );
            case Steps.FileUpload:
              return (
                <FileUploader file={file} setFile={setFile}>
                  <Button
                    text="Next"
                    onClick={() => setCurrentStep(Steps.RegisterSinger)}
                    className=""
                  />
                </FileUploader>
              );
            case Steps.RegisterSinger:
              return (
                <div className="mx-auto w-1/3">
                  <label
                    htmlFor="email"
                    className="mb-2 block font-medium text-gray-900 dark:text-white"
                  >
                    Signer email
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-8 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  />
                  <div className="flex flex-row justify-between">
                    <Button
                      text="Back"
                      onClick={() => setCurrentStep(Steps.FileUpload)}
                      className=""
                    />
                    <Button
                      text="Create Contract"
                      onClick={() => {
                        console.log("Create Contract");
                        onClickIssueContract();
                      }}
                      className=""
                    />
                  </div>
                </div>
              );
            case Steps.GetLink:
              return (
                <div className="mx-auto w-1/3">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <p>Create contract succeeded!</p>
                      <img src="/success-icon.png" className="w-2/4" />
                      <p>Click url to copy!</p>
                      <CopyURL url={`https://ipfs.io/ipfs/${encryptedCID}`} />
                    </>
                  )}
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    </main>
  );
};

export default CreateContractPage;
