import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderByIdQuery } from "@/store/api/orderApi";

export const OrderConfirmationPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isError,
    } = useGetOrderByIdQuery(orderId!, {
        skip: !orderId,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-slate-600">
                    Loading order details...
                </p>
            </div>
        );
    }

    if (isError || !data?.order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <h1 className="text-2xl font-bold text-slate-900">
                    Order Not Found
                </h1>

                <p className="mt-2 text-slate-500">
                    We couldn't find the order details.
                </p>

                <button
                    onClick={() => navigate("/products")}
                    className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-500"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    const order = data.order;

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center">
                <div className="text-5xl mb-4">✓</div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                    Thank You For Your Order!
                </h1>

                <p className="mt-3 text-slate-500">
                    Your order has been placed successfully.
                </p>

                <p className="mt-2 font-semibold text-slate-700">
                    Order ID: {order._id}
                </p>
            </div>

            {/* Shipping Details */}
            <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-900">
                    Shipping Details
                </h2>

                <div className="mt-4 text-slate-600 leading-7">
                    <p>{order.shippingAddress.street}</p>
                    <p>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                    </p>
                    <p>
                        {order.shippingAddress.zipCode},{" "}
                        {order.shippingAddress.country}
                    </p>
                </div>
            </div>

            {/* Order Items */}
            <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-900">
                    Order Items
                </h2>

                <div className="mt-5 space-y-5">
                    {order.items.map((item) => (
                        <div
                            key={item.product}
                            className="flex items-center justify-between border-b border-slate-100 pb-5"
                        >
                            <div className="flex items-center gap-4">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                )}

                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        {item.name}
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        Quantity: {item.quantity}
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        Price: ${item.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <p className="font-bold text-slate-900">
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Summary */}
            <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-900">
                    Order Summary
                </h2>

                <div className="mt-5 space-y-3">
                    <div className="flex justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span>
                            ${order.totalAmount.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                        <span>Shipping</span>
                        <span>FREE</span>
                    </div>

                    <div className="border-t border-slate-200 pt-4 flex justify-between text-lg font-bold text-slate-900">
                        <span>Total</span>
                        <span>
                            ${order.totalAmount.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Order Status */}
            <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-bold text-slate-900">
                            Order Status
                        </h2>

                        <p className="mt-1 text-slate-500 capitalize">
                            {order.status}
                        </p>
                    </div>

                    <div>
                        <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold capitalize">
                            {order.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Continue Shopping */}
            <div className="text-center mt-8">
                <button
                    onClick={() => navigate("/products")}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};