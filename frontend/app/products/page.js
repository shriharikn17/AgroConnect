"use client"

import React from "react";

const Products = () => {
  const items = [
    { id: 1, name: "Organic Wheat", price: "₹40/kg" },
    { id: 2, name: "Fresh Tomatoes", price: "₹30/kg" },
    { id: 3, name: "Pesticide-free Rice", price: "₹50/kg" },
  ];

  return (
    <section className="p-8">
      <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">
        Our Products
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-green-700">{item.name}</h3>
            <p className="text-gray-600 mt-2">{item.price}</p>
            <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
