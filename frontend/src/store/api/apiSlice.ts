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
    baseUrl: "http://localhost:5000/api", // matches your Vite proxy or backend endpoint
    credentials: "include", // required for sending/receiving HTTP-only cookies
  }),
  tagTypes: ["User", "Product", "Order", "Address"], // <-- ADD YOUR TAG TYPES HERE
  endpoints: (builder) => ({
    getAddresses: builder.query<Address[], void>({
      query: () => "/auth/addresses",
      providesTags: ["Address"],
    }),
  }),
});

export const {
  useGetAddressesQuery,
} = apiSlice;
