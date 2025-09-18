export default function Button({ 
  onClick, 
  children, 
  type = "button",
  variant = "primary",
  size = "medium", 
  disabled = false,
  className = "" 
}) {
  const variants = {
    primary: "bg-[#285DDF] hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800"
  };

  const sizes = {
    small: "py-1 px-3 text-sm",
    medium: "py-1 px-4 text-sm sm:text-base md:text-lg"
  };

  const baseClasses = `
    font-semibold rounded-full shadow-md transition duration-300
    transform hover:scale-110 w-auto flex justify-center mx-auto sm:mx-0 cursor-pointer
  `;

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}