import React, { Component } from 'react';
import '../CSS/ProjectHomePage.css';
import { BASEURL, callApi, setSession } from '../api';

// Add this at the top of your file
const usdToInr = (usd) => {
  const conversionRate = 83;
  return Math.round(usd * conversionRate);
};

export class ProjectHomePage extends Component {
  constructor() {
    super();
    this.userRegistration = this.userRegistration.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.signin = this.signin.bind(this);
  }

  showSignin() {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signIn");
    let signup = document.getElementById("signup");
    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Welcome Back";
    signin.style.display = "block";
    signup.style.display = "none";
    popup.style.display = "block";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }

  showSignup() {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signIn");
    let signup = document.getElementById("signup");
    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Create Account";
    signin.style.display = "none";
    signup.style.display = "block";
    popup.style.display = "block";
    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("role").value = "";
    document.getElementById("signuppassword").value = "";
    document.getElementById("confirmpassword").value = "";
  }

  closeSignin(event) {
    if (event.target.id === "popup") {
      document.getElementById("popup").style.display = "none";
    }
  }

  userRegistration() {
    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const role = document.getElementById("role");
    const signuppassword = document.getElementById("signuppassword");
    const confirmpassword = document.getElementById("confirmpassword");

    [fullname, email, role, signuppassword, confirmpassword].forEach(el => el.style.border = "");

    if ([fullname, email, role, signuppassword, confirmpassword].some(el => el.value === "")) {
      [fullname, email, role, signuppassword, confirmpassword].forEach(el => {
        if (el.value === "") el.style.border = "1px solid #ff4444";
      });
      return;
    }
    if (signuppassword.value !== confirmpassword.value) {
      signuppassword.style.border = "1px solid #ff4444";
      confirmpassword.style.border = "1px solid #ff4444";
      return;
    }

    const data = JSON.stringify({
      fullname: fullname.value,
      email: email.value,
      role: role.value,
      password: signuppassword.value
    });

    callApi("POST", BASEURL + "users/signup", data, this.getResponse);
  }

  getResponse(res) {
    const [status, message] = res.split('::');
    alert(message);
    if (status === "200") {
      document.getElementById("signIn").style.display = "block";
      document.getElementById("signup").style.display = "none";
      document.getElementById("popupHeader").innerHTML = "Welcome Back";
    }
  }
  
  forgotPassword() {
    const username = document.getElementById("username");
    username.style.border = "";
    if (username.value === "") {
      username.style.border = "1px solid #ff4444";
      return;
    }
    callApi("GET", `${BASEURL}users/forgotpassword/${username.value}`, "", this.forgotPasswordResponse);
  }

  forgotPasswordResponse(res) {
    const [status, message] = res.split('::');
    const responseDiv = document.getElementById("responseDiv");
    responseDiv.innerHTML = `<br/><br/><label style='color:${status === "200" ? "#00C851" : "#ff4444"}'>${message}</label>`;
  }

  signin() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const responseDiv = document.getElementById("responseDiv");

    [username, password].forEach(el => el.style.border = "");
    responseDiv.innerHTML = "";

    if (username.value === "") {
      username.style.border = "1px solid #ff4444";
      return;
    }
    if (password.value === "") {
      password.style.border = "1px solid #ff4444";
      return;
    }

    const data = JSON.stringify({
      email: username.value,
      password: password.value
    });

    callApi("POST", BASEURL + "users/signin", data, this.signinResponse);
  }

  signinResponse(res) {
    const [status, data] = res.split('::');
    const responseDiv = document.getElementById("responseDiv");
    if (status === "200") {
      setSession("csrid", data, 1);
      window.location.replace("/");
    } else {
      responseDiv.innerHTML = `<br/><br/><label style="color:#ff4444"> ${data}</label>`;
    }
  }

  render() {
    return (
      <div id="base">
        <header id="header">
          <div className="top-bar">
  <span>Free shipping on orders over ₹500</span>
  <span>•</span>
        <span>Extra 10% off on first order</span>
</div>
          <div className="main-header">
            <span className="brand">GroceCart</span>
            <div className="search-container">
              <input type="text" className="search" placeholder="Search for products..." />
              <button className="search-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </button>
            </div>
            <div className="user-actions">
              <div className="user-icon" onClick={this.showSignin}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
                <span className="signin-text">Sign In</span>
              </div>
              <span className="support">Help Center</span>
              <div className="lang-selector">
                <span>EN</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="nav-bar">
            <button onClick={() => this.props.navigate('/categories')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              </svg>
              Categories
            </button>
            <button onClick={() => this.props.navigate('/offers')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
              </svg>
              Offers
            </button>
            <button onClick={() => this.props.navigate('/mealsearch')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
              </svg>
              Meal Planner
            </button>
            <button onClick={() => this.props.navigate('/nutrition')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
              </svg>
              Nutrition Calculator
            </button>
            <button onClick={() => this.props.navigate('/foodpreferences')}>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
    <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
  </svg>
  Food Preferences
</button>
          </div>
        </header>

        <div className="hero-section">
          <div className="hero-content">
            <h1>Fresh Groceries Delivered to Your Door</h1>
            <p>Shop the best quality fruits, vegetables and more with free delivery</p>
            <button className="shop-now-btn" >Shop Now</button>
          </div>
          <div className="hero-image">
            <img src="./images/hero.avif" alt="Fresh groceries" />
          </div>
        </div>

        <div className="categories-section">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {[
              {name: 'Fruits & Vegetables', icon: '🍎'},
              {name: 'Cooking & Baking', icon: '🍳'},
              {name: 'Bakery & Pastries', icon: '🥐'},
              {name: 'Dairy, Egg & Cheese', icon: '🥛'},
              {name: 'Butchery', icon: '🥩'},
              {name: 'Snacks & Beverages', icon: '🍿'},
              {name: 'Frozen Foods', icon: '❄️'},
              {name: 'Grocery Essentials', icon: '🛒'},
              {name: 'Condiments & Sauces', icon: '🍯'},
              {name: 'Canned & Packaged', icon: '🥫'},
              {name: 'Health & Wellness', icon: '💊'},
              {name: 'Fishery', icon: '🐟'}
            ].map((cat, i) => (
              <div className="category-card" key={i} onClick={() => this.props.navigate('/categories')}>
                <div className="category-icon">{cat.icon}</div>
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="featured-section">
  <h2 className="section-title">Weekly Specials</h2>
  <div className="featured-products">
    <div className="product-card">
      <div className="product-badge">-20%</div>
      <img src="./images/1.jpg" alt="Organic Apples" />
      <h3>Organic Apples</h3>
      <p className="product-price">
        <span className="original-price">₹{usdToInr(4.99)}</span>
        <span className="discounted-price">₹{usdToInr(3.99)}</span>
      </p>
      <button className="add-to-cart">Add to Cart</button>
    </div>
    <div className="product-card">
      <div className="product-badge">-15%</div>
      <img src="./images/2.jpg" alt="Fresh Bread" />
      <h3>Fresh Bread</h3>
      <p className="product-price">
        <span className="original-price">₹{usdToInr(3.49)}</span>
        <span className="discounted-price">₹{usdToInr(2.99)}</span>
      </p>
      <button className="add-to-cart">Add to Cart</button>
    </div>
    <div className="product-card">
      <img src="./images/3.jpg" alt="Farm Eggs" />
      <h3>Farm Eggs</h3>
      <p className="product-price">₹{usdToInr(2.99)}</p>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  </div>
</div>

        <div id="popup" className="popup" onClick={this.closeSignin}>
          <div className="popup-content">
            <button className="close-popup" onClick={() => document.getElementById("popup").style.display = "none"}>
              &times;
            </button>
            <h2 id="popupHeader">Welcome Back</h2>

            <div id="signIn">
              <div className="input-group">
                <label>Email</label>
                <input type="email" id="username" placeholder="Enter your email" />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" id="password" placeholder="Enter your password" />
              </div>
              <div className="options">
                <label className="remember-me">
                  <input type="checkbox" /> Remember me
                </label>
                <span className="link" onClick={this.forgotPassword}>Forgot password?</span>
              </div>
              <div id="responseDiv"></div>
              <button className="popup-btn primary-btn" onClick={this.signin}>Login</button>
              <div className="divider">
                <span>or</span>
              </div>
              <button className="popup-btn social-btn google-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                </svg>
                Continue with Google
              </button>
              <p className="switch-form">Don't have an account? <span className="link" onClick={this.showSignup}>Sign up</span></p>
            </div>

            <div id="signup" style={{ display: 'none' }}>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" id="fullname" placeholder="Enter your full name" />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div className="input-group">
                <label>Role</label>
                <select id="role">
                  <option value="">Select your role</option>
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" id="signuppassword" placeholder="Create a password" />
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <input type="password" id="confirmpassword" placeholder="Confirm your password" />
              </div>
              <button className="popup-btn primary-btn" onClick={this.userRegistration}>Create Account</button>
              <div className="divider">
                <span>or</span>
              </div>
              <button className="popup-btn social-btn google-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                </svg>
                Continue with Google
              </button>
              <p className="switch-form">Already have an account? <span className="link" onClick={this.showSignin}>Log in</span></p>
            </div>
          </div>
        </div>

        <footer id="footer">
          <div className="footer-container">
            <div className="footer-section about">
              <h3 className="footer-brand">GroceCart</h3>
              <p>Your one-stop shop for fresh, high-quality groceries delivered to your doorstep.</p>
              <div className="social-links">
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg></a>
              </div>
            </div>

            <div className="footer-section links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Shop</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div className="footer-section links">
              <h4>Categories</h4>
              <ul>
                <li><a href="#">Fruits & Vegetables</a></li>
                <li><a href="#">Dairy & Eggs</a></li>
                <li><a href="#">Meat & Seafood</a></li>
                <li><a href="#">Bakery</a></li>
              </ul>
            </div>

            <div className="footer-section contact">
              <h4>Contact Us</h4>
              <div className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                </svg>
                <span>support@ecom.com</span>
              </div>
              <div className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                </svg>
                <span>+91 9999999999</span>
              </div>
              <div className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                <span>123 Main St, New Delhi, India</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="payment-methods">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"/>
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm4 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm-5 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm-5.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-5z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z"/>
              </svg>
            </div>
            <div className="copyright">
              &copy; {new Date().getFullYear()} GroceCart. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default ProjectHomePage;