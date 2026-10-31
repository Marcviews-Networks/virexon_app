import { apiSlice } from "./apiSlice";

export interface ProductReview {
    _id: string;
    product: {
        _id: string;
        name: string;
    };
    name: string;
    rating: number;
    comment: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
}

interface ReviewsResponse {
    success: boolean;
    data: ProductReview[];
    averageRating: number;
    totalReviews: number;
}

interface ReviewResponse {
    success: boolean;
    message: string;
    data: ProductReview;
}

interface CreateReviewRequest {
    productId: string;
    name: string;
    rating: number;
    comment: string;
}

export const reviewApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProductReviews: builder.query<ReviewsResponse, string>({
            query: (productId) => `/reviews/product/${productId}`,
        }),

        createReview: builder.mutation<ReviewResponse, CreateReviewRequest>({
            query: ({ productId, ...body }) => ({
                url: "/reviews",
                method: "POST",
                body: {
                    productId,
                    ...body,
                },
            }),
        }),

        getPendingReviews: builder.query<
            { success: boolean; data: ProductReview[] },
            void
        >({
            query: () => "/reviews/admin/pending",
        }),

        moderateReview: builder.mutation<
            ReviewResponse,
            { id: string; status: "approved" | "rejected" }
        >({
            query: ({ id, status }) => ({
                url: `/reviews/admin/${id}`,
                method: "PATCH",
                body: { status },
            }),
        }),
    }),
});

export const {
  useGetProductReviewsQuery,
  useCreateReviewMutation,
  useGetPendingReviewsQuery,
  useModerateReviewMutation,
} = reviewApi;