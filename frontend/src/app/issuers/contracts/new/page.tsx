"use client";

import { useState } from "react";
import FileUploader from "./fileUploader";
import Stepper from "./stepper";
import { useIPFS } from "@/hooks/useIpfs";
import { useLit } from "@/hooks/useLit";
import Button from "@/components/button";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import WorldCoinButton from "@/components/worldcoinButton";
import { Address, createWalletClient, custom } from "viem";
import { CONTRACT_ADDRESS, defaultChain, publicClient } from "@/libs/viem";
import { ABI } from "@/constants";
import toast from "react-hot-toast";
import Spinner from "@/components/spinner";
import CopyURL from "@/components/copyUrl";
import { hashEmail } from "@/utils";
import { Steps } from "./steps";
import Image from "next/image";

const CreateContractPage = () => {
  const searchParams = useSearchParams();
  const queryStep = searchParams?.get("step") || "0";
  const initialStep = Number(queryStep);
  const [currentStep, setCurrentStep] = useState<Steps>(initialStep);
  const [file, setFile] = useState<File>();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [encryptedCID, setEncryptedCID] = useState("");
  const [txHash, setTxHash] = useState<Address>();
  const { status } = useSession();

  if (currentStep === Steps.VerifyHuman && status === "authenticated") {
    toast.success("You are Human!");
    setCurrentStep(Steps.FileUpload);
  }

  const { upload } = useIPFS();
  const { encrypt } = useLit();
  const onClickIssueContract = async () => {
    if (file) {
      const cid = await upload(file);

      const { encryptedCID, encryptedSymmetricKey } = await encrypt(cid);
      console.log("encryptedCID:", encryptedCID);
      console.log("encryptedSymmetricKey:", encryptedSymmetricKey);
      if (!encryptedCID || !encryptedSymmetricKey) {
        return;
      }

      const hashedEmail = hashEmail(email);

      const walletClient = createWalletClient({
        chain: defaultChain,
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
        const txHash = await walletClient.writeContract(request);
        setTxHash(txHash);
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
    <main className="min-h-[calc(100vh-70px-179px)] py-16">
      <div className="mx-auto w-[1200px]">
        <Stepper currentStep={currentStep} className="mb-8" />
        {(() => {
          switch (currentStep) {
            case Steps.VerifyHuman:
              return (
                <div className="mx-auto w-2/3">
                  <h3 className="mb-8 text-center text-3xl font-bold">
                    Verify with Worldcoin
                  </h3>
                  <WorldCoinButton
                    onClick={() => {
                      signIn("worldcoin");
                    }}
                  />

                  <button
                    onClick={() => {
                      setCurrentStep(Steps.FileUpload);
                    }}
                    className="mx-auto my-4 flex rounded-xl bg-blue-800 px-3.5 py-2.5 text-sm text-white"
                  >
                    or (Skip for demo)
                  </button>
                </div>
              );
            case Steps.FileUpload:
              return (
                <FileUploader file={file} setFile={setFile}>
                  <Button
                    text="Next"
                    onClick={() => setCurrentStep(Steps.RegisterSigner)}
                    className=""
                  />
                </FileUploader>
              );
            case Steps.RegisterSigner:
              return (
                <div className="mx-auto w-1/2">
                  <h3 className="mb-8 text-center text-3xl font-bold">
                    Register signer email address
                  </h3>
                  <div className="mx-auto w-2/3">
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
                  </div>
                  <div className="mx-auto flex w-2/3 flex-row justify-between">
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
                <div className="mx-auto w-2/5">
                  {isLoading ? (
                    <Spinner className="mx-auto h-12 w-12" />
                  ) : (
                    <>
                      <h3 className="mb-2 text-center text-3xl font-bold">
                        Create contract succeeded!🎉
                      </h3>
                      {txHash && (
                        <p className="text-center">
                          You can check your tx{" "}
                          <a
                            href={`https://mumbai.polygonscan.com/${txHash}`}
                            className="text-secondary-500"
                          >
                            here
                          </a>
                        </p>
                      )}

                      <Image
                        width={100}
                        height={100}
                        alt="Success Icon"
                        src="/images/success-icon.png"
                        className="mx-auto mt-8 w-2/4"
                      />

                      <div className="text-center">
                        <p>Click url to copy!</p>
                        <CopyURL url={`http://localhost:3000/signers/${encryptedCID}`} />
                      </div>
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
