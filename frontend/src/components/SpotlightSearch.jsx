import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAllProductsQuery } from "../redux/api/productApiSlice";
import { FiSearch, FiX, FiArrowRight, FiCommand } from "react-icons/fi";

const SpotlightSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const { data: products } = useAllProductsQuery();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === "Escape" && isOpen) {
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? products?.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand?.toLowerCase().includes(query.toLowerCase()) ||
          p.description?.toLowerCase().includes(query.toLowerCase())
      ) || []
    : [];

  const handleSelectProduct = (id) => {
    onClose(false);
    navigate(`/product/${id}`);
  };

  const popularSearches = ["Headphones", "Keyboard", "Smartwatch", "Speaker", "Aura"];

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200"
      onClick={() => onClose(false)}
    >
      <div
        className="w-full max-w-2xl rounded-3xl glass-panel border border-white/15 overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 sm:p-5 flex items-center space-x-3 border-b border-white/10 bg-white/5">
          <FiSearch className="text-indigo-400 shrink-0" size={22} />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none text-white placeholder-slate-400 text-base sm:text-lg focus:outline-none"
            placeholder="Search audio, peripherals, gear, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <FiX size={18} />
            </button>
          )}
          <span className="hidden sm:inline-flex items-center px-2 py-1 rounded-md bg-white/10 text-slate-400 text-[11px] font-mono border border-white/10">
            ESC
          </span>
        </div>

        {/* Results / Suggestions Container */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {query.trim() === "" ? (
            <div>
              <p className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-3">
                Quick Recommendations
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-white/10 text-xs font-semibold transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No matching products found for <span className="text-white font-semibold">"{query}"</span>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-2">
                Found {filteredProducts.length} Results
              </p>
              {filteredProducts.map((p) => (
                <div
                  key={p._id}
                  onClick={() => handleSelectProduct(p._id)}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/30 flex items-center justify-between gap-4 cursor-pointer transition-all group"
                >
                  <div className="flex items-center space-x-3.5 overflow-hidden">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#0c0e17] shrink-0 border border-white/10">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
                        {p.name}
                      </h4>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">
                        {p.brand} &bull; <span className="text-emerald-400">${p.price}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        p.countInStock > 0
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-rose-500/10 text-rose-400"
                      }`}
                    >
                      {p.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                    <FiArrowRight className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" size={16} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Footer */}
        <div className="p-3.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <FiCommand size={14} className="text-indigo-400" />
            <span>Spotlight Instant Search</span>
          </div>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};

export default SpotlightSearch;
