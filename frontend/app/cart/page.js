"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import Footer from "../components/footer/page";
import "../../styles/Cart.css";

export default function Cart() {
    const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
    const router = useRouter();

    const handleCheckout = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login?redirect=/checkout");
        } else {
            router.push("/checkout");
        }
    };

    return (
        <div className="cart-container">
            <section className="cart-section">
                <h1 className="cart-title">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <h2>Your cart is empty</h2>
                        <Link href="/products" className="continue-shopping-btn">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items">
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item">
                                    {/* Placeholder image if imageUrl is missing */}
                                    <img
                                        src={item.imageUrl || "https://via.placeholder.com/100"}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />

                                    <div className="cart-item-details">
                                        <h3 className="cart-item-name">{item.name}</h3>
                                        <p className="cart-item-brand">{item.brand} • {item.size}</p>
                                        <p className="cart-item-price">₹{item.price}</p>
                                    </div>

                                    <div className="cart-item-actions">
                                        <div className="quantity-controls">
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="qty-value">{item.quantity}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h2 className="summary-title">Order Summary</h2>
                            <div className="summary-row">
                                <span>Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <button onClick={handleCheckout} className="checkout-btn">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
}
