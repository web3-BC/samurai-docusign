import * as LitJsSdk from "@lit-protocol/lit-node-client";

export const client = new LitJsSdk.LitNodeClient({
  litNetwork: "serrano",
  alertWhenUnauthorized: false,
  debug: false,
});
export const chain = "ethereum";

export const litActionUrl =
  "ipfs://QmUEPzfksNFB3qBHffPpbaiuZ5p1p8qZtnoCNXvNwHzZGX";
// "ipfs://QmX3ATabgddAd1fhtsQjWzFGFsYRmKzBZXXEusYaUNurcT";
