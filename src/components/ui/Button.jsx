import React from "react";

export default function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="
        bg-[#285DDF] hover:bg-blue-700 text-white font-semibold 
        py-1 px-4 rounded-full shadow-md transition duration-300
        text-sm sm:text-base md:text-lg
        w-auto
        flex justify-center mx-auto sm:mx-0
      "
    >
      {children}
    </button>
  );
}



//he agregado children para que nuestro button sea reutilizable y renderize el texto que necesitemos 