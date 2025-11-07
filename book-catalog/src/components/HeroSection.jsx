import React from "react";

function HeroSection() {
  return (
    <section className="hero p-8 text-center bg-gradient-to-r from-indigo-50 to-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Find the best textbooks for every course
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover recommended textbooks, compare prices, and build your reading
          list in minutes.
        </p>
        <a
          href="#recommended"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
        >
          Browse recommendations
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
