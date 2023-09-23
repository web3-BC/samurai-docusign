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

export const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "encryptedCid",
        type: "string",
      },
    ],
    name: "ContractIssued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "encryptedCid",
        type: "string",
      },
    ],
    name: "ContractSigned",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "encryptedCidToContract",
    outputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "string",
        name: "encryptedCid",
        type: "string",
      },
      {
        internalType: "string",
        name: "hashedEmail",
        type: "string",
      },
      {
        internalType: "string",
        name: "encryptedSymmetricKey",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isSigned",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "encryptedCid",
        type: "string",
      },
    ],
    name: "getContractByEncryptedCid",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "string",
            name: "encryptedCid",
            type: "string",
          },
          {
            internalType: "string",
            name: "hashedEmail",
            type: "string",
          },
          {
            internalType: "string",
            name: "encryptedSymmetricKey",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isSigned",
            type: "bool",
          },
        ],
        internalType: "struct ContractManager.Contract",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "encryptedCid",
        type: "string",
      },
      {
        internalType: "string",
        name: "hashedEmail",
        type: "string",
      },
      {
        internalType: "string",
        name: "encryptedSymmetricKey",
        type: "string",
      },
    ],
    name: "issueContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "encryptedCid",
        type: "string",
      },
    ],
    name: "signContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
