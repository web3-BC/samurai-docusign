"use client";

import { PDFJS_WORKER_SOURCE } from "@/constants";
import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import {
  DocumentCallback,
  OnDocumentLoadSuccess,
} from "react-pdf/dist/cjs/shared/types";
import Spinner from "./spinner";

pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SOURCE;

type PDFViewerProps = {
  file: string | File;
  className?: string;
  scale?: number;
};

const PDFViewer = ({ file, className, scale }: PDFViewerProps) => {
  const [pageNum, setPageNum] = useState<number>(0);
  const [showDocument, setShowDocument] = useState<boolean>(false);
  const onLoadError = (e: Error): void => {
    console.error("react-pdf load error:", e.message);
  };
  const onLoadSucess: OnDocumentLoadSuccess = (
    document: DocumentCallback,
  ): void => {
    setPageNum(document.numPages);
    setShowDocument(true);
  };
  return (
    <>
      {showDocument || (
        <div className="w-[612px] flex flex-col justify-center space-y-4">
          <Spinner className="mx-auto text-gray-500" />
          <p className="mx-auto">loading...</p>
        </div>
      )}
      <Document
        file={file}
        onLoadError={onLoadError}
        onLoadSuccess={onLoadSucess}
        renderMode="canvas"
        className={`overflow-y-scroll shadow-xl ${className || ""} ${
          showDocument || "hidden"
        }`}
      >
        {Array.from(new Array(pageNum), (_, index) => (
          <Page
            key={index}
            scale={scale || 1}
            pageNumber={index + 1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading="Loading Contract..."
          />
        ))}
      </Document>
    </>
  );
};

export default PDFViewer;
