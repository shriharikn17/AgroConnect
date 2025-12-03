"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "../../components/footer/page";
import "../../../styles/OrderConfirmation.css";

export default function OrderConfirmation() {
    const { id } = useParams();
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
                return;
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setOrder(data);
                } else {
                    const errorText = await res.text();
                    console.error("Failed to fetch order:", res.status, errorText);
                    setError(`Failed to load order details. Status: ${res.status}`);
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Something went wrong. Check console for details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id, router]);

    if (loading) return <div className="confirmation-container"><div className="confirmation-section loading-text">Loading...</div></div>;
    if (error) return <div className="confirmation-container"><div className="confirmation-section error-text">{error}</div></div>;
    if (!order) return null;

    return (
        <div className="confirmation-container">
            <section className="confirmation-section">
                <div className="confirmation-header">
                    <div className="success-icon">
                        <span>✅</span>
                    </div>
                    <h1 className="confirmation-title">Thank You!</h1>
                    <p className="confirmation-message">Your order has been placed successfully.</p>
                    <p className="order-id">Order ID: #{order.id}</p>
                </div>

                <div className="receipt-card">
                    <h2 className="receipt-title">Order Receipt</h2>

                    <div className="receipt-items">
                        {order.items.map((item) => (
                            <div key={item.id} className="receipt-item">
                                <div className="item-info">
                                    <div className="item-name">{item.product.name}</div>
                                    <div className="item-qty">Qty: {item.quantity}</div>
                                </div>
                                <span className="item-price">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="receipt-total">
                        <span>Total Paid</span>
                        <span>₹{order.total.toFixed(2)}</span>
                    </div>

                    <div className="confirmation-actions">
                        <Link href="/products" className="continue-btn">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
