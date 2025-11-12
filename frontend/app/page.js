import Link from "next/link";
import Footer from "./components/footer/page";

export default function Home() {
  return (
    <div className="bg-green-50 text-gray-800">
      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-16 px-6">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-6">
            Empowering Farmers, Connecting Buyers
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            AgroMart is a digital platform designed to simplify agriculture — 
            connecting farmers, distributors, and consumers directly in a single ecosystem.
          </p>
          <div className="space-x-4">
            <Link
              href="/products"
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Explore Products
            </Link>
            <Link
              href="/signup"
              className="border border-green-700 hover:bg-green-700 hover:text-white text-green-700 font-semibold px-6 py-3 rounded-lg transition"
            >
              Join Now
            </Link>
          </div>
        </div>

        {/* Right placeholder for hero image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="w-full max-w-md h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 font-medium">
            Image Placeholder
          </div>
        </div>
      </section>

      {/* 🌾 FEATURES SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-8">
            Why Choose AgroMart?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Direct Farmer Access",
                desc: "Connect directly with farmers and get fresh produce at fair prices.",
              },
              {
                title: "Transparent Marketplace",
                desc: "Full visibility into pricing, sourcing, and logistics — no middlemen.",
              },
              {
                title: "Smart Agriculture",
                desc: "Data-driven insights and tools that help farmers maximize yield sustainably.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-green-50 p-8 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500 font-semibold">
                  Icon
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛒 POPULAR PRODUCTS SECTION */}
      <section className="py-16 bg-green-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-8">
            Popular Products
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {["Organic Wheat", "Fresh Tomatoes", "Natural Honey"].map((product, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col"
              >
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                  Product Image
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {product}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    High-quality produce from trusted local farms.
                  </p>
                  <button className="mt-auto bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚜 FARMER STORIES SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-8">
            Voices from the Field
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-center bg-green-50 p-6 rounded-xl shadow"
              >
                <div className="w-32 h-32 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500 font-medium mb-4 md:mb-0">
                  Farmer Image
                </div>
                <div className="md:ml-6 text-left">
                  <h3 className="text-lg font-semibold text-green-700">
                    Farmer {i}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    “AgroMart helped me reach more buyers and get fair prices for my crops.”
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌍 CTA SECTION */}
      <section className="bg-green-700 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Revolutionize Agriculture?
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Join AgroMart and be part of a smarter, fairer, and more connected agricultural future.
        </p>
        <Link
          href="/signup"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg transition"
        >
          Get Started
        </Link>
      </section>
      <Footer/>
    </div>
  );
}
