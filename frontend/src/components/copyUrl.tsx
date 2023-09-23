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
    <div className="relative mt-12">
      {isCopied && (
        <div className="absolute -top-10 z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm">
          Copied!
        </div>
      )}
      <span onClick={handleCopyClick} className="cursor-pointer">
        {url}
      </span>
    </div>
  );
};

export default CopyURL;
