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
          <h2 className="inline text-6xl font-bold leading-[74px] text-white">
            Trustless & UX evolved <br />
            Document Signing dApp
          </h2>
        </div>
      </section>
      <section className="mx-auto bg-white px-20 py-10">
        <h2 className="text-5xl font-bold text-secondary-500">
          Multi-Chain Support
        </h2>
        <p className="mt-3 text-secondary-500">
          Samurai sign supports multiple chains from L1 such as Ethereum to EVM
          compatible L2 chains such as arbitrum and scroll.
        </p>
        <div className="mt-4 grid grid-cols-4 items-center gap-2 px-10">
          <Image
            height={160}
            width={32}
            src={"/images/eth-logo.svg"}
            alt="Chain Logo"
            className="w-full"
          />
          <Image
            height={160}
            width={32}
            src={"/images/polygon-logo.svg"}
            alt="Chain Logo"
            className="w-full"
          />
          <Image
            height={160}
            width={32}
            src={"/images/scroll-logo.svg"}
            alt="Chain Logo"
            className="w-full"
          />
          <Image
            height={160}
            width={32}
            src={"/images/arbitrum-logo.svg"}
            alt="Chain Logo"
            className="w-full"
          />
        </div>
      </section>
      <section className="mx-auto border-b border-secondary-500 bg-primary-400 px-20 py-10">
        <h3 className="text-4xl font-bold text-secondary-500">
          True P2P Contract Signing
        </h3>
      </section>
      <section className="mx-auto border-b border-secondary-500 bg-primary-400 px-20 py-10">
        <h3 className="text-4xl font-bold text-secondary-500">
          Signer doesn&apos;t need wallet & gas fee
        </h3>
      </section>
      <section className="mx-auto border-b border-secondary-500 bg-primary-400 px-20 py-10">
        <h3 className="text-4xl font-bold text-secondary-500">
          Sybil Resistant by WorldID
        </h3>
      </section>
    </main>
  );
};

export default LandingPage;
