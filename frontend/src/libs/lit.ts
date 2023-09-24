import * as LitJsSdk from "@lit-protocol/lit-node-client";

export const client = new LitJsSdk.LitNodeClient({
  litNetwork: "serrano",
  alertWhenUnauthorized: false,
  debug: false
});
export const chain = "ethereum";

export const litActionUrl = "ipfs://QmfKK9XW4EoJZZHJPZJJ4PJ2n6JfNPueqnXL3CYz649VLG"
// "QmNvidh55hgGqoKece5SYzuGd6n8MP9qCwPNz8xjGXcPh8"
  // "ipfs://QmX3ATabgddAd1fhtsQjWzFGFsYRmKzBZXXEusYaUNurcT";

export const litActionCode = `
const verify = async () => {
  try {
    // fetch hashedEmail from contract
    const url = "https://samurai-docusign.vercel.app/api/get_hashed_email?enCid=" + enCid;
    const res = await fetch(url);
    const result = await res.json();
    console.log(result);

    // get hashed email from privy JWT
    const url2 = "https://samurai-docusign.vercel.app/api/get_hashed_email_from_jwt?jwt=" + jwt;
    const res2 = await fetch(url2);
    const result2 = await res2.json();
    console.log(result2);

    // compare hashedEmail
    LitActions.setResponse({
      response: JSON.stringify(result.hashedEmail == result2.hashedEmail),
    });
  } catch (error) {
    LitActions.setResponse({
      response: JSON.stringify(false),
    });
  }
};

verify();
`;
