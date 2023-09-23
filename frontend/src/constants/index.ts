import { http } from "viem";

export const RPC_LIST = {
  arbitrumGoerli: [
    http(),
    http(
      `https://arb-goerli.g.alchemy.com/v2/${process.env
        .NEXT_PUBLIC_ALCHEMY_API_KEY!}`,
    ),
  ],
  polygonMumbai: [
    http(),
    http(
      `https://polygon-mumbai.g.alchemy.com/v2/${process.env
        .NEXT_PUBLIC_ALCHEMY_API_KEY!}`,
    ),
  ],
};

export const PDFJS_WORKER_SOURCE =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js";
