import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = ({ onOpenSearch }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between py-6 px-3 text-slate-300 bg-[#0c0e17]/85 backdrop-blur-xl border-r border-white/10 w-[5rem] hover:w-[15rem] h-[100vh] fixed left-0 top-0 transition-all duration-300 shadow-2xl`}
      id="navigation-container"
    >
      <div className="flex flex-col space-y-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 px-2 py-1 mb-2 group">
          <img src="/aura-logo.svg" alt="AURA Logo" className="w-8 h-8 min-w-[2rem] transition-transform group-hover:scale-110" />
          <span className="hidden nav-item-name font-bold text-xl tracking-widest text-white group-hover:text-indigo-400">
            AURA
          </span>
        </Link>

        {/* Navigation Items */}
        <div className="flex flex-col space-y-2.5">
          {/* Spotlight Search Shortcut Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center px-2 py-2.5 rounded-xl hover:bg-white/5 hover:text-white text-slate-300 transition-all group text-left w-full"
            title="Instant Spotlight Search (Cmd + K)"
          >
            <FiSearch className="min-w-[1.75rem] text-indigo-400 group-hover:scale-110 transition-transform" size={22} />
            <div className="hidden nav-item-name ml-3 flex items-center justify-between w-full pr-1">
              <span className="text-xs font-semibold tracking-wider">SEARCH</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded border border-white/10 text-slate-400">⌘K</kbd>
            </div>
          </button>

          <Link
            to="/"
            className={`flex items-center px-2 py-2.5 rounded-xl transition-all ${
              isActive("/")
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                : "hover:bg-white/5 hover:text-white"
            }`}
          >
            <AiOutlineHome className="min-w-[1.75rem]" size={22} />
            <span className="hidden nav-item-name ml-3 text-xs font-semibold tracking-wider">
              HOME
            </span>
          </Link>

          <Link
            to="/shop"
            className={`flex items-center px-2 py-2.5 rounded-xl transition-all ${
              isActive("/shop")
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                : "hover:bg-white/5 hover:text-white"
            }`}
          >
            <AiOutlineShopping className="min-w-[1.75rem]" size={22} />
            <span className="hidden nav-item-name ml-3 text-xs font-semibold tracking-wider">
              SHOP
            </span>
          </Link>

          <Link
            to="/cart"
            className={`flex items-center px-2 py-2.5 rounded-xl relative transition-all ${
              isActive("/cart")
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                : "hover:bg-white/5 hover:text-white"
            }`}
          >
            <div className="relative">
              <AiOutlineShoppingCart className="min-w-[1.75rem]" size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 px-1.5 py-0.2 text-[10px] font-bold text-white bg-indigo-600 rounded-full shadow-md animate-pulse">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </div>
            <span className="hidden nav-item-name ml-3 text-xs font-semibold tracking-wider">
              CART
            </span>
          </Link>

          <Link
            to="/favorite"
            className={`flex items-center px-2 py-2.5 rounded-xl relative transition-all ${
              isActive("/favorite")
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                : "hover:bg-white/5 hover:text-white"
            }`}
          >
            <FaHeart className="min-w-[1.75rem] text-rose-500/80" size={18} />
            <span className="hidden nav-item-name ml-3 text-xs font-semibold tracking-wider">
              WISHLIST
            </span>
            <div className="ml-auto hidden nav-item-name">
              <FavoritesCount />
            </div>
          </Link>
        </div>
      </div>

      {/* User / Auth Section */}
      <div className="relative pt-4 border-t border-white/10">
        {userInfo ? (
          <div>
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-between w-full px-2 py-2 rounded-xl hover:bg-white/5 transition-all text-left"
            >
              <div className="flex items-center space-x-2 overflow-hidden">
                <div className="w-8 h-8 min-w-[2rem] rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
                  {userInfo.username?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden nav-item-name text-sm font-medium text-white truncate max-w-[80px]">
                  {userInfo.username}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`hidden nav-item-name h-4 w-4 text-slate-400 transition-transform ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <ul className="absolute left-full ml-2 bottom-0 w-48 py-2 rounded-xl bg-[#121626]/95 backdrop-blur-xl border border-white/15 text-slate-300 shadow-2xl space-y-1">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 border-b border-white/10 uppercase tracking-wider">
                  Signed in as <span className="text-white font-bold">{userInfo.username}</span>
                </div>
                {userInfo.isAdmin && (
                  <>
                    <li>
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-1.5 text-xs hover:bg-indigo-600/20 hover:text-indigo-400 rounded-md mx-1 transition-colors"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/productlist"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-1.5 text-xs hover:bg-indigo-600/20 hover:text-indigo-400 rounded-md mx-1 transition-colors"
                      >
                        Create Product
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/allproductslist"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-1.5 text-xs hover:bg-indigo-600/20 hover:text-indigo-400 rounded-md mx-1 transition-colors"
                      >
                        Manage Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/categorylist"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-1.5 text-xs hover:bg-indigo-600/20 hover:text-indigo-400 rounded-md mx-1 transition-colors"
                      >
                        Categories
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/orderlist"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-1.5 text-xs hover:bg-indigo-600/20 hover:text-indigo-400 rounded-md mx-1 transition-colors"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/userlist"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-1.5 text-xs hover:bg-indigo-600/20 hover:text-indigo-400 rounded-md mx-1 transition-colors"
                      >
                        Users
                      </Link>
                    </li>
                    <div className="border-t border-white/10 my-1"></div>
                  </>
                )}

                <li>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-3 py-1.5 text-xs hover:bg-indigo-600/20 hover:text-indigo-400 rounded-md mx-1 transition-colors"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logoutHandler();
                    }}
                    className="block w-full px-3 py-1.5 text-left text-xs text-rose-400 hover:bg-rose-500/20 rounded-md mx-1 transition-colors"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <Link
              to="/login"
              className="flex items-center px-2 py-2.5 rounded-xl hover:bg-white/5 hover:text-white transition-all text-slate-300"
            >
              <AiOutlineLogin className="min-w-[1.75rem]" size={22} />
              <span className="hidden nav-item-name ml-3 text-xs font-semibold tracking-wider">
                SIGN IN
              </span>
            </Link>
            <Link
              to="/register"
              className="flex items-center px-2 py-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all border border-indigo-500/30"
            >
              <AiOutlineUserAdd className="min-w-[1.75rem]" size={22} />
              <span className="hidden nav-item-name ml-3 text-xs font-semibold tracking-wider">
                REGISTER
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
