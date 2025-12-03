"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import Footer from "../components/footer/page";
import "../../styles/Profile.css";

export default function Profile() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) return <div>Loading...</div>;
    if (!user) return null;

    if (!user) return null;

    return (
        <div className="profile-container">
            <section className="profile-section">
                <h1 className="profile-title">My Profile</h1>

                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="profile-info">
                            <h2>{user.username}</h2>
                            <p>Member since 2024</p>
                            <p className="profile-role" style={{ fontSize: "0.9rem", color: "#6b7280", marginTop: "0.25rem" }}>
                                Role: <strong>{user.role}</strong>
                            </p>
                        </div>
                    </div>

                    <div className="profile-content">
                        <div className="profile-actions-grid">
                            {user.role === "ADMIN" ? (
                                <Link href="/admin" className="profile-action-card" style={{ backgroundColor: "#f3f4f6", border: "1px solid #d1d5db" }}>
                                    <h3 style={{ color: "#1f2937" }}>Admin Dashboard</h3>
                                    <p style={{ color: "#4b5563" }}>Manage products and orders</p>
                                </Link>
                            ) : (
                                <Link href="/orders" className="profile-action-card">
                                    <h3>My Orders</h3>
                                    <p>View your order history and status</p>
                                </Link>
                            )}

                            <div className="profile-action-card disabled">
                                <h3>Account Settings</h3>
                                <p>Coming soon...</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Access Section (Only for non-admins to login/signup) */}
                {user.role !== "ADMIN" && (
                    <div className="profile-card" style={{ marginTop: "2rem" }}>
                        <div className="profile-header">
                            <div className="profile-info">
                                <h2>Admin Access</h2>
                                <p>For store owners and managers</p>
                            </div>
                        </div>

                        <div className="profile-actions">
                            <Link href="/admin/login" className="profile-action-card">
                                <h3>Login as Admin</h3>
                                <p>Access the owner dashboard</p>
                            </Link>
                            <Link href="/admin/signup" className="profile-action-card">
                                <h3>Create Admin Account</h3>
                                <p>Sign up as a new store owner</p>
                            </Link>
                        </div>
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
}
