import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearCart } from "@/store/cartSlice";
import { useCreateOrderMutation } from "@/store/api/orderApi";
import { useGetAddressesQuery } from "../../store/api/apiSlice";

export const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { data: addresses = [] } =
        useGetAddressesQuery();

    console.log("Address recieved:", addresses);

    const cartItems = useAppSelector((state) => state.cart.items);

    const [couponCode, setCouponCode] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);

    const [createOrder, { isLoading }] = useCreateOrderMutation();

    const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");

    const [shippingAddress, setShippingAddress] = useState({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",

    });

    useEffect(() => {
        if (addresses.length > 0) {
            const defaultAddress =
                addresses.find((address) => address.isDefault) || addresses[0];

            setShippingAddress({
                street: defaultAddress.street,
                city: defaultAddress.city,
                state: defaultAddress.state,
                zipCode: defaultAddress.zipCode,
                country: defaultAddress.country,
            });
        }
    }, [addresses]);

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const subtotal = cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );
    const discount =
        couponApplied && couponCode.trim().toUpperCase() === "GADGET5"
            ? subtotal * 0.05
            : 0;

    const finalTotal = subtotal - discount;

    const handlePlaceOrder = async () => {

        if (
            !shippingAddress.street ||
            !shippingAddress.city ||
            !shippingAddress.state ||
            !shippingAddress.zipCode ||
            !shippingAddress.country
        ) {
            alert("Please fill in all shipping address fields.");
            return;
        }

        try {
            const orderData = {
                items: cartItems.map((item) => ({
                    product: item.product._id,
                    name: item.product.name,
                    image: item.product.images?.[0] || "",
                    price: item.product.price,
                    quantity: item.quantity,
                })),

                shippingAddress,

                totalAmount: cartItems.reduce(
                    (total, item) =>
                        total + item.product.price * item.quantity,
                    0
                ),

                paymentMethod,
            };

            const response = await createOrder(orderData).unwrap();

            console.log("Order created:", response);

            dispatch(clearCart());



            navigate(`/dashboard/order-confirmation/${response.order._id}`);
        } catch (error) {
            console.error("Failed to place order:", error);
            alert("Failed to place order. Please try again.");
        }
    };

    // Prevent checkout with an empty cart
    if (cartItems.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold text-slate-900">
                    Your Cart is Empty
                </h1>

                <p className="mt-3 text-slate-500">
                    Add products before proceeding to checkout.
                </p>

                <button
                    onClick={() => navigate("/products")}
                    className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-extrabold text-slate-900">
                Checkout
            </h1>

            <p className="mt-2 text-sm text-slate-500">
                Complete your shipping and payment details.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Shipping Address */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-slate-900">
                            Shipping Address
                        </h2>

                        {addresses.length > 0 && (
                            <div className="mb-6">
                                <label className="block font-semibold mb-2">
                                    Choose Saved Address
                                </label>

                                <select
                                    className="w-full border rounded-lg p-3"
                                    onChange={(e) => {
                                        const selectedAddress = addresses.find(
                                            (address) => address._id === e.target.value
                                        );

                                        if (selectedAddress) {
                                            setShippingAddress({
                                                street: selectedAddress.street,
                                                city: selectedAddress.city,
                                                state: selectedAddress.state,
                                                zipCode: selectedAddress.zipCode,
                                                country: selectedAddress.country,
                                            });
                                        }
                                    }}
                                >
                                    <option value="">Select an address</option>

                                    {addresses.map((address) => (
                                        <option key={address._id} value={address._id}>
                                            {address.street}, {address.city}, {address.state}
                                            {address.isDefault ? " (Default)" : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="px-4 py-3 border border-slate-300 rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="px-4 py-3 border border-slate-300 rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="Street Address"
                                value={shippingAddress.street}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        street: e.target.value,
                                    })
                                }
                                className="sm:col-span-2 px-4 py-3 border border-slate-300 rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="City"
                                value={shippingAddress.city}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        city: e.target.value,
                                    })
                                }
                                className="px-4 py-3 border border-slate-300 rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="State"
                                value={shippingAddress.state}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        state: e.target.value,
                                    })
                                }
                                className="px-4 py-3 border border-slate-300 rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="ZIP / Postal Code"
                                value={shippingAddress.zipCode}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        zipCode: e.target.value,
                                    })
                                }
                                className="px-4 py-3 border border-slate-300 rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="Country"
                                value={shippingAddress.country}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        country: e.target.value,
                                    })
                                }
                                className="px-4 py-3 border border-slate-300 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
                        <h2 className="text-xl font-bold text-slate-900">
                            Payment Method
                        </h2>

                        <div className="mt-5 space-y-3">
                            <label className="flex items-center gap-3 border border-slate-200 rounded-xl p-4 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={() => setPaymentMethod("cod")}
                                />
                                <span className="font-semibold text-slate-700">
                                    Cash on Delivery
                                </span>
                            </label>

                            <label className="flex items-center gap-3 border border-slate-200 rounded-xl p-4 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="online"
                                    checked={paymentMethod === "online"}
                                    onChange={() => setPaymentMethod("online")}
                                />
                                <span className="font-semibold text-slate-700">
                                    Credit / Debit Card
                                </span>
                            </label>

                            <label className="flex items-center gap-3 border border-slate-200 rounded-xl p-4 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="online"
                                    checked={paymentMethod === "online"}
                                    onChange={() => setPaymentMethod("online")}
                                />
                                <span className="font-semibold text-slate-700">
                                    UPI
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
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
                        <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex justify-between mt-3 text-sm text-slate-600">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <div className="border-t border-slate-200 my-5" />

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Coupon Code
                        </label>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => {
                                    setCouponCode(e.target.value);
                                    setCouponApplied(false);
                                }}
                                placeholder="Enter Gadget5"
                                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    if (couponCode.trim().toUpperCase() === "GADGET5") {
                                        setCouponCode("Gadget5");
                                        setCouponApplied(true);
                                    } else {
                                        setCouponApplied(false);
                                        alert("Invalid coupon code. Please enter Gadget5.");
                                    }
                                }}
                                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                            >
                                Apply
                            </button>
                        </div>

                        {couponApplied && (
                            <p className="mt-2 text-sm text-green-600">
                                Gadget5 applied successfully! You saved 5%.
                            </p>
                        )}

                        {couponApplied && (
                            <div className="mt-3 flex justify-between text-sm text-green-700">
                                <span>Discount (5%)</span>
                                <span>-₹{discount.toLocaleString("en-IN")}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between font-bold text-lg text-slate-900">
                        <span>Total</span>
                        <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        disabled={isLoading}
                        className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl disabled:opacity-50"
                    >
                        {isLoading ? "Placing Order..." : "Place Order"}
                    </button>

                    <button
                        onClick={() => navigate("/cart")}
                        className="w-full mt-3 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl"
                    >
                        Back to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};