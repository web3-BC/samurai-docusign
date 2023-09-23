"use client";

import { ipfs } from "@/libs/ipfs";

export const useIPFS = () => {
  const upload = async (file: File) => {
    let cid = "";

    try {
      const added = await ipfs.add(file);
      // TODO: コントラクトにCIDと宛先のgmailを刻む
      cid = added.cid.toString();
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    return cid;
  };

  return { upload };
};