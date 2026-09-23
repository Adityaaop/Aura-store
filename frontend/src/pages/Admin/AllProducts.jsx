import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import { FiEdit, FiPlus } from "react-icons/fi";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <AdminMenu />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 mb-8 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
            Inventory Management
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">
            Store Catalog ({products?.length || 0})
          </h1>
        </div>

        <Link
          to="/admin/productlist"
          className="gradient-btn inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-white font-semibold text-xs shadow-md hover:shadow-indigo-500/25 transition-all"
        >
          <FiPlus size={16} />
          <span>Add New Product</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : isError ? (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          Error loading products inventory.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products?.map((product) => (
            <div
              key={product._id}
              className="glass-card rounded-2xl overflow-hidden p-4 sm:p-5 flex flex-col sm:flex-row gap-5 border border-white/10 group"
            >
              <div className="w-full sm:w-40 aspect-square sm:aspect-auto rounded-xl overflow-hidden bg-[#0c0e17] shrink-0 border border-white/5 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.brand && (
                  <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] uppercase font-bold text-slate-300">
                    {product.brand}
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="text-base font-extrabold text-indigo-400 shrink-0">
                      ${product.price}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-1">
                    Added: {moment(product.createdAt).format("MMM DD, YYYY")}
                  </p>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/10">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      product.countInStock > 0
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    Stock: {product.countInStock}
                  </span>

                  <Link
                    to={`/admin/product/update/${product._id}`}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-all"
                  >
                    <FiEdit size={14} />
                    <span>Edit Specs</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
