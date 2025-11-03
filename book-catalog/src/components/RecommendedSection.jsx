import React from "react";
import books from "./data/books";
import RecommendedTextbook from "./RecommendedTextbook";

function RecommendedSection() {
  return (
    <section id="recommended" className="recommended p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Recommended Textbooks</h2>
        <p className="text-gray-600 mb-6">
          Hand-picked books for popular courses.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {books.map((b) => (
            <RecommendedTextbook key={b.id} book={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecommendedSection;
