import Image from "next/image";
import { useState } from "react";

type CopyURLProps = {
  url: string;
};

const CopyURL = ({ url }: CopyURLProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="relative border border-gray-400 rounded-xl p-2 cursor-pointer">
      {isCopied && (
        <div className="absolute -top-12 left-0 right-0 z-10 mx-auto max-w-fit rounded-lg border border-gray-200 bg-white px-3 py-2 font-medium text-gray-900 shadow-sm">
          Copied!
        </div>
      )}
      <span onClick={handleCopyClick} className="cursor-pointer flex items-center gap-2">
        <span className="truncate text-secondary-500">{url}</span>
        <Image
          src={"/images/icon_copy.svg"}
          height={20}
          width={20}
          alt="copy icon"
        />
      </span>
    </div>
  );
};

export default CopyURL;
