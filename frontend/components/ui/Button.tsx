import React from "react";

interface ButtonProps {
  span: React.ReactNode;
  neon?: boolean;
  className: string;
  onclick: React.MouseEventHandler<HTMLButtonElement>;
  type: 'button' | 'submit' | 'reset';
}

const Button = ({ span, neon, className, onclick, type }: ButtonProps) => {
  return (
    <>
      {neon ? (
        <button
          className={`px-4 py-3 mx-auto bg-pink-500 border-pink-600 text-white font-semibold rounded-lg cursor-pointer flex items-center transition-all hover:text-black duration-300 ease-in-out  neon-glow-button hover:scale-105 hover:border-pink-400 focus:outline-none hover:bg-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${className}`}
          onClick={onclick}
          type={type}
        >
          {span}
        </button>
      ) : (
        <button
          className={`px-5 mx-auto py-[13px] transform  hover:scale-105 border-pink-500/60 text-white font-semibold rounded-lg bg-pink-500/50 hover:bg-pink-500/60 transition-all duration-300 flex items-center space-x-2 cursor-pointer ${className}`}
          onClick={onclick}
          type={type}
        >
          {span}
        </button>
      )}
    </>
  );
};

export default Button;
