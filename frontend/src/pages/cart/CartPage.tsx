import { Link, useNavigate } from "react-router-dom";
import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const CartPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const cartItems = useAppSelector((state) => state.cart.items);

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const subtotal = cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h1 className="text-3xl font-bold text-slate-900">
                    Your Cart is Empty
                </h1>

                <p className="mt-3 text-slate-500">
                    Add some products to your cart to see them here.
                </p>

                <Link
                    to="/"
                    className="inline-block mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">
                        Shopping Cart
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                        {totalItems} {totalItems === 1 ? "item" : "items"}
                    </p>
                </div>

                <button
                    onClick={() => dispatch(clearCart())}
                    className="text-sm font-semibold text-red-600 hover:text-red-700"
                >
                    Clear Cart
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => {
                        const image =
                            item.product.images?.[0] ||
                            item.product.variants?.[0]?.images?.[0];

                        return (
                            <div
                                key={item.product._id}
                                className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-5"
                            >
                                {/* Product Image */}
                                <div className="w-28 h-28 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden">
                                    {image ? (
                                        <img
                                            src={image}
                                            alt={item.product.name}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="flex-1">
                                    <h2 className="font-bold text-slate-900">
                                        {item.product.name}
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        ${item.product.price.toFixed(2)}
                                    </p>

                                    {/* Quantity */}
                                    <div className="flex items-center gap-3 mt-4">
                                        <button
                                            onClick={() =>
                                                dispatch(decreaseQuantity(item.product._id))
                                            }
                                            className="w-8 h-8 rounded-lg border border-slate-300 hover:bg-slate-100"
                                        >
                                            −
                                        </button>

                                        <span className="font-semibold w-6 text-center">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                dispatch(increaseQuantity(item.product._id))
                                            }
                                            className="w-8 h-8 rounded-lg border border-slate-300 hover:bg-slate-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Item Total + Remove */}
                                <div className="text-right flex flex-col justify-between">
                                    <p className="font-bold text-slate-900">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </p>

                                    <button
                                        onClick={() =>
                                            dispatch(removeFromCart(item.product._id))
                                        }
                                        className="text-sm text-red-600 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Summary */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 h-fit">
                    <h2 className="text-xl font-bold text-slate-900">
                        Order Summary
                    </h2>

                    <div className="flex justify-between mt-6 text-sm text-slate-600">
                        <span>Items</span>
                        <span>{totalItems}</span>
                    </div>

                    <div className="flex justify-between mt-3 text-sm text-slate-600">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-slate-200 my-5" />

                    <div className="flex justify-between font-bold text-lg text-slate-900">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={() => navigate("/checkout")}
                        className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl"
                    >
                        Proceed to Checkout
                    </button>

                    <Link
                        to="/"
                        className="block text-center mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};