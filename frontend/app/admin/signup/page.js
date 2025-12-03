"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../../styles/admin/auth.css";

export default function AdminSignup() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://127.0.0.1:4004/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, role: "ADMIN" }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Admin account created! Please login.");
                router.push("/admin/login");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred during signup.");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--admin-bg)", padding: "1rem" }}>
            <div className="admin-auth-card">
                <h1 className="admin-title" style={{ textAlign: "center", marginBottom: "2rem" }}>Create Admin</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-input"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="admin-btn" style={{ width: "100%", marginTop: "1rem" }}>
                        Sign Up as Admin
                    </button>
                </form>
                <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.9rem" }}>
                    <Link href="/admin/login" style={{ color: "var(--color-primary)", textDecoration: "none" }}>
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
