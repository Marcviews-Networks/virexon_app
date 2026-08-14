import { useGetMeQuery } from "@/store/api/authApi";

export const ClientDashboardPage = () => {
  const { data } = useGetMeQuery();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-200">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Account Overview
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account profile details and preferences.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-6">
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
            <p className="text-xs font-semibold uppercase text-slate-400">Full Name</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {data?.data?.name ?? "N/A"}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
            <p className="text-xs font-semibold uppercase text-slate-400">Email Address</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {data?.data?.email ?? "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};