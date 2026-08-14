import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useLogoutMutation, useGetMeQuery } from "@/store/api/authApi";

export const AdminLayout = () => {
  const { data } = useGetMeQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinks = [
    { label: "Dashboard Overview", path: "/admin" },
    { label: "Manage Products", path: "/admin/products" },
  ];

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-slate-900/60 backdrop-blur-sm md:hidden transition-opacity"
        />
      )}

      {/* Sidebar (Responsive Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <span className="text-xl font-bold tracking-wide text-indigo-400">
              VIREXON ADMIN
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-1 px-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`px-4 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="mb-3 px-2 text-xs text-slate-400">
            Logged in as:{" "}
            <span className="font-semibold text-white block truncate">
              {data?.data?.name ?? "Admin"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar for Mobile Toggle */}
        <header className="flex items-center justify-between bg-white px-4 py-3 border-b border-slate-200 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-100"
          >
            ☰
          </button>
          <span className="font-semibold text-slate-800 text-sm">Virexon Admin</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};