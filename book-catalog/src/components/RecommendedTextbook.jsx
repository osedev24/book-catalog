import React, { useState } from "react";

export default function RecommendedTextbook({ book }) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <article className="border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg bg-white">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-48 h-64 sm:h-full bg-gray-100">
          <img
            src={imageError ? `https://via.placeholder.com/190x285/f3f4f6/303030?text=${encodeURIComponent(book.title)}`: book.cover}
            alt={book.title}
            onError={() => setImageError(true)}
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            ${book.price.toFixed(2)}
          </div>
        </div>
        
        <div className="flex-1 p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1 line-clamp-2">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
          </div>
          
          <p className="text-sm text-gray-700 mb-4 line-clamp-3">{book.description}</p>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs text-gray-500">ISBN: {book.isbn}</span>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
