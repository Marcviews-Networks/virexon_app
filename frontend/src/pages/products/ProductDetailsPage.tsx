import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "@/store/api/productApi";
import { useEffect, useState } from "react";
import { addToCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import {
  useGetProductReviewsQuery,
  useCreateReviewMutation,
} from "@/store/api/reviewApi";

export const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetProductByIdQuery(id || "");

  const product = data?.data;
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
  } = useGetProductReviewsQuery(id || "");

  const [createReview, { isLoading: submittingReview }] =
    useCreateReviewMutation();
  const [showCouponPopup, setShowCouponPopup] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);

  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [checkingDelivery, setCheckingDelivery] = useState(false);

  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  useEffect(() => {
    if (!product) return;

    const timer = window.setTimeout(() => {
      setShowCouponPopup(true);
    }, 500);

    return () => window.clearTimeout(timer);
  }, [id, product]);
  const hasVariants = product?.variants && product.variants.length > 0;

  const currentImages = hasVariants
    ? product.variants?.[selectedVariant]?.images || []
    : product?.images || [];

  const checkDelivery = async () => {
    const enteredPincode = pincode.trim();

    if (!/^\d{6}$/.test(enteredPincode)) {
      setDeliveryMessage("Please enter a valid 6-digit pincode.");
      return;
    }

    setCheckingDelivery(true);
    setDeliveryMessage("");

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${enteredPincode}`
      );

      const result = await response.json();

      if (result[0]?.Status !== "Success" || !result[0]?.PostOffice?.length) {
        setDeliveryMessage("Pincode not found. Please check and try again.");
        return;
      }

      const postOffice = result[0].PostOffice[0];
      const state = postOffice.State?.toLowerCase();
      const district = postOffice.District?.toLowerCase();

      let deliveryDays = "";
      let deliveryRange = "";

      if (state === "bihar") {
        deliveryDays = "1–2 days";
        deliveryRange = "Day 2";
      } else if (
        state === "jharkhand" ||
        state === "west bengal" ||
        (state === "uttar pradesh" &&
          [
            "varanasi",
            "chandauli",
            "ghazipur",
            "ballia",
            "jaunpur",
            "azamgarh",
            "mau",
            "mirzapur",
            "sonbhadra",
            "bhadohi",
            "prayagraj",
            "kaushambi",
            "pratapgarh",
            "deoria",
            "kushinagar",
            "gorakhpur",
            "maharajganj",
            "basti",
            "sant kabir nagar",
            "siddharthnagar",
          ].some((name) => district?.includes(name))
        )
      ) {
        deliveryDays = "2–3 days";
        deliveryRange = "Day 3";
      } else if (
        [
          "odisha",
          "haryana",
          "madhya pradesh",
          "chhattisgarh",
        ].includes(state) ||
        state === "delhi" ||
        state === "nct of delhi" ||
        state === "national capital territory of delhi" ||
        (state === "uttar pradesh" &&
          [
            "western uttar pradesh",
            "meerut",
            "ghaziabad",
            "noida",
            "gautam buddha nagar",
            "agra",
            "mathura",
            "aligarh",
            "moradabad",
            "bareilly",
            "saharanpur",
            "muzaffarnagar",
            "bulandshahr",
            "hapur",
            "baghpat",
            "shamli",
            "bijnor",
            "amroha",
            "rampur",
            "sambhal",
            "firozabad",
            "etah",
            "kasganj",
          ].some((name) => district?.includes(name))
        )
      ) {
        deliveryDays = "3–4 days";
        deliveryRange = "Day 4";
      } else if (
        [
          "punjab",
          "rajasthan",
          "maharashtra",
          "gujarat",
          "telangana",
          "andhra pradesh",
        ].includes(state)
      ) {
        deliveryDays = "4–5 days";
        deliveryRange = "Day 5";
      } else if (
        [
          "karnataka",
          "tamil nadu",
          "kerala",
          "himachal pradesh",
          "uttarakhand",
          "assam",
        ].includes(state)
      ) {
        deliveryDays = "5–6 days";
        deliveryRange = "Day 6";
      } else if (
        [
          "jammu and kashmir",
          "jammu & kashmir",
          "ladakh",
          "meghalaya",
          "tripura",
          "manipur",
          "mizoram",
          "nagaland",
          "arunachal pradesh",
          "sikkim",
          "goa",
        ].includes(state)
      ) {
        deliveryDays = "6–8 days";
        deliveryRange = "Day 7";
      } else if (state === "uttar pradesh") {
        setDeliveryMessage(
          "We couldn't determine the delivery zone for this Uttar Pradesh district. Please contact support."
        );
        return;
      } else {
        setDeliveryMessage(
          "Delivery estimate isn't available for this location yet. Please contact support."
        );
        return;
      }

      setDeliveryMessage(
        `Delivery available to ${postOffice.District}, ${postOffice.State}. Estimated delivery: ${deliveryDays} (${deliveryRange}).`
      );
    } catch {
      setDeliveryMessage(
        "Unable to check delivery right now. Please try again."
      );
    } finally {
      setCheckingDelivery(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        Loading product details...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-red-500">
        Product not found.{" "}
        <Link to="/" className="text-indigo-600 underline ml-2">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/"
        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 mb-6 inline-block"
      >
        ← Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">

        {/* LEFT SIDE - Product Images */}
        <div className="space-y-4">

          {/* Main Image */}
          <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
            {currentImages.length > 0 ? (
              <img
                src={currentImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-slate-400 text-sm">
                No Image Available
              </span>
            )}
          </div>

          {/* Image Thumbnails */}
          {currentImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {currentImages.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                    ? "border-indigo-600"
                    : "border-slate-200 hover:border-indigo-400"
                    }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

        </div>


        {/* RIGHT SIDE - Product Info */}
        <div className="flex flex-col justify-between">

          <div className="space-y-4">

            {/* Category */}
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md inline-block">
              {product.category}
            </span>

            {/* Product Name */}
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-2xl font-bold text-slate-900">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            {/* Bulk Purchase Note */}
            <p className="mt-2 text-sm text-slate-600">
              Buying in bulk? Contact us at{" "}
              <a
                href="mailto:sales@gadgetglam.store"
                className="font-medium text-indigo-600 hover:underline"
              >
                sales@gadgetglam.store
              </a>
              .
            </p>

            {/* Quantity-Based Pricing */}
            {product.quantityPricing && product.quantityPricing.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">
                  Quantity Discounts
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-slate-200 p-3">
                    <p className="text-sm text-slate-600">Buy 1 piece</p>
                    <p className="text-lg font-bold text-slate-900">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-slate-500">per piece</p>
                  </div>

                  {product.quantityPricing.map((tier) => (
                    <div
                      key={tier.quantity}
                      className="rounded-xl border border-indigo-200 bg-indigo-50 p-3"
                    >
                      <p className="text-sm text-slate-600">
                        Buy {tier.quantity} pieces
                      </p>

                      <p className="text-lg font-bold text-indigo-700">
                        ₹{tier.price.toLocaleString("en-IN")}
                      </p>

                      <p className="text-xs text-slate-500">per piece</p>

                      <p className="mt-1 text-xs font-medium text-slate-700">
                        Total: ₹
                        {(tier.price * tier.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasVariants && (
              <div className="pt-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">
                  Select Variant
                </h3>

                <div className="flex gap-3">
                  {product.variants?.map((variant, index) => (
                    <button
                      key={variant.name}
                      onClick={() => {
                        setSelectedVariant(index);
                        setSelectedImage(0);
                      }}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition ${selectedVariant === index
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-slate-300 text-slate-700 hover:border-indigo-400"
                        }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-semibold uppercase text-slate-400 mb-2">
                Description
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock */}
            <div className="pt-2">
              <span className="text-xs font-medium text-slate-500">
                In Stock:{" "}
              </span>

              <span className="text-xs font-bold text-slate-800">
                {product.stock} units
              </span>
            </div>

          </div>

          {/* Check Delivery */}
          <div className="mt-6 space-y-3">
            <label
              htmlFor="delivery-pincode"
              className="block text-sm font-medium text-gray-700"
            >
              Check delivery availability
            </label>

            <div className="flex gap-2">
              <input
                id="delivery-pincode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit pincode"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
                  setDeliveryMessage("");
                }}
                className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <button
                type="button"
                onClick={checkDelivery}
                disabled={checkingDelivery}
                className="rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {checkingDelivery ? "Checking..." : "Check"}
              </button>
            </div>

            {deliveryMessage && (
              <p
                role="status"
                className={`text-sm ${deliveryMessage.startsWith("Delivery available")
                  ? "text-green-700"
                  : "text-red-600"
                  }`}
              >
                {deliveryMessage}
              </p>
            )}
          </div>

          {/* Add To Cart */}
          <div className="pt-8">
            <button
              disabled={product.stock <= 0}
              onClick={() => {

                dispatch(addToCart(product));
                navigate("/cart")
              }}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl"
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>

        </div>

      </div>

      {/* Customer Reviews */}
      <section className="mt-12 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Customer Reviews
        </h2>

        {reviewsLoading ? (
          <p className="mt-4 text-slate-500">Loading reviews...</p>
        ) : reviewsData?.data?.length ? (
          <div className="mt-5 space-y-4">
            {reviewsData.data.map((review) => (
              <article
                key={review._id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-900">
                    {review.name}
                  </h3>
                  <span className="text-amber-500">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="mt-2 text-slate-600">{review.comment}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-slate-500">
            No approved reviews yet. Be the first to share your experience!
          </p>
        )}

        <h3 className="mt-8 text-lg font-semibold text-slate-900">
          Write a Review
        </h3>

        <form
          className="mt-4 max-w-xl space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setReviewMessage("");

            try {
              await createReview({
                productId: id || "",
                name: reviewName.trim(),
                rating: reviewRating,
                comment: reviewComment.trim(),
              }).unwrap();

              setReviewMessage(
                "Review submitted successfully! It will appear after admin approval."
              );
              setReviewName("");
              setReviewRating(5);
              setReviewComment("");
            } catch {
              setReviewMessage("Could not submit your review. Please try again.");
            }
          }}
        >
          <input
            type="text"
            value={reviewName}
            onChange={(event) => setReviewName(event.target.value)}
            placeholder="Your name"
            required
            maxLength={80}
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Your rating
            </label>
            <select
              value={reviewRating}
              onChange={(event) => setReviewRating(Number(event.target.value))}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            >
              <option value={5}>★★★★★ — Excellent</option>
              <option value={4}>★★★★☆ — Very good</option>
              <option value={3}>★★★☆☆ — Good</option>
              <option value={2}>★★☆☆☆ — Fair</option>
              <option value={1}>★☆☆☆☆ — Poor</option>
            </select>
          </div>

          <textarea
            value={reviewComment}
            onChange={(event) => setReviewComment(event.target.value)}
            placeholder="Share your experience with this product"
            required
            maxLength={1000}
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          />

          <button
            type="submit"
            disabled={submittingReview}
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
          >
            {submittingReview ? "Submitting..." : "Submit Review"}
          </button>

          {reviewMessage && (
            <p role="status" className="text-sm text-slate-600">
              {reviewMessage}
            </p>
          )}
        </form>
      </section>

      {showCouponPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <button
              onClick={() => setShowCouponPopup(false)}
              className="absolute right-3 top-3 text-xl text-slate-500 hover:text-slate-900"
              aria-label="Close coupon popup"
            >
              &times;
            </button>

            <div className="mb-3 text-4xl">🎉</div>

            <h2 className="text-2xl font-bold text-slate-900">
              Get 5% OFF!
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Use this coupon on any product at Gadgetglam.
            </p>

            <div className="mt-5 rounded-xl border-2 border-dashed border-indigo-400 bg-indigo-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Your Coupon Code
              </p>

              <p className="mt-1 text-2xl font-extrabold tracking-widest text-indigo-700">
                Gadget5
              </p>
            </div>

            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText("Gadget5");
                  setCouponCopied(true);
                } catch {
                  setCouponCopied(false);
                }
              }}
              className="mt-5 w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              {couponCopied ? "Code Copied!" : "Copy Coupon Code"}
            </button>

            <button
              onClick={() => setShowCouponPopup(false)}
              className="mt-3 w-full py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};