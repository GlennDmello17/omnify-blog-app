import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ navItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (item) => {
    if (item.name === "Logout") {
      localStorage.removeItem("token");
      navigate("/signin");
    } else {
      navigate(item.path);
    }
    setIsOpen(false); // Close menu on any click
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          MyBlogApp
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <button onClick={toggleMenu} className="md:hidden text-xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleNavClick(item)}
                className="hover:text-yellow-400 transition-colors"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-3 flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleNavClick(item)}
                className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
