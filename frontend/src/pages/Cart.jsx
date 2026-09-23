import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-8 pb-4 border-b border-white/10">
        <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
          Order Review
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Your Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-3xl border border-white/10 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-4">
            <FiShoppingBag size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Your cart is currently empty</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
            Looks like you haven't added any luxury tech or workspace essentials to your bag yet.
          </p>
          <Link
            to="/shop"
            className="gradient-btn inline-flex items-center px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-indigo-500/25 transition-all"
          >
            <span>Explore Collection</span>
            <FiArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border border-white/10"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#0c0e17] shrink-0 border border-white/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-base font-semibold text-white hover:text-indigo-400 transition-colors"
                  >
                    {item.name}
                  </Link>

                  <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                    Brand: <span className="text-slate-300 font-medium">{item.brand}</span>
                  </div>

                  <div className="text-lg font-bold text-indigo-400 mt-2">
                    ${item.price}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-400">Qty:</span>
                    <select
                      className="px-3 py-1.5 rounded-lg bg-[#0c0e17] border border-white/15 text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 shadow-xl sticky top-8">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">
                Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Total Items</span>
                  <span className="font-semibold text-white">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} units
                  </span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Estimated Shipping</span>
                  <span className="text-emerald-400 font-semibold">Free Express</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Warranty Included</span>
                  <span className="text-indigo-400 font-semibold">2-Year Official</span>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between items-baseline">
                  <span className="text-base font-bold text-white">Subtotal</span>
                  <span className="text-2xl font-extrabold text-white gradient-text">
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                className="w-full py-4 rounded-2xl gradient-btn text-white font-bold text-base shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <FiArrowRight size={18} />
              </button>

              <div className="text-center">
                <Link
                  to="/shop"
                  className="text-xs text-slate-400 hover:text-indigo-400 transition-colors inline-block"
                >
                  &larr; Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
