import { apiSlice } from "./apiSlice";

export interface Address {
  _id?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  role: "client" | "admin";
  addresses?: Address[];
}

export interface AuthResponse {
  success: boolean;
  user: User;
  message?: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, { name: string; email: string; password: string }>({
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

    // --- Address Mutations ---
    addAddress: builder.mutation<{ success: boolean; data: Address[] }, Omit<Address, "_id">>({
      query: (addressData) => ({
        url: "/auth/addresses",
        method: "POST",
        body: addressData,
      }),
      invalidatesTags: ["User"], // Automatically triggers getMe to update user state
    }),

    updateAddress: builder.mutation<{ success: boolean; data: Address[] }, Address>({
      query: ({ _id, ...addressData }) => ({
        url: `/auth/addresses/${_id}`,
        method: "PUT",
        body: addressData,
      }),
      invalidatesTags: ["User"],
    }),

    deleteAddress: builder.mutation<{ success: boolean; data: Address[] }, string>({
      query: (addressId) => ({
        url: `/auth/addresses/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = authApi;