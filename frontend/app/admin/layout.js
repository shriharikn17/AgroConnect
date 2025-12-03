"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "../../styles/admin/globals.css";
import "../../styles/admin/layout.css";
import "../../styles/admin/components.css";

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Allow access to login/signup pages without auth
        if (pathname === "/admin/login" || pathname === "/admin/signup") {
            setAuthorized(true);
            return;
        }

        const role = localStorage.getItem("role");
        if (role !== "ADMIN") {
            router.push("/admin/login");
        } else {
            setAuthorized(true);
        }
    }, [pathname, router]);

    if (!authorized) return null;

    // Render without sidebar for auth pages
    // Render without sidebar for auth pages
    if (pathname === "/admin/login" || pathname === "/admin/signup") {
        return (
            <main style={{
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "var(--admin-bg)"
            }}>
                {children}
            </main>
        );
    }

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="admin-logo">AgroAdmin</div>
                <nav className="admin-nav">
                    <Link
                        href="/admin/orders"
                        className={`admin-nav-link ${pathname.includes('/orders') ? 'active' : ''}`}
                    >
                        Orders
                    </Link>
                    <Link
                        href="/admin/products"
                        className={`admin-nav-link ${pathname.includes('/products') ? 'active' : ''}`}
                    >
                        Products
                    </Link>
                    <Link href="/" className="admin-nav-link">
                        Back to Store
                    </Link>
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("username");
                            localStorage.removeItem("role");
                            router.push("/admin/login");
                        }}
                        className="admin-nav-link"
                        style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", color: "#ef4444" }}
                    >
                        Logout
                    </button>
                </nav>
            </aside>
            <main className="admin-content">
                {children}
            </main>
        </div>
    );
}
