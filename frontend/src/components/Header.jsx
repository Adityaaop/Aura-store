import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";
import { FiArrowRight, FiShield, FiTruck, FiAward, FiRefreshCw } from "react-icons/fi";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  return (
    <div className="w-full">
      {/* Hero Showcase Banner */}
      <section className="relative overflow-hidden rounded-3xl mx-4 sm:mx-8 my-6 bg-gradient-to-r from-[#101322] via-[#0d0f1b] to-[#141829] border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <span>AURA 2026 Collection</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Elevate Your Everyday <br />
              <span className="gradient-text">With Pure Precision</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Explore bespoke high-fidelity acoustics, tactile workspace equipment, and minimalist wearable essentials engineered for discerning creators.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/shop"
                className="gradient-btn inline-flex items-center px-8 py-3.5 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-indigo-500/30 transition-all group"
              >
                <span>Explore Catalog</span>
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
              </Link>

              <Link
                to="/favorite"
                className="inline-flex items-center px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-semibold text-sm transition-all"
              >
                Saved Items
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/15 group">
              <img
                src="/assets/aura_showcase.jpg"
                alt="AURA Collection Showcase"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex justify-between items-center text-xs">
                <div>
                  <p className="text-white font-semibold">Bespoke Workspace & Audio</p>
                  <p className="text-slate-400">Curated by Aditya</p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  Featured
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Value Props Strip */}
        <div className="border-t border-white/10 bg-black/30 backdrop-blur-sm grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-4 flex items-center justify-center space-x-3 text-slate-300">
            <FiTruck className="text-indigo-400" size={20} />
            <span className="text-xs sm:text-sm font-medium">Free Global Delivery</span>
          </div>
          <div className="p-4 flex items-center justify-center space-x-3 text-slate-300">
            <FiShield className="text-indigo-400" size={20} />
            <span className="text-xs sm:text-sm font-medium">2-Year Official Warranty</span>
          </div>
          <div className="p-4 flex items-center justify-center space-x-3 text-slate-300">
            <FiAward className="text-indigo-400" size={20} />
            <span className="text-xs sm:text-sm font-medium">Master Craftsmanship</span>
          </div>
          <div className="p-4 flex items-center justify-center space-x-3 text-slate-300">
            <FiRefreshCw className="text-indigo-400" size={20} />
            <span className="text-xs sm:text-sm font-medium">30-Day Hassle-Free Returns</span>
          </div>
        </div>
      </section>

      {/* Featured Products & Top Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 my-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Trending Now</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Spotlight Releases</h2>
          </div>
          <Link to="/shop" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            View All &rarr;
          </Link>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            Error loading top products.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data?.slice(0, 4).map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))}
            </div>
            <div className="lg:col-span-7">
              <ProductCarousel />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Header;
