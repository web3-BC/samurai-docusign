"use client";

import { Web3Button } from "@web3modal/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  if (!pathname) return;

  // Sorry for little messing due to the top design issue
  if (pathname === "/") return <></>;

  return (
    <header className="shadow-b-lg z-10 h-[70px] w-full py-3 bg-secondary-500">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between text-gray-950">
        <div className="text-2xl font-bold text-white">
          <Link href={"/"}>Samurai Sign</Link>
        </div>
        {pathname.startsWith("/issuers") ? (
          <nav className="flex gap-6">
            <Web3Button />
          </nav>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};

export default Header;
