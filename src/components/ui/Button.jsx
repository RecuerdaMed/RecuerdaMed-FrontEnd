import React from "react";

export default function Button({ onClick, children, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        bg-[#285DDF] hover:bg-blue-700 text-white font-semibold 
        py-1 px-4 rounded-full shadow-md transition duration-300
        transform hover:scale-110
        text-sm sm:text-base md:text-lg
        w-auto
        flex justify-center mx-auto sm:mx-0 cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
}
