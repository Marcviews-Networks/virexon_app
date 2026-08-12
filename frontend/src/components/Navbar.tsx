import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-gray-900"
          onClick={() => setMenuOpen(false)}
        >
          Virexon
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            About
          </Link>

          <Link
            to="/services"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Services
          </Link>

          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Contact
          </Link>

          <Link
            to="/contact"
            className="px-4 lg:px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-700"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            // X icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4">
          <div className="flex flex-col gap-3">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              About
            </Link>

            <Link
              to="/services"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Services
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Contact
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-4 py-2.5 text-center bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Get Started
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;