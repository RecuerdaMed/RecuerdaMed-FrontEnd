export default function Button({ onClick,children }) {
  return (
    <button
      onClick={onClick}
      className="
        bg-[#285DDF] hover:bg-blue-700 text-white font-semibold 
        py-2 px-4 rounded-lg shadow-md transition duration-300
        w-full sm:w-auto
        text-sm sm:text-base md:text-lg
      "
    >
      {children}
    </button>
  );
}

//he agregado children para que nuestro button sea reutilizable y renderize el texto que necesitemos 