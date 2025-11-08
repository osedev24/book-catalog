import React, { useEffect, useState } from "react";

const BookstoreCatalog = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("harry potter");
  const [genreFilter, setGenreFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (query) => {
    setLoading(true);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      const data = await res.json();

      const mappedBooks = data.docs.slice(0, 30).map((book, index) => ({
        id: index,
        title: book.title,
        author: book.author_name ? book.author_name.join(", ") : "Unknown",
        genre: book.subject ? book.subject[0] : "Unknown",
        price: Math.floor(Math.random() * 30) + 5,
        rating: Math.floor(Math.random() * 5) + 1,
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "https://via.placeholder.com/150x220?text=No+Cover",
      }));

      setBooks(mappedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      fetchBooks(searchTerm);
    }
  }, [searchTerm]);

  const filteredBooks = books.filter((book) => {
    const matchesGenre = genreFilter === "All" || book.genre === genreFilter;
    const matchesPrice =
      priceFilter === "All" ||
      (priceFilter === "Below 15" && book.price < 15) ||
      (priceFilter === "15 - 20" && book.price >= 15 && book.price <= 20) ||
      (priceFilter === "Above 20" && book.price > 20);

    return matchesGenre && matchesPrice;
  });

  const genres = Array.from(new Set(books.map((book) => book.genre)));

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#111827] mb-8">
        📚 Bookstore Catalog
      </h1>

      {/* Search & Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-[#6B7280] rounded-lg p-3 w-64 focus:ring-2 focus:ring-[#2563EB] focus:outline-none shadow-sm"
        />

        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="border border-[#6B7280] rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
        >
          <option value="All">All Genres</option>
          {genres.map((g, i) => (
            <option key={i} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border border-[#6B7280] rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
        >
          <option value="All">All Prices</option>
          <option value="Below 15">Below $15</option>
          <option value="15 - 20">$15 - $20</option>
          <option value="Above 20">Above $20</option>
        </select>
      </div>

      {loading && (
        <p className="text-center text-gray-500 text-lg mb-4">Loading books...</p>
      )}

      {/* Books Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-[#FFFFFF] rounded-xl shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition-all border border-[#E5E7EB]"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#111827] mb-1">
                  {book.title}
                </h3>
                <p className="text-sm text-[#6B7280] mb-1">by {book.author}</p>
                <p className="text-sm text-[#6B7280] mb-2">Genre: {book.genre}</p>

                <p className="text-[#2563EB] font-semibold mb-2">${book.price.toFixed(2)}</p>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`${
                        idx < book.rating ? "text-yellow-400" : "text-gray-300"
                      } text-xl`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#2563EB] text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                    Add to Cart
                  </button>
                  <button className="flex-1 border border-[#6B7280] text-[#6B7280] px-3 py-2 rounded-lg hover:bg-[#2563EB] hover:text-white transition font-medium">
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="col-span-full text-center text-gray-500 text-lg mt-6">
              No books found 😢
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default BookstoreCatalog;
