import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "@/store/api/orderApi";

export const MyOrdersPage = () => {
  const { data, isLoading, isError } = useGetMyOrdersQuery();

  if (isLoading) {
    return <p className="p-6 text-slate-600">Loading your orders...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-600">Unable to load your orders. Please try again.</p>;
  }

  const orders = data?.orders ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
        <p className="mt-1 text-sm text-slate-500">
          View your orders and payment details.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center">
          <h2 className="font-semibold text-slate-800">No orders yet</h2>
          <p className="mt-2 text-sm text-slate-500">
            Your orders will appear here after checkout.
          </p>
          <Link
            to="/products"
            className="mt-5 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-white"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-500">Order ID</p>
                  <p className="font-semibold text-slate-800">
                    {order._id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Total Amount</p>
                  <p className="font-bold text-slate-900">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <p>
                  <span className="text-slate-500">Payment:</span>{" "}
                  <span className="font-medium capitalize">
                    {order.paymentMethod}
                  </span>
                </p>
                <p>
                  <span className="text-slate-500">Payment Status:</span>{" "}
                  <span className="font-medium capitalize">
                    {order.paymentStatus}
                  </span>
                </p>
                <p>
                  <span className="text-slate-500">Order Status:</span>{" "}
                  <span className="font-medium capitalize">
                    {order.status}
                  </span>
                </p>
                <p>
                  <span className="text-slate-500">Items:</span>{" "}
                  <span className="font-medium">
                    {order.items.length}
                  </span>
                </p>
              </div>

              <div className="mt-5 border-t pt-4">
                <Link
                  to={`/dashboard/order-confirmation/${order._id}`}
                  className="inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  View Order Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};