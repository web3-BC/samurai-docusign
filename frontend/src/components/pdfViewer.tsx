"use client";

import { PDFJS_WORKER_SOURCE } from "@/constants";
import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import {
  DocumentCallback,
  OnDocumentLoadSuccess,
} from "react-pdf/dist/cjs/shared/types";

pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SOURCE;

type PDFViewerProps = {
  file: string | File;
  className?: string;
};

const PDFViewer = ({ file, className }: PDFViewerProps) => {
  const [pageNum, setPageNum] = useState<number>(0);
  const onLoadError = (e: Error): void => {
    console.error("react-pdf load error", e.message);
  };
  const onLoadSucess: OnDocumentLoadSuccess = (
    document: DocumentCallback,
  ): void => {
    setPageNum(document.numPages);
  };
  return (
    <Document
      file={file}
      onLoadError={onLoadError}
      onLoadSuccess={onLoadSucess}
      renderMode="canvas"
      className={`max-h-[720px] overflow-y-scroll ${className || ""}}`}
    >
      {Array.from(new Array(pageNum), (_, index) => (
        <Page
          key={index}
          pageNumber={index + 1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          loading="Loading Contract..."
        />
      ))}
    </Document>
  );
};

export default PDFViewer;
