import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation, useGetMeQuery } from "@/store/api/authApi";

export const AdminLayout = () => {
  const { data } = useGetMeQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 text-xl font-bold border-b border-slate-800 tracking-wide text-indigo-400">
            VIREXON ADMIN
          </div>
          <nav className="mt-6 flex flex-col gap-1 px-4">
            <Link
              to="/admin"
              className="px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm text-gray-300 hover:text-white"
            >
              Dashboard Overview
            </Link>
            <Link
              to="/admin/products"
              className="px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm text-gray-300 hover:text-white"
            >
              Manage Products
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="mb-3 px-2 text-xs text-gray-400">
            Logged in as: <span className="font-semibold text-white">{data?.data?.name ?? "Admin"}</span>
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
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};