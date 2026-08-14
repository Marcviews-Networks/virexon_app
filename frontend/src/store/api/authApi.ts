import { apiSlice } from "./apiSlice";

export interface User {
  id: string;
  name?: string;
  email?: string;
  role: "client" | "admin";
}

export interface AuthResponse {
  success: boolean;
  user: User;
  message?: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse,{ name: string; email: string; password: string }>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    getMe: builder.query<{ success: boolean; data: User }, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
  }),
});

export const {useRegisterMutation, useLoginMutation, useLogoutMutation, useGetMeQuery } = authApi;