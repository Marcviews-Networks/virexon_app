import { useGetAnalyticsQuery } from "@/store/api/adminApi";

export const AdminDashboardPage = () => {
  const { data, isLoading, isError } = useGetAnalyticsQuery();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="animate-pulse text-gray-500 font-medium">Loading metrics...</p>
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 text-sm">
        Failed to load dashboard metrics.
      </div>
    );
  }

  const { totalUsers, totalProducts, lowStockAlerts, totalRevenue } = data.data;

  const stats = [
    { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, color: "border-emerald-500" },
    { label: "Total Products", value: totalProducts, color: "border-indigo-500" },
    { label: "Registered Users", value: totalUsers, color: "border-blue-500" },
    { label: "Low Stock Alerts", value: lowStockAlerts, color: "border-amber-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      <p className="mt-1 text-sm text-gray-500">
        Key metrics and stock status for Virexon operations.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl bg-white p-6 shadow-sm border-l-4 ${stat.color} border-t border-r border-b border-gray-200`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};