"use client";

type ButtonProps = {
  text: string;
  className?: string;
  onClick?: () => void | Promise<void>;
};

const Button = ({ text, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100 ${
        className || ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
