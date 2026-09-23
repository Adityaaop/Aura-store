import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes, FaShieldAlt } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/categorylist", label: "Categories" },
    { to: "/admin/productlist", label: "Create Product" },
    { to: "/admin/allproductslist", label: "Manage Products" },
    { to: "/admin/orderlist", label: "Manage Orders" },
    { to: "/admin/userlist", label: "Manage Users" },
  ];

  return (
    <>
      <button
        aria-label="Admin Navigation Menu"
        className="fixed top-6 right-6 z-50 p-3 rounded-2xl glass-panel border border-white/15 text-white hover:text-indigo-400 shadow-xl transition-all hover:scale-105 active:scale-95"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes size={18} />
        ) : (
          <div className="flex items-center space-x-2">
            <FaShieldAlt className="text-indigo-400" size={16} />
            <span className="text-xs font-bold tracking-wider uppercase pr-1">Admin Menu</span>
          </div>
        )}
      </button>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        >
          <section
            className="fixed right-6 top-20 z-50 w-64 p-3 rounded-3xl glass-panel border border-white/15 text-slate-200 shadow-2xl space-y-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-2 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-indigo-400">
              AURA Control Panel
            </div>

            <ul className="space-y-1 pt-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                        isActive
                          ? "bg-indigo-600/25 text-indigo-300 border border-indigo-500/30"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </>
  );
};

export default AdminMenu;
