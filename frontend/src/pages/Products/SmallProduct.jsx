import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-full glass-card rounded-xl overflow-hidden p-3 relative group">
      <div className="relative rounded-lg overflow-hidden bg-[#0c0e17] aspect-video">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="absolute top-2 right-2 z-10 scale-90">
          <HeartIcon product={product} />
        </div>
      </div>

      <div className="mt-3">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-between items-center gap-2">
            <h4 className="text-sm font-semibold text-white truncate group-hover:text-indigo-400 transition-colors">
              {product.name}
            </h4>
            <span className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              ${product.price}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
