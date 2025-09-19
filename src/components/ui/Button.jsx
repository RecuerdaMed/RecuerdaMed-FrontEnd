export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  className = '',
  type = 'button',
  ...props 
}) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border-transparent',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
    success: 'bg-emerald-700 hover:bg-green-600 text-white border-transparent',
    danger: 'bg-red-500 hover:bg-red-600 text-white border-transparent',
    dangerOutline: 'bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400',
    neutral: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    large: 'px-6 py-3 text-base' // Alias para compatibilidad
  };

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg 
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}