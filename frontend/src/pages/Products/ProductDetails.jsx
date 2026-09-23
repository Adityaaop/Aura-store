import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review submitted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Failed to submit review");
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: Number(qty) }));
    toast.success("Item added to cart");
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-6"
      >
        <FiArrowLeft className="mr-2" size={16} />
        Back to Home
      </Link>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error || "Error loading product details"}
        </Message>
      ) : (
        <div className="space-y-12">
          {/* Main Product Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Product Image */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-4 group">
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#0a0c14] flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 z-10">
                  <HeartIcon product={product} />
                </div>
                {product.brand && (
                  <span className="absolute bottom-4 left-4 px-3 py-1 text-xs font-bold text-slate-200 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 uppercase tracking-widest">
                    {product.brand}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Product Info & Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
                  {product.brand || "AURA Engineered"}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 leading-tight">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} verified reviews`}
                />
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-white gradient-text">
                ${product.price}
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <FaStore className="text-indigo-400" />
                  <span>Brand: <strong className="text-white">{product.brand}</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-indigo-400" />
                  <span>Released: <strong className="text-white">{moment(product.createdAt).fromNow()}</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaStar className="text-indigo-400" />
                  <span>Rating: <strong className="text-white">{product.rating} / 5.0</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaBox className="text-indigo-400" />
                  <span>Stock Status:{" "}
                    <strong className={product.countInStock > 0 ? "text-emerald-400" : "text-rose-400"}>
                      {product.countInStock > 0 ? `Available (${product.countInStock})` : "Sold Out"}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                {product.countInStock > 0 && (
                  <div className="w-full sm:w-auto flex items-center space-x-3">
                    <span className="text-xs uppercase font-semibold text-slate-400">Qty:</span>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/15 text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl gradient-btn text-white font-bold text-sm shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaShoppingCart size={16} />
                  <span>{product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Tabs & Reviews */}
          <div className="pt-8 border-t border-white/10">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
