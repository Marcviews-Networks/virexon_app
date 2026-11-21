import { apiSlice } from "./apiSlice";

export interface AnalyticsData {
  totalUsers: number;
  totalProducts: number;
  lowStockAlerts: number;
  totalRevenue: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface AdminOrder {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  items: {
    product: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod: "cod" | "online";
  cashfreeOrderId?: string;
  cashfreePaymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query<
      { success: boolean; data: AnalyticsData },
      void
    >({
      query: () => "/admin/analytics",
    }),

    getAdminProducts: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) =>
        `/admin/products?page=${page}&limit=${limit}&search=${search}`,
      providesTags: ["Product"],
    }),

    createProduct: builder.mutation({
      query: (body) => ({
        url: "/admin/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // Get all customer orders
    getAdminOrders: builder.query<
      {
        success: boolean;
        orders: AdminOrder[];
        pagination: {
          total: number;
          page: number;
          pages: number;
        };
      },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) =>
        `/admin/orders?page=${page}&limit=${limit}`,
    }),

    // Update order status
    updateAdminOrderStatus: builder.mutation<
      { success: boolean; message: string; order: AdminOrder },
      { id: string; status: OrderStatus }
    >({
      query: ({ id, status }) => ({
        url: `/admin/orders/${id}/status`,
        method: "PUT",
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetAnalyticsQuery,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAdminOrdersQuery,
  useUpdateAdminOrderStatusMutation,
} = adminApi;