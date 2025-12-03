"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "../components/footer/page";
import "../../styles/Orders.css";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
                return;
            }

            try {
                console.log("Fetching orders for user...");
                const res = await fetch("http://127.0.0.1:4004/api/orders/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Orders response status:", res.status);
                if (res.ok) {
                    const data = await res.json();
                    console.log("Orders data:", data);
                    setOrders(data);
                } else {
                    console.error("Failed to fetch orders");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [router]);

    return (
        <div className="orders-container">
            <section className="orders-section">
                <h1 className="orders-title">My Orders</h1>

                {loading ? (
                    <div className="loading-text">Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div className="empty-state">
                        <h2>You haven't placed any orders yet.</h2>
                        <Link href="/products" className="start-shopping-btn">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <div className="order-info">
                                        <h3>Order #{order.id}</h3>
                                        <p className="order-date">
                                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="order-status-price">
                                        <span className="order-price">₹{order.total.toFixed(2)}</span>
                                        <span className={`status-badge ${order.status === 'PENDING' ? 'status-pending' :
                                            order.status === 'COMPLETED' ? 'status-completed' :
                                                'status-cancelled'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="order-items">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="order-item">
                                            <div className="item-details">
                                                <span className="item-name">{item.product.name}</span>
                                                <span className="item-qty">x{item.quantity}</span>
                                            </div>
                                            <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
}
