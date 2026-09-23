import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success(`${product.name} added to cart!`, {
      autoClose: 2000,
    });
  };

  return (
    <div className="w-full max-w-sm glass-card rounded-2xl overflow-hidden group flex flex-col justify-between shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-[#0c0e17]">
        <Link to={`/product/${p._id}`} className="w-full h-full block">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={p.image}
            alt={p.name}
          />
        </Link>

        {p?.brand && (
          <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-white/10 uppercase tracking-wider">
            {p.brand}
          </span>
        )}

        <div className="absolute top-3 right-3 z-10">
          <HeartIcon product={p} />
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-start gap-2 mb-2">
            <Link to={`/product/${p._id}`}>
              <h4 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                {p?.name}
              </h4>
            </Link>

            <span className="text-base font-bold text-indigo-400 shrink-0">
              ${p?.price}
            </span>
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            {p?.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <Link
            to={`/product/${p._id}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
          >
            View Specs
          </Link>

          <button
            onClick={() => addToCartHandler(p, 1)}
            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:shadow-indigo-500/25 transition-all active:scale-95"
            title="Add to Cart"
          >
            <AiOutlineShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
