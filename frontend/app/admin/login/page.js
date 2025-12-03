"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import "../../../styles/admin/auth.css";

export default function AdminLogin() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://127.0.0.1:4004/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                if (data.user.role === "ADMIN") {
                    login(data.token, data.user.username, data.user.role);
                    router.push("/admin");
                } else {
                    alert("Access Denied: You are not an Admin.");
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login.");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--admin-bg)", padding: "1rem" }}>
            <div className="admin-auth-card">
                <h1 className="admin-title" style={{ textAlign: "center", marginBottom: "2rem" }}>Admin Login</h1>
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
                        Login to Dashboard
                    </button>
                </form>
                <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.9rem" }}>
                    <Link href="/admin/signup" style={{ color: "var(--color-primary)", textDecoration: "none" }}>
                        Create Admin Account
                    </Link>
                </div>
                <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.9rem" }}>
                    <Link href="/" style={{ color: "#6b7280", textDecoration: "none" }}>
                        Back to Store
                    </Link>
                </div>
            </div>
        </div>
    );
}
