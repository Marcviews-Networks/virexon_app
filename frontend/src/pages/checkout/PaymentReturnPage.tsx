import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { clearCart } from "@/store/cartSlice";
import { useVerifyCashfreePaymentMutation } from "@/store/api/orderApi";

type PaymentStatus = "checking" | "paid" | "pending" | "failed" | "error";

export default function PaymentReturnPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [verifyCashfreePayment] = useVerifyCashfreePaymentMutation();
    const [status, setStatus] = useState<PaymentStatus>("checking");
    const [message, setMessage] = useState("Verifying your payment...");

    const cashfreeOrderId = searchParams.get("order_id");
    const orderId = cashfreeOrderId?.startsWith("GG-")
        ? cashfreeOrderId.slice(3)
        : "";

    const verifyPayment = async () => {
        if (!orderId) {
            setStatus("error");
            setMessage("Invalid payment order. Please contact support.");
            return;
        }

        setStatus("checking");
        setMessage("Verifying your payment...");

        try {
            const result = await verifyCashfreePayment({ orderId }).unwrap();

            if (result.paymentStatus === "paid") {
                dispatch(clearCart());
                setStatus("paid");
                setMessage("Your payment was successful. Your order is confirmed!");
            } else if (result.paymentStatus === "pending") {
                setStatus("pending");
                setMessage("Your payment is still processing. Please check again shortly.");
            } else {
                setStatus("failed");
                setMessage("Your payment was not completed. You can try again.");
            }
        } catch {
            setStatus("error");
            setMessage("We couldn't verify your payment. Please try again.");
        }
    };

    useEffect(() => {
        void verifyPayment();
    }, [orderId]);

    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl border p-8 text-center shadow-sm">
                <h1 className="mb-4 text-2xl font-bold">
                    {status === "paid"
                        ? "Payment Successful"
                        : status === "checking"
                            ? "Checking Payment"
                            : status === "pending"
                                ? "Payment Pending"
                                : "Payment Update"}
                </h1>

                <p className="mb-6 text-gray-600">{message}</p>

                {status === "checking" && (
                    <p className="text-sm text-gray-500">Please wait...</p>
                )}

                {(status === "pending" || status === "error") && (
                    <button
                        onClick={verifyPayment}
                        className="rounded-lg bg-black px-6 py-3 text-white"
                    >
                        Check Payment Again
                    </button>
                )}

                {status === "paid" && (
                    <button
                        onClick={() => navigate(`/dashboard/order-confirmation/${orderId}`)}
                        className="rounded-lg bg-black px-6 py-3 text-white"
                    >
                        View Order Details
                    </button>
                )}

                {status === "failed" && (
                    <button
                        onClick={() => navigate("/checkout")}
                        className="rounded-lg bg-black px-6 py-3 text-white"
                    >
                        Return to Checkout
                    </button>
                )}
            </div>
        </div>
    );
}