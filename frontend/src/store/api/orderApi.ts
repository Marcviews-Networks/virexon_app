import { apiSlice } from "./apiSlice";

export interface OrderItem {
  product: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  paymentMethod: "cod" | "online";
}

export interface CreateCashfreePaymentRequest {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  phone: string;
  couponCode?: string;
}

export interface CashfreePaymentResponse {
  success: boolean;
  message?: string;
  orderId: string;
  paymentSessionId: string;
}

export interface VerifyCashfreePaymentRequest {
  orderId: string;
}

export interface VerifyCashfreePaymentResponse {
  success: boolean;
  paymentStatus: "pending" | "paid" | "failed";
  message?: string;
  order?: Order;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod: "cod" | "online";
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderResponse {
  success: boolean;
  message?: string;
  order: Order;
}

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),

    createCashfreePayment: builder.mutation<
      CashfreePaymentResponse,
      CreateCashfreePaymentRequest
    >({
      query: (paymentData) => ({
        url: "/orders/cashfree/create",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Order"],
    }),

    verifyCashfreePayment: builder.mutation<
      VerifyCashfreePaymentResponse,
      VerifyCashfreePaymentRequest
    >({
      query: (paymentData) => ({
        url: "/orders/cashfree/verify",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Order"],
    }),

    getMyOrders: builder.query<
      { success: boolean; orders: Order[] },
      void
    >({
      query: () => "/orders/my",
      providesTags: ["Order"],
    }),

    getOrderById: builder.query<
      { success: boolean; order: Order },
      string
    >({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreateCashfreePaymentMutation,
  useVerifyCashfreePaymentMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
} = orderApi;