import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Product", "Order", "Address"],
  endpoints: (builder) => ({
    // Added back the endpoint so the exported hook works!
    getAddresses: builder.query<Address[], void>({
      query: () => "/auth/addresses",
      providesTags: ["Address"],
    }),
  }),
});

export const { useGetAddressesQuery } = apiSlice;
