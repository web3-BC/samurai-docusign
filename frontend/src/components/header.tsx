"use client";

import { Web3Button } from "@web3modal/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  if (!pathname) return;

  // Sorry for little messing due to the top design issue
  if (pathname === "/") return <></>;

  return (
    <header className="shadow-b-lg z-10 h-[70px] w-full bg-secondary-500 py-3">
      <div className="flex h-full w-full items-center justify-start pl-10">
        <Link href={"/"}>
          <Image
            height={28}
            width={250}
            src={"/images/samurai.svg"}
            alt="Lit Logo"
          />
        </Link>
        {pathname.startsWith("/issuers") ? (
          <div className="ml-auto pr-14">
            <Web3Button />
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};

export default Header;
