import { useState } from "react";
import {
  useGetAdminOrdersQuery,
  useUpdateAdminOrderStatusMutation,
  type OrderStatus,
} from "@/store/api/adminApi";

const statusOptions: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export const AdminOrdersPage = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useGetAdminOrdersQuery({
    page,
    limit: 10,
  });

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateAdminOrderStatusMutation();

  const handleStatusChange = async (
    orderId: string,
    status: OrderStatus
  ) => {
    try {
      await updateStatus({ id: orderId, status }).unwrap();
      alert("Order status updated successfully!");
      refetch();
    } catch (error) {
      console.error("Order update error:", error);
      alert("Unable to update order status. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading customer orders...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Failed to load orders. Please refresh the page.
      </div>
    );
  }

  const orders = data?.orders ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manage Orders
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View customer orders and manage their delivery status.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Refresh Orders
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-500">Total Orders</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">
          {pagination?.total ?? orders.length}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-slate-800">
            No orders yet
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Customer orders will appear here when they are placed.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 p-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    Order #{order._id}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">
                    ₹{order.totalAmount.toFixed(2)}
                  </p>
                  <p className="text-xs capitalize text-slate-500">
                    Payment: {order.paymentStatus} ({order.paymentMethod})
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold text-slate-800">
                    Customer Details
                  </h3>
                  <p className="text-sm text-slate-700">
                    {order.user?.name ?? "Customer"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {order.user?.email ?? "Email unavailable"}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-slate-800">
                    Shipping Address
                  </h3>
                  <p className="text-sm text-slate-600">
                    {order.shippingAddress.street},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state},{" "}
                    {order.shippingAddress.zipCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 p-4">
                <h3 className="mb-3 font-semibold text-slate-800">
                  Ordered Products
                </h3>

                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.product}-${index}`}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <div>
                        <p className="font-medium text-slate-800">
                          {item.name}
                        </p>
                        <p className="text-slate-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-slate-800">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 p-4">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Order Status
                  </p>
                  <p className="text-xs capitalize text-slate-500">
                    Current: {order.status}
                  </p>
                </div>

                <select
                  value={order.status}
                  disabled={isUpdating}
                  onChange={(e) =>
                    handleStatusChange(
                      order._id,
                      e.target.value as OrderStatus
                    )
                  }
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm capitalize outline-none focus:border-indigo-500"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((previous) => previous - 1)}
            className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-slate-600">
            Page {pagination.page} of {pagination.pages}
          </span>

          <button
            disabled={page >= pagination.pages}
            onClick={() => setPage((previous) => previous + 1)}
            className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};