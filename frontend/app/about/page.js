"use client";
import React from "react";
import Footer from "../components/footer/page";
import "../../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <div>
          <h1>Cultivating the Future</h1>
          <p>Empowering farmers with quality inputs and modern solutions.</p>
        </div>
      </div>

      <div className="about-content">
        {/* Our Story */}
        <section className="about-section">
          <div className="story-grid">
            <div className="story-text">
              <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>Our Story</h2>
              <p>
                Sree Maruti Agro Kendra started as a humble physical retail shop dedicated to serving the local farming community. We understood the challenges farmers faced—limited access to quality inputs, lack of transparent pricing, and the struggle to find specific products nearby.
              </p>
              <p>
                Recognizing the need for a modern solution, we launched <strong>AgroConnect</strong>. Our mission was simple: to bring our business online and bridge the gap between quality agricultural products and the farmers who need them.
              </p>
              <p>
                Today, we are proud to offer a comprehensive e-commerce platform that not only simplifies inventory management for us but, more importantly, provides farmers with easy access to a wide range of pesticides, fertilizers, and seeds from the comfort of their homes.
              </p>
            </div>
            <div className="story-image">
              <img
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1771&auto=format&fit=crop"
                alt="Farmer in field"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="stats-container">
          <div className="stat-item">
            <h4>15+</h4>
            <p>Years of Experience</p>
          </div>
          <div className="stat-item">
            <h4>5000+</h4>
            <p>Happy Farmers</p>
          </div>
          <div className="stat-item">
            <h4>50+</h4>
            <p>Premium Brands</p>
          </div>
          <div className="stat-item">
            <h4>100%</h4>
            <p>Quality Guarantee</p>
          </div>
        </div>

        {/* Mission & Values */}
        <section className="about-section">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="card-icon">🌱</div>
              <h3>Premium Quality</h3>
              <p>We source only the best products from trusted global brands like Bayer, Syngenta, and FMC to ensure your crops get the best care.</p>
            </div>
            <div className="mission-card">
              <div className="card-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Get your agricultural inputs delivered right to your doorstep with our efficient logistics network.</p>
            </div>
            <div className="mission-card">
              <div className="card-icon">💡</div>
              <h3>Expert Advice</h3>
              <p>Our team of agricultural experts is always ready to guide you in choosing the right products for your specific needs.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
