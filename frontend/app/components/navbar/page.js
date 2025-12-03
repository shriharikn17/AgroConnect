"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import "../../../styles/Navbar.css";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const { cart } = useCart();
  // No need for local useEffect to check token, AuthContext handles it.
  const isLoggedIn = !!user;
  const username = user?.username || "";

  const handleLogout = () => {
    logout();
    // No need to reload, context updates state
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          AgroConnect
        </Link>
        <div className="navbar-links">
          <Link href="/products" className="navbar-link">
            Products
          </Link>
          <Link href="/about" className="navbar-link">
            About
          </Link>
          <Link href="/contact" className="navbar-link">
            Contact
          </Link>
        </div>
        <div className="navbar-auth">
          <Link href="/cart" className="cart-icon-container">
            <span className="cart-icon">🛒</span>
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </Link>

          {isLoggedIn ? (
            <div className="user-menu" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
              <span className="user-greeting">Hi, {username} ▼</span>
              {showDropdown && (
                <div className="user-dropdown">
                  <Link href="/profile" className="dropdown-item">My Profile</Link>
                  <Link href="/orders" className="dropdown-item">Orders</Link>
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="navbar-btn login-btn">
                Login
              </Link>
              <Link href="/signup" className="navbar-btn signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
