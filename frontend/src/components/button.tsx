"use client";

import Spinner from "./spinner";

type ButtonProps = {
  text: string;
  className?: string;
  onClick?: () => void | Promise<void>;
  isLoading?: boolean;
  loadingText?: string;
};

const Button = ({
  text,
  className,
  onClick,
  isLoading,
  loadingText,
}: ButtonProps) => {
  return isLoading ? (
    <button
      className={`rounded-3xl border border-gray-400 bg-secondary-500 px-6 py-2 font-semibold text-white shadow hover:opacity-80 ${
        className || ""
      }`}
      onClick={onClick}
    >
      <div className="flex justify-center gap-3">
        <Spinner className="h-6 w-6" />
        {loadingText}
      </div>
    </button>
  ) : (
    <button
      className={`rounded-3xl border border-gray-400 bg-secondary-500 px-6 py-2 font-semibold text-white shadow hover:opacity-80 ${
        className || ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
