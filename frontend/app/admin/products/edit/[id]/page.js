"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import "../../../../../styles/admin/components.css"; // Import styles

export default function EditProduct({ params }) {
    const router = useRouter();
    const { id } = use(params); // Unwrap params using React.use()
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        brand: "",
        size: "",
        imageUrl: "",
        categoryId: "",
        location: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories
                const catRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
                if (catRes.ok) {
                    setCategories(await catRes.json());
                }

                // Fetch product details
                const prodRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
                if (prodRes.ok) {
                    const product = await prodRes.json();
                    setFormData({
                        name: product.name,
                        description: product.description || "",
                        price: product.price,
                        stock: product.stock,
                        brand: product.brand || "",
                        size: product.size || "",
                        imageUrl: product.imageUrl || "",
                        categoryId: product.categoryId,
                        location: product.location || ""
                    });
                } else {
                    alert("Product not found");
                    router.push("/admin/products");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Product updated successfully!");
                router.push("/admin/products");
            } else {
                const errorData = await res.json();
                alert(`Failed to update product: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("An error occurred");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="admin-header">
                <h1 className="admin-title">Edit Product</h1>
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
                    />
                </div>

                <div className="form-actions">
                    <button type="button" className="admin-btn admin-btn-danger" onClick={() => router.back()}>Cancel</button>
                    <button type="submit" className="admin-btn">Update Product</button>
                </div>
            </form>
        </div>
    );
}
