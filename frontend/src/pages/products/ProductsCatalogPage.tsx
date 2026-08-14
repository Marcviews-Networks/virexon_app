import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/store/api/productApi";

export const ProductsCatalogPage = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const products = data?.data ?? [];

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Camera Store Catalog
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Explore high-performance camera gear and optical accessories.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
        />

        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Product Cards */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-500 text-sm">
          Loading catalog items...
        </div>
      ) : isError ? (
        <div className="text-center py-16 text-red-500 text-sm">
          Failed to load products. Please check server logs.
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 text-slate-500 text-sm">
          No products matched your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
  <div
    key={product._id}
    className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
  >
    <div>
      <div className="aspect-square bg-slate-100 overflow-hidden relative">
        {/* Check if images array exists and has at least one image */}
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
            No Image
          </div>
        )}
        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
          {product.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-slate-500 line-clamp-2">
          {product.description}
        </p>
      </div>
    </div>

    <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
      <span className="text-lg font-bold text-slate-900">
        ${product.price.toFixed(2)}
      </span>
      <Link
        to={`/products/${product._id}`}
        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors"
      >
        View Details
      </Link>
    </div>
  </div>
))}
        </div>
      )}
    </div>
  );
};