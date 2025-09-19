export default function Header() {
  return (
    <header className="w-full border-b border-gray-300 shadow-md bg-white">
      <div className="flex justify-center items-center py-4">
        <a href="/" aria-label="Página principal Sanitas">
          <img
            src="/src/assets/Images/sanitas-logo.png"
            alt="Sanitas"
            className="h-12 w-auto"
          />
        </a>
      </div>
    </header>
  );
}
