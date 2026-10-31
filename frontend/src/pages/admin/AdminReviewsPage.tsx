import {
  useGetPendingReviewsQuery,
  useModerateReviewMutation,
} from "@/store/api/reviewApi";

export const AdminReviewsPage = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetPendingReviewsQuery();

  const [moderateReview, { isLoading: isUpdating }] =
    useModerateReviewMutation();

  const handleModeration = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    try {
      await moderateReview({ id, status }).unwrap();
      refetch();
    } catch (error) {
      console.error("Unable to update review:", error);
      alert("Could not update the review. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading reviews...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Failed to load reviews.
        <button onClick={() => refetch()} className="ml-3 underline">
          Retry
        </button>
      </div>
    );
  }

  const reviews = data?.data || [];

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Customer Reviews
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and moderate customer reviews.
          </p>
        </div>

        <span className="rounded-lg bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
          Pending: {reviews.length}
        </span>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
          No pending reviews.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-slate-800">
                    {review.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Product: {review.product?.name || "Unknown product"}
                  </p>

                  <p className="mt-2 text-amber-500">
                    {"★".repeat(review.rating)}
                    <span className="text-slate-300">
                      {"★".repeat(5 - review.rating)}
                    </span>
                  </p>
                </div>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                  Pending
                </span>
              </div>

              <p className="my-4 text-slate-700">{review.comment}</p>

              <p className="mb-4 text-xs text-slate-400">
                Submitted: {new Date(review.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-3">
                <button
                  disabled={isUpdating}
                  onClick={() =>
                    handleModeration(review._id, "approved")
                  }
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                >
                  Approve
                </button>

                <button
                  disabled={isUpdating}
                  onClick={() =>
                    handleModeration(review._id, "rejected")
                  }
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};