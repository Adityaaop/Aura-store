import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full max-w-sm glass-card rounded-2xl overflow-hidden group flex flex-col justify-between">
      <div className="relative overflow-hidden bg-[#0c0e17] aspect-square flex items-center justify-center">
        <Link to={`/product/${product._id}`} className="w-full h-full block">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <div className="absolute top-3 right-3 z-10">
          <HeartIcon product={product} />
        </div>
        {product.brand && (
          <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-slate-300 bg-black/60 backdrop-blur-md rounded-md border border-white/10 uppercase">
            {product.brand}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <Link to={`/product/${product._id}`} className="group-hover:text-indigo-400 transition-colors">
          <h3 className="text-base font-semibold text-white line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-lg font-bold text-white tracking-tight">
            ${product.price}
          </span>

          <Link
            to={`/product/${product._id}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 transition-all"
          >
            Details &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
