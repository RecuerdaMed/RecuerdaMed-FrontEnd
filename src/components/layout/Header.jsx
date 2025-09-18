import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="w-full border-b border-gray-300 shadow-md">
      <div className="flex justify-center items-center py-4">
        <Link to="/">
        <img
          src="/src/assets/Images/sanitas-logo.png"
          alt="Sanitas Logo"
          className="h-15"
        />
        </Link>
      </div>
    </nav>
  );
}
