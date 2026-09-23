import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import SpotlightSearch from "./components/SpotlightSearch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-slate-100">
      <ToastContainer theme="dark" position="bottom-right" />
      <Navigation onOpenSearch={() => setIsSearchOpen(true)} />
      <SpotlightSearch isOpen={isSearchOpen} onClose={setIsSearchOpen} />

      <main className="flex-1 lg:pl-[4.5rem] w-full">
        <Outlet />
      </main>

      {/* Modern Global Brand Footer */}
      <footer className="lg:pl-[4.5rem] border-t border-white/10 bg-[#07080d]/80 py-8 px-6 text-sm text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <img src="/aura-logo.svg" alt="AURA Logo" className="w-6 h-6" />
            <span className="font-bold tracking-widest text-white text-base">AURA</span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-slate-400">Curated & Designed by Aditya</span>
          </div>

          <div className="flex items-center space-x-6 text-xs text-slate-400">
            <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-indigo-400 transition-colors">Shop</Link>
            <Link to="/cart" className="hover:text-indigo-400 transition-colors">Cart</Link>
            <Link to="/favorite" className="hover:text-indigo-400 transition-colors">Wishlist</Link>
          </div>

          <div className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} AURA Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
