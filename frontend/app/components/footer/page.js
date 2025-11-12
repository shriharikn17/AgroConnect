"use client"


import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white text-center py-4 mt-12">
      <p>© {new Date().getFullYear()} AgroMart. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
