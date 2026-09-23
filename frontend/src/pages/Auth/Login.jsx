import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Welcome back to AURA!");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Authentication failed");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden glass-panel border border-white/10 grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
        {/* Left Side: Login Form */}
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
              <span>AURA Member Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Welcome Back</h1>
            <p className="text-slate-400 text-sm mt-2">
              Sign in to manage your orders, wishlist, and exclusive member perks.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                id="password"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0a0c14] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl gradient-btn text-white font-semibold text-sm shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? <span>Signing In...</span> : <span>Sign In to Account</span>}
            </button>

            {isLoading && (
              <div className="flex justify-center pt-2">
                <Loader />
              </div>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Custom Generated Brand Banner */}
        <div className="relative hidden lg:block overflow-hidden bg-[#0c0e17]">
          <img
            src="/assets/auth_banner.jpg"
            alt="AURA Lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 text-white space-y-2">
            <span className="px-3 py-1 rounded-md bg-indigo-500/30 text-indigo-300 text-xs font-bold border border-indigo-500/40">
              The AURA Standard
            </span>
            <h3 className="text-2xl font-bold">Precision-Crafted For Creators</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Experience the pinnacle of acoustics and minimalist workspace design, backed by Aditya's curated warranty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
