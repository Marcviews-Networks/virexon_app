import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetMeQuery, useLogoutMutation } from "@/store/api/authApi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data } = useGetMeQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const user = data?.data;

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 hover:opacity-90 transition-opacity"
          onClick={() => setMenuOpen(false)}
        >
          VIREXON<span className="text-indigo-600">.</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 font-medium text-sm text-slate-600">
          <Link
            to="/"
            className="hover:text-indigo-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-indigo-600 transition-colors"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="hover:text-indigo-600 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-indigo-600 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Auth Action Area */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                {user.role === "admin" ? "Admin Panel" : "My Dashboard"}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg shadow-xs hover:bg-indigo-500 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col gap-2 font-medium text-sm text-slate-700">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm"
                >
                  {user.role === "admin" ? "Admin Panel" : "My Dashboard"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-2 text-red-600 font-medium text-sm hover:bg-red-50 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-2 text-slate-700 font-semibold text-sm hover:bg-slate-100 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm shadow-xs"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}