import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { FiUploadCloud, FiPackage, FiDollarSign, FiTag, FiLayers } from "react-icons/fi";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage, { isLoading: uploading }] = useUploadProductImageMutation();
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      toast.error("Please choose a category");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} created successfully!`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed. Please verify inputs.");
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error || "Image upload failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
      <AdminMenu />

      <div className="pb-4 mb-8 border-b border-white/10">
        <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
          Catalog Management
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Create New Product</h1>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Zone */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Product Visual
            </label>

            {imageUrl ? (
              <div className="relative rounded-2xl overflow-hidden max-h-72 aspect-video bg-[#0a0c14] border border-white/10 flex items-center justify-center group mb-4">
                <img
                  src={imageUrl}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => { setImageUrl(null); setImage(""); }}
                  className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-xs text-rose-400 border border-white/10 hover:bg-rose-500 hover:text-white transition-all"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-white/15 bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 cursor-pointer transition-all group">
                <FiUploadCloud className="text-slate-400 group-hover:text-indigo-400 transition-colors" size={36} />
                <span className="mt-3 text-sm font-semibold text-slate-200">
                  {uploading ? "Uploading..." : "Click to upload product image"}
                </span>
                <span className="text-xs text-slate-500 mt-1">Supports PNG, JPG, WEBP</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Title & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Product Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="e.g. Aura Horizon ANC Headphones"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Brand
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="e.g. Aura Audio"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>

          {/* Price, Quantity, Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Price ($ USD)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="299.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Batch Quantity
              </label>
              <input
                type="number"
                required
                min="0"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="50"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Count in Stock
              </label>
              <input
                type="number"
                required
                min="0"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="25"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Category
            </label>
            <select
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-- Choose Category --</option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Product Description
            </label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="Detail the materials, engineering, specifications, and audio/lifestyle benefits..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              disabled={creating}
              className="gradient-btn px-8 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50"
            >
              {creating ? "Publishing..." : "Publish Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductList;
