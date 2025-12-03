

"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import "../../styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Filter States
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Pagination States
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 24;

  // Options (Hardcoded for now, could be fetched from API)
  const categories = ["Pesticides", "Seeds", "Fertilizers"];
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

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("page", page);
        queryParams.append("limit", limit);
        if (search) queryParams.append("search", search);
        if (sort) queryParams.append("sort", sort);
        if (selectedCategories.length > 0) queryParams.append("category", selectedCategories.join(","));
        if (selectedBrands.length > 0) queryParams.append("brand", selectedBrands.join(","));
        if (minPrice) queryParams.append("minPrice", minPrice);
        if (maxPrice) queryParams.append("maxPrice", maxPrice);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?${queryParams.toString()}`);
        const data = await res.json();

        // Handle both old (array) and new (object) API response formats temporarily
        if (Array.isArray(data)) {
          setProducts(data);
          setTotalPages(1);
        } else {
          setProducts(data.products);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 500); // Debounce

    return () => clearTimeout(timeoutId);
  }, [search, sort, selectedCategories, selectedBrands, minPrice, maxPrice, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, sort, selectedCategories, selectedBrands, minPrice, maxPrice]);

  return (
    <div className="products-page-container">
      <h1 className="page-title">All Products</h1>

      <div className="products-layout">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3 className="filter-title">Categories</h3>
            <div className="filter-group">
              {categories.map((cat) => (
                <label key={cat} className="filter-label">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Brands</h3>
            <div className="filter-group">
              {brands.map((b) => (
                <label key={b} className="filter-label">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => handleBrandChange(b)}
                  />
                  {b}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Price Range</h3>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="price-input"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="price-input"
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="products-main">
          {/* Top Controls */}
          <div className="controls-container">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="sort-select"
            >
              <option value="">Sort By</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
              <option value="brand">Brand: A-Z</option>
            </select>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="loading-text">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="no-products-text">No products found matching your filters.</div>
          ) : (
            <>
              <div className="products-grid-full">
                {products.map((product) => (
                  <div key={product.id} className="product-card-full">
                    <div className="product-image-full">
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
                    <div className="product-info-full">
                      <h3 className="product-name-full">{product.name}</h3>
                      <p className="product-desc-full">{product.description}</p>
                      {product.size && <p className="product-size">Size: {product.size}</p>}
                      <div className="product-footer-full">
                        <span className="product-price-full">₹{product.price}</span>
                        <button
                          onClick={() => {
                            const token = localStorage.getItem("token");
                            if (!token) {
                              window.location.href = "/login";
                            } else {
                              addToCart(product);
                            }
                          }}
                          className="add-btn-small"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="pagination-controls">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className="pagination-btn"
                  >
                    Previous
                  </button>
                  <span className="page-info">Page {page} of {totalPages}</span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
