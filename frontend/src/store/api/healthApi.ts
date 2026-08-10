import { apiSlice } from "@/store/api/apiSlice";

interface HealthResponse {
  success: boolean;
  message: string;
}

export const healthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHealth: builder.query<HealthResponse, void>({
      query: () => "/health",
    }),
  }),
});

export const { useGetHealthQuery } = healthApi;
