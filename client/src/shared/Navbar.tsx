import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "All Books", link: "/allBooks" },
    { name: "Add Book", link: "/addBook" },
    { name: "Borrow Summary", link: "/borrowSummary" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full bg-[#479df3] text-white shadow-md fixed top-0 z-70">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider font-serif drop-shadow-sm">
          <span className="mr-1">📚</span> Book Management
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-lg">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-[#6af34b] px-5 py-2 rounded-xl font-semibold"
                  : "hover:text-white transition-colors"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button onClick={toggleMobileMenu} className="md:hidden">
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#c435e0] px-6 py-4 space-y-3"
          >
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? "block text-white bg-[#89db76] px-4 py-2 rounded-lg font-semibold"
                    : "block hover:text-yellow-200 transition-colors"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
