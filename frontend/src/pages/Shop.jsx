import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { FiFilter, FiRotateCcw } from "react-icons/fi";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data?.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts || []));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand || []));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
            Collection Explorer
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">AURA Catalog</h1>
        </div>

        <div className="flex items-center space-x-2 text-sm text-slate-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <span>Displaying:</span>
          <span className="text-indigo-400 font-bold">{products?.length || 0} products</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-3 glass-panel rounded-3xl p-6 border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center space-x-2 text-white font-bold">
              <FiFilter className="text-indigo-400" size={18} />
              <span>Filters</span>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-indigo-400 flex items-center space-x-1 transition-colors"
              title="Reset all filters"
            >
              <FiRotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Categories
            </h3>
            <div className="space-y-2.5">
              {categories?.map((c) => (
                <label
                  key={c._id}
                  className="flex items-center space-x-3 text-sm text-slate-300 hover:text-white cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="w-4 h-4 rounded bg-[#0a0c14] border-white/20 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 focus:ring-1"
                  />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          {uniqueBrands.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Brands
              </h3>
              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2">
                {uniqueBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center space-x-3 text-sm text-slate-300 hover:text-white cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 bg-[#0a0c14] border-white/20 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 focus:ring-1"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Price Filter */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Filter by Price
            </h3>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-500 text-sm">$</span>
              <input
                type="text"
                placeholder="Max price..."
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full pl-7 pr-3 py-2 rounded-xl bg-[#0a0c14] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-9">
          {products?.length === 0 ? (
            <div className="glass-panel rounded-3xl p-12 text-center border border-white/10">
              <p className="text-slate-400 text-base mb-2">No matching products found.</p>
              <button
                onClick={handleReset}
                className="text-indigo-400 text-sm hover:underline"
              >
                Clear all filters and show all products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products?.map((p) => (
                <div key={p._id} className="flex justify-center">
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
