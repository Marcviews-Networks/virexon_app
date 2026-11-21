import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import HomePage from "@/pages/HomePage";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Admin Imports
import { AdminLayout } from "@/pages/admin/AdminLayout";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { AdminProductsPage } from "@/pages/admin/AdminProductsPage";
import { AdminReviewsPage } from "@/pages/admin/AdminReviewsPage";
import { AdminOrdersPage } from "@/pages/admin/AdminOrdersPage";

// Client Dashboard Imports
import { ClientLayout } from "@/pages/client/ClientLayout";
import { ClientDashboardPage } from "@/pages/client/ClientDashboardPage";

import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ProductsCatalogPage } from "@/pages/products/ProductsCatalogPage";
import { ProductDetailsPage } from "@/pages/products/ProductDetailsPage";
import { AddressesPage } from "@/pages/client/AddressesPage";
import { CartPage } from "@/pages/cart/CartPage";
import { CheckoutPage } from "@/pages/checkout/CheckoutPage";
import PaymentReturnPage from "@/pages/checkout/PaymentReturnPage";
import { OrderConfirmationPage } from "@/pages/orderConfirmation/orderConfirmationPage";
import AboutPage from "@/pages/about/AboutPage";
import ContactPage from "@/pages/contact/ContactPage";

import { MyOrdersPage } from "@/pages/client/MyOrdersPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },

      { path: "products", element: <ProductsCatalogPage /> },
      { path: "products/:id", element: <ProductDetailsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "payment/return", element: <PaymentReturnPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },

  // CLIENT PROTECTED ROUTES
  {
    element: <ProtectedRoute allowedRoles={["client", "admin"]} />,
    children: [
      {
        path: "dashboard",
        element: <ClientLayout />,
        children: [
          { index: true, element: <ClientDashboardPage /> },
          { path: "orders", element: <MyOrdersPage /> },
          { path: "addresses", element: <AddressesPage /> },
          {
            path: "order-confirmation/:orderId",
            element: <OrderConfirmationPage />,
          },
        ],
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
          { path: "products", element: <AdminProductsPage /> },
          { path: "orders", element: <AdminOrdersPage /> },
          { path: "reviews", element: <AdminReviewsPage /> },
        ],
      },
    ],
  },
]);