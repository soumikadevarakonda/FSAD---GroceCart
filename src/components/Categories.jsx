import React, { useState } from 'react';
import '../css/categories.css';

const categories = [
  {
    id: 1,
    name: 'Fruits & Vegetables',
    subcategories: ['Fresh Fruits', 'Fresh Vegetables', 'Exotic Fruits & Veggies', 'Herbs & Seasonings'],
    image: '../images/1.jpg'
  },
  {
    id: 2,
    name: 'Dairy & Eggs',
    subcategories: ['Milk', 'Cheese', 'Yogurt', 'Butter & Margarine', 'Eggs'],
    image: '../images/3.jpg'
  },
  {
    id: 3,
    name: 'Meat & Seafood',
    subcategories: ['Chicken', 'Mutton', 'Fish', 'Prawns & Shrimp', 'Ready-to-Cook'],
    image: '../images/5.jpg'
  },
  {
    id: 4,
    name: 'Bakery',
    subcategories: ['Bread', 'Buns & Rolls', 'Cakes', 'Cookies', 'Breakfast Cereals'],
    image: '../images/2.jpg'
  },
  {
    id: 5,
    name: 'Beverages',
    subcategories: ['Tea & Coffee', 'Juices', 'Soft Drinks', 'Energy Drinks', 'Health Drinks'],
    image: '../images/beverages.jpg'
  },
  {
    id: 6,
    name: 'Snacks',
    subcategories: ['Chips & Crisps', 'Biscuits & Cookies', 'Nuts & Seeds', 'Chocolates', 'Ready-to-Eat'],
    image: '../images/snacks.jpg'
  },
];

const featuredProducts = [
  {
    id: 1,
    name: 'Organic Apples',
    price: 120,
    oldPrice: 150,
    discount: '20%',
    image: '../images/apples.jpg',
    category: 'Fruits & Vegetables'
  },
  {
    id: 2,
    name: 'Fresh Milk',
    price: 60,
    oldPrice: 70,
    discount: '14%',
    image: '../images/milk.jpg',
    category: 'Dairy & Eggs'
  },
  {
    id: 3,
    name: 'Whole Chicken',
    price: 220,
    oldPrice: 250,
    discount: '12%',
    image: '../images/chicken.jpg',
    category: 'Meat & Seafood'
  },
  {
    id: 4,
    name: 'Multigrain Bread',
    price: 45,
    oldPrice: 50,
    discount: '10%',
    image: '../images/bread.jpg',
    category: 'Bakery'
  },
];

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="categories-container">
      {/* Promo Banner */}
      <div className="promo-banner">
        <span>Free shipping on orders over ₹500</span>
        <span>•</span>
        <span>Extra 10% off on first order</span>
        <span>•</span>
        <span>Incredible Discounts Up to 60%</span>
      </div>

      <header className="offers-header">
        <div className="logo">GroceCart</div>
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
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
            </svg>
            <span>Cart</span>
          </a>
        </nav>
      </header>

      {/* Mobile Filter Toggle */}
      <button 
        className="mobile-filter-toggle"
        onClick={() => setShowMobileFilters(!showMobileFilters)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
        </svg>
        {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Main Content */}
      <div className="categories-content">
        {/* Left Navigation Panel */}
        <aside className={`categories-sidebar ${showMobileFilters ? 'mobile-visible' : ''}`}>
          <h3 className="sidebar-title">Categories</h3>
          <ul className="category-list">
            {categories.map(category => (
              <li 
                key={category.id}
                className={`category-item ${activeCategory.id === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category.name}
                <span className="category-count">{category.subcategories.length}</span>
              </li>
            ))}
          </ul>

          <div className="filter-section">
            <h4 className="filter-title">Filters</h4>
            <div className="filter-group">
              <h5>Price Range</h5>
              <div className="price-range">
                <input type="range" min="0" max="1000" step="50" className="price-slider" />
                <div className="price-values">
                  <span>₹0</span>
                  <span>₹1000</span>
                </div>
              </div>
            </div>
            <div className="filter-group">
              <h5>Discount</h5>
              <div className="discount-options">
                <label>
                  <input type="checkbox" name="discount" value="10" />
                  <span>10% & above</span>
                </label>
                <label>
                  <input type="checkbox" name="discount" value="20" />
                  <span>20% & above</span>
                </label>
                <label>
                  <input type="checkbox" name="discount" value="30" />
                  <span>30% & above</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="category-main">
          {/* Category Banner */}
          <div className="category-banner">
            <img src={activeCategory.image} alt={activeCategory.name} />
            <div className="banner-overlay">
              <h2>{activeCategory.name}</h2>
              <p>Fresh and high quality products</p>
            </div>
          </div>

          {/* Subcategories */}
          <div className="subcategories-section">
            <h3 className="section-title">Shop by Subcategory</h3>
            <div className="subcategory-grid">
              {activeCategory.subcategories.map((subcategory, index) => (
                <div key={index} className="subcategory-card">
                  <div className="subcategory-icon">
                    {index % 4 === 0 ? '🍎' : 
                     index % 4 === 1 ? '🥛' : 
                     index % 4 === 2 ? '🍞' : '🥤'}
                  </div>
                  <h4>{subcategory}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Products */}
          <div className="featured-products-section">
            <h3 className="section-title">Featured Products</h3>
            <div className="product-grid">
              {featuredProducts
                .filter(product => product.category === activeCategory.name)
                .map(product => (
                  <div key={product.id} className="product-card">
                    <div className="discount-badge">{product.discount} OFF</div>
                    <div className="product-image-container">
                      <img src={product.image} alt={product.name} className="product-image" />
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="price-container">
                      <span className="current-price">₹{product.price.toFixed(2)}</span>
                      <span className="original-price">₹{product.oldPrice.toFixed(2)}</span>
                      <span className="price-save">Save ₹{(product.oldPrice - product.price).toFixed(2)}</span>
                    </div>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="categories-footer">
        {/* Same footer as in Offers component */}
      </footer>
    </div>
  );
}