import React, { useState } from 'react';
import '../css/cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Organic Apples',
      price: 120,
      quantity: 2,
      image: '../images/apples.jpg',
      discount: '20%',
      oldPrice: 150
    },
    {
      id: 2,
      name: 'Fresh Milk',
      price: 60,
      quantity: 1,
      image: '../images/milk.jpg',
      discount: '14%',
      oldPrice: 70
    },
    {
      id: 3,
      name: 'Multigrain Bread',
      price: 45,
      quantity: 3,
      image: '../images/bread.jpg',
      discount: '10%',
      oldPrice: 50
    }
  ]);

  const deliveryFee = 40;
  const discount = 35;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee - discount;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="cart-container">
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
            <span>Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})</span>
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="cart-content">
        <div className="cart-items-section">
          <h2 className="section-title">Your Cart ({cartItems.length})</h2>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#ccc" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
              </svg>
              <h3>Your cart is empty</h3>
              <p>Start shopping to add items to your cart</p>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <div className="price-info">
                        <span className="current-price">₹{item.price}</span>
                        {item.oldPrice && (
                          <span className="original-price">₹{item.oldPrice}</span>
                        )}
                        {item.discount && (
                          <span className="discount-badge">{item.discount} OFF</span>
                        )}
                      </div>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="remove-btn"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff4444" viewBox="0 0 16 16">
                          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                      </button>
                      <div className="item-total">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-actions">
                <button className="continue-shopping-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                  </svg>
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="order-summary">
            <h2 className="section-title">Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-row discount">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
            <div className="payment-options">
              <img src="../images/payment-options.png" alt="Accepted payment methods" />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="cart-footer">
        {/* Same footer as in other components */}
      </footer>
    </div>
  );
};

export default Cart;