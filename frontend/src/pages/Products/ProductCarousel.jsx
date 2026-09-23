import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-4 sm:p-6 border border-white/10 overflow-hidden">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error || "Error loading carousel"}
        </Message>
      ) : (
        <Slider {...settings}>
          {products?.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="outline-none">
                <Link to={`/product/${_id}`} className="block relative rounded-xl overflow-hidden aspect-[16/9] max-h-80 bg-[#0c0e17] group">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-indigo-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Spotlight
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
                    <div>
                      <p className="text-xs text-indigo-300 font-semibold uppercase">{brand}</p>
                      <h3 className="text-lg sm:text-xl font-bold truncate max-w-xs sm:max-w-md">{name}</h3>
                    </div>
                    <span className="text-xl sm:text-2xl font-extrabold text-white">
                      ${price}
                    </span>
                  </div>
                </Link>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-slate-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-amber-400 font-semibold">
                      <FaStar className="mr-1" /> {rating.toFixed(1)} ({numReviews} reviews)
                    </span>
                    <span className="flex items-center text-slate-300">
                      <FaClock className="mr-1 text-indigo-400" /> {moment(createdAt).fromNow()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${
                      countInStock > 0 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400"
                    }`}>
                      {countInStock > 0 ? `In Stock (${countInStock})` : "Out of Stock"}
                    </span>
                    <Link
                      to={`/product/${_id}`}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all border border-indigo-500/30"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
