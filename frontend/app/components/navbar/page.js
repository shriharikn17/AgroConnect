"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return Boolean(localStorage.getItem("token"));
    }
    return false;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="bg-green-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          AgroMart
        </Link>

        <div className="space-x-6 flex items-center">
          <Link href="/" className="hover:text-yellow-300">Home</Link>
          <Link href="/products" className="hover:text-yellow-300">Products</Link>
          <Link href="/about" className="hover:text-yellow-300">About</Link>
          <Link href="/contact" className="hover:text-yellow-300">Contact</Link>

          {!isLoggedIn ? (
            <Link
              href="/login"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-md"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-white"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
