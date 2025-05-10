import React, { useState } from 'react';
import '../css/offers.css';

const products = [
  {
    id: 1,
    name: 'Avocado',
    variants: ['70g', '100g'],
    price: 99,
    oldPrice: 165,
    discount: '40%',
    image: '../images/avacado.jpg',
  },
  {
    id: 2,
    name: 'Broccoli',
    variants: ['250g', '500g'],
    price: 60,
    oldPrice: 150,
    discount: '60%',
    image: '../images/brocoli.jpg',
  },
  {
    id: 3,
    name: 'Dragon Fruit',
    variants: ['200g', '500g'],
    price: 64,
    oldPrice: 80,
    discount: '20%',
    image: '../images/dragonfruit.jpg',
  },
  {
    id: 4,
    name: 'Turmeric',
    variants: ['100g', '200g'],
    price: 130,
    oldPrice: 219,
    discount: '40%',
    image: '../images/turmeric.jpg',
  },
  {
    id: 5,
    name: 'Corn',
    variants: ['250g', '1kg'],
    price: 12,
    oldPrice: 50,
    discount: '76%',
    image: '../images/corn.jpg',
  },
  {
    id: 6,
    name: 'Cheese',
    variants: ['250g', '500g'],
    price: 130,
    oldPrice: 230,
    discount: '43%',
    image: '../images/cheese.jpg',
  },
  {
    id: 7,
    name: 'Cauliflower',
    variants: ['500g', '1kg'],
    price: 32,
    oldPrice: 50,
    discount: '36%',
    image: '../images/cauliflower.jpg',
  },
  {
    id: 8,
    name: 'Carrot',
    variants: ['500g', '1kg'],
    price: 12,
    oldPrice: 35,
    discount: '66%',
    image: '../images/carrot.jpg',
  },
  {
    id: 9,
    name: 'Butter',
    variants: ['100g', '500g'],
    price: 100,
    oldPrice: 230,
    discount: '57%',
    image: '../images/butter.jpg',
  },
  {
    id: 10,
    name: 'Eggs',
    variants: ['30 eggs', '50 eggs'],
    price: 100,
    oldPrice: 150,
    discount: '33%',
    image: '../images/eggs.jpg',
  },
  {
    id: 11,
    name: 'Milk',
    variants: ['1L', '2L'],
    price: 30,
    oldPrice: 60,
    discount: '50%',
    image: '../images/milk.jpg',
  },
  {
    id: 12,
    name: 'Ginger',
    variants: ['70g', '100g'],
    price: 30,
    oldPrice: 45,
    discount: '33%',
    image: '../images/ginger.jpg',
  },
];

export default function Offers() {
  const [quantities, setQuantities] = useState({});

  const handleAddToCart = (productId) => {
    // Add to cart logic would go here
    console.log(`Added product ${productId} to cart`);
  };

  const handleVariantChange = (productId, value) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  return (
    <div className="offers-container">
      <div className="promo-banner">
        <span>Free shipping on orders over ₹500</span>
        <span>•</span>
        <span>Extra 10% off on first order</span>
        <span>•</span>
        <span>Incredible Discounts Up to 70%</span>
      </div>

      <header className="offers-header">
        <div className="logo">FreshCart</div>
        <div className="search-container">
          <input type="text" placeholder="Search for products..." className="search-input" />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
        <nav className="nav-links">
          <a href="#account" className="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
            <span>Account</span>
          </a>
          <a href="#support" className="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
            <span>Support</span>
          </a>
          <a href="#cart" className="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <span>Cart</span>
          </a>
        </nav>
      </header>

      <div className="offers-content">
        <h1 className="offers-title">Today's Best Offers</h1>
        <p className="offers-subtitle">Limited time discounts on fresh produce</p>
        
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="discount-badge">{product.discount} OFF</div>
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <h3 className="product-name">{product.name}</h3>
              <select 
                className="variant-select"
                onChange={(e) => handleVariantChange(product.id, e.target.value)}
              >
                {product.variants.map(variant => (
                  <option key={variant} value={variant}>{variant}</option>
                ))}
              </select>
              <div className="price-container">
                <span className="current-price">₹{product.price.toFixed(2)}</span>
                <span className="original-price">₹{product.oldPrice.toFixed(2)}</span>
                <span className="price-save">Save ₹{(product.oldPrice - product.price).toFixed(2)}</span>
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}