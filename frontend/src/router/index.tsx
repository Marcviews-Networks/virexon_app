import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";
import HomePage from "@/pages/HomePage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminLayout } from "@/pages/admin/AdminLayout";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
// import { AdminProductsPage } from "@/pages/admin/AdminProductsPage";
import { LoginPage } from "@/pages/auth/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    // Protected Admin Section
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboardPage />,
          },
          {
            path: "products",
            // element: <AdminProductsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);