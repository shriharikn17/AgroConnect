"use client";
import "../../../../styles/admin/components.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        brand: "",
        size: "",
        imageUrl: "",
        categoryId: "",
        location: "Warehouse A" // Default
    });

    useEffect(() => {
        // Fetch categories for dropdown
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                    if (data.length > 0) {
                        setFormData(prev => ({ ...prev, categoryId: data[0].id }));
                    }
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        // Basic validation
        if (!formData.name || !formData.price || !formData.categoryId) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Product created successfully!");
                router.push("/admin/products");
            } else {
                const errorData = await res.json();
                alert(`Failed to create product: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error creating product:", error);
            alert("An error occurred");
        }
    };

    return (
        <div>
            <div className="admin-header">
                <h1 className="admin-title">Add New Product</h1>
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Product Name *</label>
                    <input
                        type="text"
                        name="name"
                        className="form-input"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-textarea"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                        <label className="form-label">Price (₹) *</label>
                        <input
                            type="number"
                            name="price"
                            className="form-input"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Stock *</label>
                        <input
                            type="number"
                            name="stock"
                            className="form-input"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                        <label className="form-label">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            className="form-input"
                            value={formData.brand}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Size</label>
                        <input
                            type="text"
                            name="size"
                            className="form-input"
                            value={formData.size}
                            onChange={handleChange}
                            placeholder="e.g. 500ml, 1kg"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                        name="categoryId"
                        className="form-select"
                        value={formData.categoryId}
                        onChange={handleChange}
                    >
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        className="form-input"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="/products/pesticide.png"
                    />
                    <small style={{ color: "#6b7280", marginTop: "0.25rem", display: "block" }}>
                        Use generic images: /products/pesticide.png, /products/fertilizer.png, /products/seeds.png
                    </small>
                </div>

                <div className="form-actions">
                    <button type="button" className="admin-btn admin-btn-danger" onClick={() => router.back()}>Cancel</button>
                    <button type="submit" className="admin-btn">Create Product</button>
                </div>
            </form>
        </div>
    );
}
