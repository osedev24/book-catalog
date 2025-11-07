import React from "react";

export default function ContactSection() {
  return (
    <section id="contact" className="p-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
        <p className="text-gray-600 mb-4">
          Have questions, feedback, or suggestions? Send us a message and we'll
          get back to you.
        </p>

        <form className="grid grid-cols-1 gap-3">
          <input
            type="text"
            placeholder="Your name"
            className="border rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="Your email"
            className="border rounded px-3 py-2"
          />
          <textarea
            placeholder="Message"
            rows="5"
            className="border rounded px-3 py-2"
          />
          <div>
            <button
              type="button"
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
