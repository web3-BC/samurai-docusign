"use client";

type ButtonProps = {
  text: string;
  className?: string;
  onClick?: () => void | Promise<void>;
};

const Button = ({ text, className, onClick }: ButtonProps) => {
  return (
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
