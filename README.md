# Samurai DocuSign

A project for ETHGlobal New York 2023!

## Project Abstract

**Trustless** & **UX evolved** document signing dApp!!

✨ No censorship & control by App. True P2P contract signing

🔥 Gasless signing user experience by AA and paymaster. _Signer doesn't need wallet & gas fee_

👁 Sybil Resistant by WorldID. _Only human_ can issue a legit contract document.

💎 Secure access control, encrypt & decrypt by Lit & IPFS.

🌐 Multi-chain support! (Polygon zkEVM / Arbitrum One / Scroll Sepolia)

### User experience flow

(write later...)

## Tech Architecture

2 actors in App.

- Issuer(create a contract document)
- Signer(sign a contract issued by Issuer)

### Issuer tech flow

1. connect wallet
2. verify issuer is a legit human with Worldcoin
3. specify the signer by providing the signer's email
4. upload contract document(PDF) to IPFS
5. encrypt the CID with Lit SDK
6. write (encryptedCID, hashedEmail, encryptedSymmetricKey) on smart contract

### Signer tech flow

1. Social Login with Google
2. create EOA with Privy
3. create SCW(Smart Account) with Biconomy SDK
4. verify the signer has a expected email with LitAction
5. decrypt the `encryptedCID` and get document CID
6. view the contract document with CID
7. sign with Gasless tx by Biconomy SDK

### Sequence

![technical architecture](./public//architecture.png)