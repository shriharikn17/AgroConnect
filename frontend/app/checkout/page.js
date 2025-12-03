"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import Footer from "../components/footer/page";
import "../../styles/Checkout.css";

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        city: "",
        zipCode: "",
        phone: "",
    });

    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login?redirect=/checkout");
        }
        if (cart.length === 0 && !orderPlaced) {
            router.push("/cart");
        }
    }, [cart, router, orderPlaced]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            const orderItems = cart.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
            }));

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    items: orderItems,
                    total: cartTotal,
                    shippingDetails: formData, // Note: Backend might need update to store this
                }),
            });

            const data = await res.json();

            console.log("Order creation response:", res.status, data);

            if (res.ok) {
                setOrderPlaced(true);
                clearCart();
                // Redirect to order confirmation page
                router.push(`/order-confirmation/${data.id}`);
            } else {
                setError(data.message || "Failed to place order");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) return null;

    return (
        <div className="checkout-container">
            <section className="checkout-section">
                <h1 className="checkout-title">Checkout</h1>

                <div className="checkout-content">
                    <div className="checkout-form-card">
                        <h2 className="form-section-title">Shipping Details</h2>
                        <form onSubmit={handleSubmit} className="checkout-form">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">ZIP Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="place-order-btn"
                                disabled={loading}
                            >
                                {loading ? "Placing Order..." : `Pay ₹${cartTotal.toFixed(2)}`}
                            </button>
                        </form>
                        {error && <div className="message-error">{error}</div>}
                    </div>

                    <div className="order-summary-card">
                        <h2 className="summary-title">Order Summary</h2>
                        <div className="summary-items">
                            {cart.map((item) => (
                                <div key={item.id} className="summary-item">
                                    <span className="summary-item-name">
                                        {item.quantity}x {item.name}
                                    </span>
                                    <span className="summary-item-price">
                                        ₹{(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
