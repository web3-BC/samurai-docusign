import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <main className="mx-auto w-full">
      <section className="bg-gradient mx-auto">
        <header className="shadow-b-lg z-10 h-[70px] w-full py-3">
          <div className="mx-auto flex h-full max-w-5xl items-center justify-between">
            <div className="text-2xl font-bold text-white">
              <Link href={"/"}>Samurai Sign</Link>
            </div>
            <div className="rounded-2xl border border-white px-4 py-1 text-lg font-bold text-white">
              <Link href={"/issuers/contracts/new"}>Create New Contract</Link>
            </div>
          </div>
        </header>
        <div className="px-20 py-56">
          <div className="mr-auto max-w-fit">
            <h2 className="inline text-6xl font-bold leading-[74px] text-white">
              Trustless & UX evolved <br />
              Document Signing dApp
            </h2>
            <div className="ml-auto mt-6 max-w-fit rounded-2xl border border-white px-6 py-2 text-2xl font-bold text-white">
              <Link href={"/issuers/contracts/new"}>Create New Contract</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto bg-white px-20 py-14">
        <h2 className="text-5xl font-bold text-secondary-500">
          Multi-Chain Support
        </h2>
        <p className="mt-4 text-secondary-500">
          Samurai sign supports multiple chains from L1 such as Ethereum to EVM
          compatible L2 chains such as arbitrum and scroll.
        </p>
        <div className="mt-4 grid grid-cols-2 items-center justify-around gap-2 px-56">
          <Image
            height={32}
            width={160}
            src={"/images/eth-logo.svg"}
            alt="Chain Logo"
            className="w-full"
          />
          <Image
            height={32}
            width={160}
            src={"/images/polygon-logo.svg"}
            alt="Chain Logo"
            className="w-full"
          />
          <Image
            height={32}
            width={160}
            src={"/images/scroll-logo.svg"}
            alt="Chain Logo"
            className="w-full"
          />
          <Image
            height={32}
            width={160}
            src={"/images/arbitrum-logo.svg"}
            alt="Chain Logo"
            className="w-full"
          />
        </div>
      </section>
      <section className="mx-auto bg-secondary-500 px-20 py-14">
        <h3 className="mb-6 text-5xl font-bold text-white">Features</h3>
        <div className="mx-auto grid grid-cols-3 justify-around gap-4 px-10 text-white">
          <div className="rounded-xl border border-white p-6">
            <p className="mb-4 text-4xl">📃</p>
            <p className="mb-4 text-xl">True P2P Contract Signing</p>
            <p className="text-sm">
              Using Lit Protocol and IPFS, we provide a true P2P contracting
              service without the need for specific cloud services or storage.
            </p>
          </div>
          <div className="rounded-xl border border-white p-6">
            <p className="mb-4 text-4xl">💰</p>
            <p className="mb-4 text-xl">Sign, no wallet and fees</p>
            <p className="text-sm">
              Technologies such as Biconomy and Privy eliminate the need for
              signers to pay for wallets and Gas.
            </p>
          </div>
          <div className="rounded-xl border border-white p-6">
            <p className="mb-4 text-4xl">🌎</p>
            <p className="mb-4 text-xl">Sybil Resistant by WorldID</p>
            <p className="text-sm">
              World ID proves that the contract issuer is a human being, making
              it more sybil-resistant.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto bg-white px-20 py-14">
        <h3 className="mb-6 text-center text-5xl font-bold text-secondary-500">
          Powered by
        </h3>
        <div className="grid grid-cols-2 items-center justify-around gap-2 px-56">
          <Image
            height={32}
            width={160}
            src={"/images/lit-logo.svg"}
            alt="Lit Logo"
            className="w-full"
          />
          <Image
            height={32}
            width={160}
            src={"/images/privy-logo.svg"}
            alt="Privy Logo"
            className="h-20 w-full object-contain"
          />
          <Image
            height={32}
            width={160}
            src={"/images/biconomy-logo.png"}
            alt="WorldCoin Logo"
            className="w-full object-contain"
          />
          <Image
            height={32}
            width={160}
            src={"/images/worldcoin-logo.png"}
            alt="WorldCoin Logo"
            className="w-full object-contain"
          />
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
