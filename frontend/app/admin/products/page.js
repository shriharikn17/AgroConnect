"use client";
import React, { useEffect, useState } from "react";
import "../../../styles/admin/components.css";
import Link from "next/link";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            // Fetch all products (pagination might be needed later, but for now fetch all)
            const res = await fetch("http://127.0.0.1:4004/api/products?limit=1000");
            if (res.ok) {
                const data = await res.json();
                // Handle both array and object response formats
                setProducts(Array.isArray(data) ? data : data.products || []);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://127.0.0.1:4004/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                alert("Product deleted successfully");
                fetchProducts(); // Refresh list
            } else {
                alert("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    if (loading) return <div>Loading products...</div>;

    return (
        <div>
            <div className="admin-header">
                <h1 className="admin-title">Products</h1>
                <Link href="/admin/products/add" className="admin-btn">
                    + Add Product
                </Link>
            </div>

            <div className="orders-table-container">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="no-orders">No products found.</td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td>#{product.id}</td>
                                    <td>
                                        <img
                                            src={product.imageUrl || "/placeholder.png"}
                                            alt={product.name}
                                            style={{ width: "40px", height: "40px", objectFit: "contain", borderRadius: "4px" }}
                                            onError={(e) => { e.target.src = "/placeholder.png"; }}
                                        />
                                    </td>
                                    <td className="customer-name">{product.name}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <span className="status-badge pending" style={{ backgroundColor: "#e0f2fe", color: "#0369a1" }}>
                                            {product.category?.name}
                                        </span>
                                    </td>
                                    <td className="order-total">₹{product.price}</td>
                                    <td>
                                        <span style={{ color: product.stock < 10 ? "#ef4444" : "inherit", fontWeight: product.stock < 10 ? "bold" : "normal" }}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: "flex", gap: "0.5rem" }}>
                                            <Link href={`/admin/products/edit/${product.id}`} className="refresh-btn" style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", textDecoration: "none" }}>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="refresh-btn"
                                                style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", backgroundColor: "#ef4444" }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
