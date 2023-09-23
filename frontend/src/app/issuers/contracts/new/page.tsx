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
                <FileUploader
                  file={file}
                  setFile={setFile}
                >
		  <StepChanger />
		</FileUploader>
              );
            case Steps.RegisterSinger:
              return <div>RegisterSigner</div>;
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
