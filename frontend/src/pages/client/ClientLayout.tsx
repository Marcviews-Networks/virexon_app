import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useLogoutMutation, useGetMeQuery } from "@/store/api/authApi";

export const ClientLayout = () => {
  const { data } = useGetMeQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Profile & Overview", path: "/dashboard" },
    { label: "My Orders", path: "/dashboard/orders" },
    { label: "Saved Addresses", path: "/dashboard/addresses" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Client Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
            VIREXON
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm font-medium text-slate-600">
              Welcome, {data?.data?.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer"
            >
              Sign out
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 rounded-lg hover:bg-slate-100"
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
            <div className="text-xs text-slate-500 pb-2 border-b border-slate-100">
              Logged in as <span className="font-semibold text-slate-800">{data?.data?.name}</span>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Sign out
            </button>
          </div>
        )}
      </header>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Desktop Sub-navigation Sidebar */}
          <aside className="hidden md:block col-span-1 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </aside>

          {/* Dynamic Content View */}
          <main className="col-span-1 md:col-span-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};