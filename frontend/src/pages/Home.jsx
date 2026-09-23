import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import { FiShoppingBag } from "react-icons/fi";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="w-full">
      {!keyword ? <Header /> : null}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : isError ? (
          <Message variant="danger">
            {isError?.data?.message || isError?.error || "Error loading products"}
          </Message>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
                  {keyword ? `Search Results for "${keyword}"` : "Master Collection"}
                </span>
                <h2 className="text-3xl font-extrabold text-white mt-1">
                  {keyword ? "Matching Items" : "Featured Products"}
                </h2>
              </div>

              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-white/5 hover:bg-indigo-600 hover:text-white text-slate-200 border border-white/10 font-semibold text-sm transition-all shadow-sm"
              >
                <FiShoppingBag size={16} />
                <span>Open Catalog</span>
              </Link>
            </div>

            {data?.products?.length === 0 ? (
              <div className="text-center py-20 bg-[#101322]/50 rounded-2xl border border-white/5">
                <p className="text-slate-400 text-lg">No products found.</p>
                <Link to="/shop" className="text-indigo-400 text-sm mt-2 inline-block hover:underline">
                  Browse all categories &rarr;
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.products?.map((product) => (
                  <div key={product._id} className="flex justify-center">
                    <Product product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
