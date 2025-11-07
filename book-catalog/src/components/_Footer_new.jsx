import React from "react";

function Footer() {
  return (
    <footer id="footer" className="bg-gray-100 p-8 mt-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-bold mb-2">BookCatalog</h4>
          <p className="text-sm text-gray-600">
            Helping students find the right textbooks quickly.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-2">Links</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              <a href="#features" className="hover:text-indigo-600">
                Features
              </a>
            </li>
            <li>
              <a href="#recommended" className="hover:text-indigo-600">
                Recommended
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-indigo-600">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-2">Contact</h4>
          <p className="text-sm text-gray-600">
            Email: support@bookcatalog.example
          </p>
          <p className="text-sm text-gray-600">Phone: +1 555-0100</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} BookCatalog — All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
