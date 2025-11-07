import React, { useState, useCallback } from "react";
import { searchBooks } from "../../lib/googleBooks";
import Navbar from "../Navbar.jsx";
import LoadingSpinner from "../LoadingSpinner.jsx";

export default function CatalogPage() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const onSearch = useCallback(
    async (e) => {
      e?.preventDefault();
      console.log(q)
      if (!q.trim()) return;

      setLoading(true);
      setError(null);
      setResults([]);

      try {
        const json = await searchBooks(q);
        setResults(json.items || []);
      } catch (err) {
        setError(err?.message || String(err));
      } finally {
        setLoading(false);
      }
    },
    [q]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6">Search Books</h1>

          <form onSubmit={onSearch} className="flex gap-2 mb-6">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title, author, or ISBN..."
              className="flex-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Searching...</span>
                </>
              ) : (
                <span>Search</span>
              )}
            </button>
          </form>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>
          )}

          {results.length > 0 && !loading && (
            <p className="text-gray-600 mb-4">Found {results.length} books</p>
          )}
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((it) => {
            const info = it.volumeInfo || {};
            const thumbnail =
              (info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || "")
                .replace?.("http:", "https:") ||
              `https://via.placeholder.com/190x285/f3f4f6/303030?text=${encodeURIComponent(
                info.title || "No Cover"
              )}`;

            return (
              <article
                key={it.id}
                className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex gap-4 p-4">
                  <img
                    src={thumbnail}
                    alt={info.title}
                    className="w-32 h-48 object-cover rounded transition-transform hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/190x285/f3f4f6/303030?text=${encodeURIComponent(
                        info.title || "No Cover"
                      )}`;
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{info.title}</h3>
                    <p className="text-sm text-gray-600">{(info.authors || []).join(", ")}</p>
                    <p className="text-sm mt-2">
                      {info.description
                        ? info.description.slice(0, 200) + (info.description.length > 200 ? "…" : "")
                        : "No description."}
                    </p>

                    <div className="mt-3 flex items-center gap-3 flex-wrap">
                      <a
                        href={info.previewLink || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-medium"
                      >
                        Preview
                      </a>

                      <span className="text-sm text-gray-500">{info.publishedDate || "No date"}</span>

                      {info.pageCount && <span className="text-sm text-gray-500">{info.pageCount} pages</span>}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}


 
