import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  Product,
} from "@/store/api/productApi";

const CATEGORIES = ["DSLR", "Mirrorless", "Lenses", "Action Cam", "Accessories"] as const;

export const AdminProductsPage = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State matching IProduct schema
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    brand: "",
    category: "Mirrorless" as typeof CATEGORIES[number],
    price: "",
    stock: "",
    description: "",
    isFeatured: false,
    images: [""] as string[],
    specs: [] as { key: string; value: string }[],
  });

  const products = data?.data ?? [];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      slug: "",
      brand: "",
      category: "Mirrorless",
      price: "",
      stock: "0",
      description: "",
      isFeatured: false,
      images: [""],
      specs: [{ key: "", value: "" }],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);

    // Convert specs Map/Record object into key-value array for the UI
    const specsArray = product.specs
      ? Object.entries(product.specs).map(([key, value]) => ({ key, value }))
      : [];

    setFormData({
      name: product.name,
      slug: product.slug,
      brand: product.brand,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      isFeatured: product.isFeatured ?? false,
      images: product.images && product.images.length > 0 ? product.images : [""],
      specs: specsArray.length > 0 ? specsArray : [{ key: "", value: "" }],
    });
    setIsModalOpen(true);
  };

  // Auto-generate slug when name changes (if creating or slug is empty)
  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

    setFormData((prev) => ({
      ...prev,
      name,
      slug: editingProduct ? prev.slug : slug,
    }));
  };

  // Image Array Handler
  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  // Specs Key-Value Handler
  const handleSpecChange = (index: number, field: "key" | "value", val: string) => {
    const updatedSpecs = [...formData.specs];
    updatedSpecs[index][field] = val;
    setFormData({ ...formData, specs: updatedSpecs });
  };

  const addSpecField = () => {
    setFormData({ ...formData, specs: [...formData.specs, { key: "", value: "" }] });
  };

  const removeSpecField = (index: number) => {
    setFormData({
      ...formData,
      specs: formData.specs.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert key-value specs array back into Record object for schema
    const specsRecord: Record<string, string> = {};
    formData.specs.forEach((s) => {
      if (s.key.trim()) {
        specsRecord[s.key.trim()] = s.value.trim();
      }
    });

    const payload = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      brand: formData.brand,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      description: formData.description,
      isFeatured: formData.isFeatured,
      images: formData.images.filter((img) => img.trim() !== ""),
      specs: specsRecord,
    };

    try {
      if (editingProduct) {
        await updateProduct({ id: editingProduct._id, body: payload }).unwrap();
      } else {
        await createProduct(payload).unwrap();
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save product:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      setDeletingId(null);
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-sm text-slate-500">
            Create, update, and monitor product listings, specs, and gallery images.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="self-start sm:self-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-lg transition-colors shadow-xs cursor-pointer"
        >
          + Add New Product
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <input
          type="text"
          placeholder="Search by product name, brand, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Responsive Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500 text-sm">Loading inventory...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500 text-sm">Error fetching products.</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 uppercase text-xs text-slate-500 font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Brand</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4 text-center">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => {
                  const coverImage = product.images && product.images.length > 0 ? product.images[0] : null;

                  return (
                    <tr key={product._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-md border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                          {coverImage ? (
                            <img
                              src={coverImage}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[10px] text-slate-400">No Image</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-semibold text-slate-900">{product.name}</div>
                          <div className="text-xs text-slate-400 font-mono">{product.slug}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">{product.brand}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.stock > 5
                              ? "bg-emerald-100 text-emerald-800"
                              : product.stock > 0
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock} in stock
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {product.isFeatured ? (
                          <span className="text-amber-500 font-bold text-xs bg-amber-50 px-2 py-1 rounded-md">★ Featured</span>
                        ) : (
                          <span className="text-slate-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-3">
                        <Link
                          to={`/products/${product._id}`}
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeletingId(product._id)}
                          className="text-xs font-semibold text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 my-8">
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-900">
                {editingProduct ? "Edit Product Listing" : "Add New Camera/Gear Listing"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 font-mono focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sony, Canon, Nikon..."
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as typeof CATEGORIES[number],
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Stock Inventory *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div className="pt-5">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData({ ...formData, isFeatured: e.target.checked })
                      }
                      className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-semibold text-slate-700">
                      Feature on Homepage
                    </span>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              {/* Dynamic Images Array */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold uppercase text-slate-500">
                    Product Image URLs (Array)
                  </label>
                  <button
                    type="button"
                    onClick={addImageField}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    + Add Image URL
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.images.map((imgUrl, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={imgUrl}
                        onChange={(e) => handleImageChange(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500"
                      />
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(idx)}
                          className="text-xs text-red-500 hover:text-red-700 font-semibold px-2 py-1"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Specs Editor */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold uppercase text-slate-500">
                    Technical Specifications
                  </label>
                  <button
                    type="button"
                    onClick={addSpecField}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    + Add Spec Row
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.specs.map((spec, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Spec Name (e.g., Sensor)"
                        value={spec.key}
                        onChange={(e) => handleSpecChange(idx, "key", e.target.value)}
                        className="w-1/2 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g., Full-Frame 45MP)"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                        className="w-1/2 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500"
                      />
                      {formData.specs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSpecField(idx)}
                          className="text-xs text-red-500 hover:text-red-700 font-semibold px-2 py-1"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold disabled:opacity-50 cursor-pointer"
                >
                  {isCreating || isUpdating ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-slate-200 text-center">
            <h3 className="text-lg font-bold text-slate-900">Delete Product Listing</h3>
            <p className="mt-2 text-sm text-slate-500">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};