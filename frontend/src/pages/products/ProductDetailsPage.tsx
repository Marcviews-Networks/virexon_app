import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "@/store/api/productApi";

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetProductByIdQuery(id || "");

  const product = data?.data;

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
      {/* Product Image */}
<div className="aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
  {product.images && product.images.length > 0 ? (
    <img
      src={product.images[0]}
      alt={product.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-slate-400 text-sm">No Image Available</span>
  )}
</div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-slate-900">${product.price.toFixed(2)}</p>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-semibold uppercase text-slate-400 mb-2">
                Description
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            <div className="pt-2">
              <span className="text-xs font-medium text-slate-500">In Stock: </span>
              <span className="text-xs font-bold text-slate-800">{product.stock} units</span>
            </div>
          </div>

          <div className="pt-8">
            <button
              disabled={product.stock <= 0}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};