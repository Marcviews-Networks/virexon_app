import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // matches your Vite proxy or backend endpoint
    credentials: "include", // required for sending/receiving HTTP-only cookies
  }),
  tagTypes: ["User", "Product", "Order"], // <-- ADD YOUR TAG TYPES HERE
  endpoints: () => ({}),
});
