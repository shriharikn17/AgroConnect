"use client"

import React from "react";

const Contact = () => {
  return (
    <section className="p-8 text-center">
      <h2 className="text-3xl font-semibold text-green-700 mb-4">Contact Us</h2>
      <p className="text-gray-600 mb-6">We’d love to hear from you!</p>
      <form className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 outline-none"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 outline-none"
        />
        <textarea
          placeholder="Your Message"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-600 outline-none"
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
