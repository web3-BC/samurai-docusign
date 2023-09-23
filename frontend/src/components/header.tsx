"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="shadow-b-lg z-10 h-[70px] w-full bg-white py-3">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between text-gray-950">
        <div className="text-xl font-medium">
          <Link href={"/"}>Samurai Sign</Link>
        </div>
        <nav className="flex gap-6">{/* Web3Modal */}</nav>
      </div>
    </header>
  );
};

export default Header;
