"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import PDFViewer from "@/components/pdfViewer";

type FileUploaderProps = {
  file?: File;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  children: React.ReactNode;
};

const FileUploader = ({ file, setFile, children }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState<string>("");

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
    if (file?.type !== "application/pdf") {
      toast("PDFs are only supported");
      return;
    }

    setFile(file);
  }, []);

  return (
    <div className="mx-auto flex justify-around flex-row px-10">
      <div className="w-1/2">
        <h3 className="mb-8 text-center text-2xl font-bold">
          Upload your Contract
        </h3>
        <div className="flex w-full items-center justify-center">
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
                <span className="font-semibold">Click to upload</span> or drag
                and drop
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
        {fileUrl && (
          <>
            <p className="my-6">Selected 👉 {file?.name}</p>
            {children}
          </>
        )}
      </div>
      {fileUrl && (
        <div className="ml-32">
          <p className="mb-4 text-2xl font-bold">Preview</p>
          <PDFViewer file={file!} className="max-h-[660px]" />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
