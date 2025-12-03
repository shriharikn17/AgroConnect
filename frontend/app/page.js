"use client";
import Link from "next/link";
import Image from "next/image";
import Footer from "./components/footer/page";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import "../styles/Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  const brands = ["Bayer", "Syngenta", "FMC", "IFFCO", "IPL", "Mahadhan", "Nuziveedu", "BASF", "Corteva", "UPL", "Adama"];

  const getBrandColor = (brand) => {
    const colors = {
      "Bayer": "#1f82c0",
      "Syngenta": "#60a543",
      "FMC": "#da291c",
      "IFFCO": "#00a651",
      "IPL": "#f58220",
      "Mahadhan": "#d4a000",
      "Nuziveedu": "#009640",
      "Advanta": "#ed1c24",
      "Monsanto": "#e3a200",
      "Corteva": "#003087",
      "UPL": "#f15d22",
      "Adama": "#85004b",
      "BASF": "#00477e"
    };
    return colors[brand] || "#666";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:4004/api/products");
        const data = await res.json();

        let productsList = [];
        if (Array.isArray(data)) {
          productsList = data;
        } else if (data.products && Array.isArray(data.products)) {
          productsList = data.products;
        }

        // Limit to 8 products for the landing page
        setProducts(productsList.slice(0, 8));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Image
          src="/hero.png"
          alt="AgroConnect Hero"
          fill
          className="hero-image"
          priority
        />
        <div className="hero-content">
          <div className="hero-card">
            <h1 className="hero-title">
              Protect Your Yield
            </h1>
            <p className="hero-description">
              Premium pesticides and fertilizers for a bountiful harvest.
              Get the best deals on top brands.
            </p>
            <div className="hero-offer">
              Special Offer: Flat 20% OFF on Bulk Orders!
            </div>
            <div className="hero-cta">
              <Link
                href="/products"
                className="hero-btn"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands-section">
        <div className="section-container">
          <h2 className="section-title">
            Trusted Brands
          </h2>
          <div className="brands-grid">
            {brands.map((brand, i) => (
              <span key={i} className="brand-item">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2 className="products-title">
          Featured Pesticides & Chemicals
        </h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.name}
                  className="product-img"
                  onError={(e) => { e.target.src = "/placeholder.png"; }}
                />
                <div className="product-label-overlay">
                  <span className="label-brand" style={{ color: getBrandColor(product.brand) }}>{product.brand}</span>
                  <span className="label-name">{product.name}</span>
                  <span className="label-size">{product.size}</span>
                </div>
              </div>
              <div className="product-info">
                <div>
                  <h3 className="product-name">{product.name}</h3>
                  {product.size && (
                    <p className="product-size">Size: {product.size}</p>
                  )}
                </div>
                <div>
                  <p className="product-price">₹{product.price}</p>
                  <button
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        window.location.href = "/login";
                      } else {
                        addToCart(product);
                      }
                    }}
                    className="add-to-cart-btn"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link href="/products" className="view-all-link">
            View All Products →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
