"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import "../../../styles/admin/orders.css";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { user } = useAuth();

    const fetchOrders = async () => {
        setLoading(true);
        setError("");
        try {
            // Note: We are using the token from localStorage for the API call
            // because the backend expects it in the Authorization header.
            const token = localStorage.getItem("token");

            console.log("Fetching orders...");
            const res = await fetch("http://127.0.0.1:4004/api/orders/all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                // Try parsing as JSON first, fallback to text
                let errorMessage = `Server Error: ${res.status}`;
                try {
                    const errData = await res.json();
                    errorMessage = errData.message || errorMessage;
                } catch (e) {
                    // If JSON parse fails, try reading text
                    const textError = await res.text();
                    if (textError) errorMessage = textError;
                }
                throw new Error(errorMessage);
            }

            const data = await res.json();
            console.log("Orders fetched successfully:", data);
            setOrders(data);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError(err.message || "Failed to load orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div>
                <div className="loading-spinner">Loading orders...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <div className="error-message">
                    <h3>Error Loading Orders</h3>
                    <p>{error}</p>
                    <button onClick={fetchOrders} className="retry-btn">Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="admin-header">
                <h1>Order Management</h1>
                <button onClick={fetchOrders} className="refresh-btn">
                    Refresh List
                </button>
            </div>

            <div className="orders-table-container">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="no-orders">No orders found.</td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td>#{order.id}</td>
                                    <td>
                                        <div className="customer-info">
                                            <span className="customer-name">{order.user?.username || "Unknown User"}</span>
                                            {/* <span className="customer-id">ID: {order.userId}</span> */}
                                        </div>
                                    </td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <ul className="order-items-list">
                                            {order.items?.map((item) => (
                                                <li key={item.id}>
                                                    {item.product?.name || "Unknown Product"} (x{item.quantity})
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="order-total">₹{order.total?.toFixed(2)}</td>
                                    <td>
                                        <span className={`status-badge ${order.status?.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
