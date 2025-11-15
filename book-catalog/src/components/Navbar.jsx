import React from "react";
import { Link, useLocation } from "react-router-dom";
import CartIcon from "./CartIcon";

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-700">
          BookCatalog
        </Link>
        <nav className="space-x-4 text-gray-700 hidden md:block">
          {isHome ? (
            <>
              <a href="#features" className="hover:text-indigo-600">
                Features
              </a>
              <a href="#recommended" className="hover:text-indigo-600">
                Recommended
              </a>
              <a href="#contact" className="hover:text-indigo-600">
                Contact
              </a>
            </>
          ) : null}
          <Link to="/catalog" className="hover:text-indigo-600">
           Search Catalog
          </Link>
          <Link to="/filter" className="hover:text-indigo-600">
            Filter
          </Link>
        </nav>
        <CartIcon />
      </div>
    </header>
  );
}
