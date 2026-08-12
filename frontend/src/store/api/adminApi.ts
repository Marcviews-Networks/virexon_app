import { apiSlice } from "./apiSlice";

export interface AnalyticsData {
  totalUsers: number;
  totalProducts: number;
  lowStockAlerts: number;
  totalRevenue: number;
}

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query<{ success: boolean; data: AnalyticsData }, void>({
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
  }),
});

export const {
  useGetAnalyticsQuery,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = adminApi;