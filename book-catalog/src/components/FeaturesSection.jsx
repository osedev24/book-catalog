import React from "react";

export default function FeaturesSection() {
  return (
    <section id="features" className="p-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Why BookCatalog?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg text-center">
            <h3 className="font-semibold mb-2">Curated Recommendations</h3>
            <p className="text-sm text-gray-600">
              Expert-picked textbooks for major courses so you get the right
              book fast.
            </p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <h3 className="font-semibold mb-2">Compare Prices</h3>
            <p className="text-sm text-gray-600">
              Quickly compare prices and find the best deals from multiple
              sellers.
            </p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <h3 className="font-semibold mb-2">Build Your List</h3>
            <p className="text-sm text-gray-600">
              Save books to your reading list and keep track of what you need
              for each semester.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
