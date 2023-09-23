"use client";

import { Web3Button } from "@web3modal/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="shadow-b-lg z-10 h-[70px] w-full bg-white py-3">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between text-gray-950">
        <div className="text-xl font-medium">
          <Link href={"/"}>Samurai Sign</Link>
        </div>
        {pathname.startsWith("/signers") ? (
          <></>
        ) : (
          <nav className="flex gap-6">
            <Web3Button />
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
