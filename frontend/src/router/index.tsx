import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";
import HomePage from "@/pages/HomePage";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Admin Imports
import { AdminLayout } from "@/pages/admin/AdminLayout";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { AdminProductsPage } from "@/pages/admin/AdminProductsPage";

// Client Dashboard Imports
import { ClientLayout } from "@/pages/client/ClientLayout";
import { ClientDashboardPage } from "@/pages/client/ClientDashboardPage";

import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ProductsCatalogPage } from "@/pages/products/ProductsCatalogPage";
import { ProductDetailsPage } from "@/pages/products/ProductDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      
      // PUBLIC PRODUCT CATALOG (Visible to Everyone)
      { path: "products", element: <ProductsCatalogPage /> },
      { path: "products/:id", element: <ProductDetailsPage /> },
    ],
  },
  
  // CLIENT PROTECTED ROUTES
  {
    element: <ProtectedRoute allowedRoles={["client", "admin"]} />,
    children: [
      {
        path: "dashboard",
        element: <ClientLayout />,
        children: [{ index: true, element: <ClientDashboardPage /> }],
      },
    ],
  },
  
  // ADMIN ONLY PROTECTED ROUTES
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          // CRUD Management Table (Admin Only)
          { path: "products", element: <AdminProductsPage /> },
        ],
      },
    ],
  },
]);