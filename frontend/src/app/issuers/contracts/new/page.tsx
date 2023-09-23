"use client";

import { Dispatch, SetStateAction, useState } from "react";
import FileUploader from "./fileUploader";
import Stepper from "./stepper";
import { useIPFS } from "@/hooks/useIpfs";
import { useLit } from "@/hooks/useLit";
import Button from "@/components/button";

export enum Steps {
  FileUpload = 1,
  RegisterSinger,
  VerifyHuman,
  GetLink,
}


const CreateContractPage = () => {
  const [currentStep, setCurrentStep] = useState<Steps>(Steps.FileUpload);
  const [file, setFile] = useState<File>();
  const [email, setEmail] = useState<string>("");

  const { upload } = useIPFS();
  const { encrypt } = useLit();
  const onClickUpload = async () => {
    if (file) {
      const cid = await upload(file);

      const { encryptedCID, encryptedSymmetricKey } = await encrypt(cid);
      console.log("encryptedCID:", encryptedCID);
      console.log("encryptedSymmetricKey:", encryptedSymmetricKey);
    }
  };

  const StepChanger = () => {
    return (
      <div>
        <Button
          text="back"
          onClick={() => setCurrentStep(currentStep - 1)}
          className=""
        />
        <Button
          text="next"
          onClick={() => setCurrentStep(currentStep + 1)}
          className=""
        />
      </div>
    );
  };

  return (
    <main className="h-[calc(100vh-70px)] bg-slate-50 py-16">
      <div className="mx-auto w-[1200px]">
        <Stepper currentStep={currentStep} className="mb-8" />
        {(() => {
          switch (currentStep) {
            case Steps.FileUpload:
              return (
                <FileUploader file={file} setFile={setFile}>
                  <StepChanger />
                </FileUploader>
              );
            case Steps.RegisterSinger:
              return (
                <div className="w-1/3">
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
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  />
                  <StepChanger />
                </div>
              );
            case Steps.VerifyHuman:
              return <div>VerifyHuman</div>;
            case Steps.GetLink:
              return <div>GetLink</div>;
            default:
              return null;
          }
        })()}
      </div>
    </main>
  );
};

export default CreateContractPage;
