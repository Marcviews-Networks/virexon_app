import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "@/store/api/authApi";

export const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { data, isLoading, isError } = useGetMeQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <p className="animate-pulse text-lg font-medium">Authenticating...</p>
      </div>
    );
  }

  if (isError || !data?.data || !allowedRoles.includes(data.data.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};