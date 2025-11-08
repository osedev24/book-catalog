import React from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between">
        {/* Logo / App Name */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-[#2563EB]">Bookstore</span>
          <span className="text-gray-500 hidden sm:inline">📚 Explore & Discover</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-[#6B7280] font-medium">
          <a href="#" className="hover:text-[#2563EB] transition">
            Home
          </a>
          <a href="#" className="hover:text-[#2563EB] transition">
            Catalog
          </a>
          <a href="#" className="hover:text-[#2563EB] transition">
            Recommended
          </a>
          <a href="#" className="hover:text-[#2563EB] transition">
            Admin
          </a>
        </nav>

        {/* Search + Icons */}
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search books..."
            className="border border-[#6B7280] rounded-lg p-2 w-48 focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
          />
          <button className="relative text-[#2563EB] hover:text-blue-700 transition">
            <FaHeart size={20} />
            <span className="absolute -top-2 -right-2 bg-[#2563EB] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <button className="relative text-[#2563EB] hover:text-blue-700 transition">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-[#2563EB] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              5
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
