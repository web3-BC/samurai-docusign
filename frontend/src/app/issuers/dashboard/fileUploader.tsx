"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useIPFS } from "@/hooks/useIpfs";
import Spinner from "@/components/spinner";
import { useLit } from "@/hooks/useLit";
import { hashEmail } from "@/app/utils";
import { createWalletClient, custom } from "viem";
import { CONTRACT_ADDRESS, currentChain, publicClient } from "@/libs/viem";
import { ABI } from "@/constants";

const FileUploader = () => {
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { upload } = useIPFS();
  const { encrypt } = useLit();

  useEffect(() => {
    let fileReader: FileReader;
    let isCancel = false;

    if (file) {
      fileReader = new FileReader();
      fileReader.onload = () => {
        const result = fileReader.result;
        if (result && !isCancel) {
          setFileUrl(result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const onChangeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    // if (file?.type !== "application/pdf") {
    //   toast("PDFs are only supported");
    //   return;
    // }

    setFile(file);
  }, []);

  const onClickIssueContract = async () => {
    if (file && email) {
      setIsLoading(true);
      try {
        const cid = await upload(file);
        console.log(cid)
        // const { encryptedCID, encryptedSymmetricKey } = await encrypt(cid);

        // console.log("encryptedCID:", encryptedCID);
        // console.log("encryptedSymmetricKey:", encryptedSymmetricKey);

        // const hashedEmail = hashEmail(email);

        // const walletClient = createWalletClient({
        //   chain: currentChain,
        //   transport: custom(window.ethereum),
        // });
        // const [account] = await walletClient.getAddresses();

        // const { request } = await publicClient.simulateContract({
        //   account,
        //   address: CONTRACT_ADDRESS,
        //   abi: ABI,
        //   functionName: "issueContract",
        //   args: [encryptedCID, hashedEmail, encryptedSymmetricKey],
        // });

        // const txHash = await walletClient.writeContract(request);
        // toast.success(`your tx has been sent: ${txHash}`);
      } catch (error) {
        toast.error(error as string);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("input is invalid");
    }
  };

  return (
    <div className="mx-auto max-w-fit bg-white px-10 py-8">
      <p className="mb-8 text-center text-2xl">
        Drag & drop PDF file or Browse to get started
      </p>
      <div className="mb-4 flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              supported format: PDF
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={onChangeFile}
          />
        </label>
      </div>
      <div className="w-full">
        <label
          htmlFor="email"
          className="mb-2 block font-medium text-gray-900 dark:text-white"
        >
          Recipient email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
        />
      </div>
      {fileUrl && (
        <>
          <p className="mt-6">Selected 👉 {file?.name}</p>
          <button
            onClick={onClickIssueContract}
            className="mx-auto mt-6 flex items-center gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            {isLoading && <Spinner />}
            Issue Contract
          </button>
        </>
      )}
    </div>
  );
};

export default FileUploader;
