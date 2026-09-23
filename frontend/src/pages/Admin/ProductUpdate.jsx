import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { FiUploadCloud, FiTrash2, FiSave, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage, { isLoading: uploading }] = useUploadProductImageMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
      setCategory(productData.category?._id || productData.category || "");
      setQuantity(productData.quantity || "");
      setBrand(productData.brand || "");
      setImage(productData.image || "");
      setStock(productData.countInStock || 0);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const res = await updateProduct({ productId: params._id, formData });

      if (res?.data?.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Product updated successfully!");
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to permanently delete this product?"
      );
      if (!confirmDelete) return;

      const res = await deleteProduct(params._id);
      toast.success(`"${res?.data?.name || "Product"}" has been deleted.`);
      navigate("/admin/allproductslist");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
      <AdminMenu />

      <div className="flex items-center justify-between pb-4 mb-8 border-b border-white/10">
        <div>
          <Link
            to="/admin/allproductslist"
            className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-white mb-2 transition-colors"
          >
            <FiArrowLeft className="mr-1.5" />
            Back to Inventory
          </Link>
          <h1 className="text-3xl font-extrabold text-white">Update Product Specs</h1>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/30 text-xs font-bold transition-all disabled:opacity-50"
        >
          <FiTrash2 size={16} />
          <span>{deleting ? "Deleting..." : "Delete Product"}</span>
        </button>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Preview & Upload */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Product Visual
            </label>

            {image && (
              <div className="relative rounded-2xl overflow-hidden max-h-72 aspect-video bg-[#0a0c14] border border-white/10 flex items-center justify-center group mb-4">
                <img src={image} alt="Product visual" className="w-full h-full object-cover" />
              </div>
            )}

            <label className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-white/15 bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 cursor-pointer transition-all group">
              <FiUploadCloud className="text-slate-400 group-hover:text-indigo-400 transition-colors" size={28} />
              <span className="mt-2 text-xs font-semibold text-slate-200">
                {uploading ? "Uploading..." : "Replace product image"}
              </span>
              <input type="file" accept="image/*" onChange={uploadFileHandler} className="hidden" />
            </label>
          </div>

          {/* Name & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Product Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
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
                className="w-full px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
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
                className="w-full px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
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
                className="w-full px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>

          {/* Category */}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-white/10 flex justify-end items-center space-x-4">
            <Link
              to="/admin/allproductslist"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-semibold border border-white/10 transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={updating}
              className="gradient-btn inline-flex items-center space-x-2 px-8 py-3 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50"
            >
              <FiSave size={16} />
              <span>{updating ? "Saving Changes..." : "Save Updates"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
