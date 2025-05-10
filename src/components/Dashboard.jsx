import React, { Component } from 'react'
import { BASEURL,callApi,setSession,getSession } from '../api';
import'../css/Dashboard.css';
import MenuBar from './MenuBar';
import Profile from './Profile';

export class Dashboard extends Component {
  constructor(props)
  {
    super(props);
    this.state = {fullname : '',activeComponent:''};
    this.showFullname = this.showFullname.bind(this);
    this.loadComponent=this.loadComponent.bind(this);
  }
  componentDidMount()
  {
    let csr = getSession("csrid");
    //alert(csr);
    if(csr === "")
      this.logout();
    let data = JSON.stringify({csrid : csr});
    callApi("POST", BASEURL + "users/getfullname", data, this.showFullname);
  }
  showFullname(response)
  {
    this.setState({fullname: response});
  }
  logout()
  {
    setSession("csrid", "", -1);
    window.location.replace("/")
  }
  loadComponent(mid){
    let Component={
      "1":<JobPosting/>,
      "2":<JobSearch/>
    };
    this.setState({activeComponent:Component[mid]});
  }
  render() {
    const {fullname,activeComponent } = this.state;
    return (
         <div id="base">
        <header id="header">
          <div className="top-bar">
            <span>Free shipping*</span>
            <span style={{ float: 'right' }}>Discounts Up to 60%</span>
          </div>
          <div className="main-header">
            <span className="brand">ECom</span>
            <input type="text" className="search" placeholder="Search..." />
            <img src="./images/user.png" alt="sign" onClick={this.showSignin} className="signIcon" />
            <span className="signinText" onClick={this.showSignin}>Sign Up/ Login</span>
            <span className="support">Support</span>
            <span className="lang">EN</span>
          </div>
          <div className="nav-bar">
            <button>Categories</button>
            <button>Offers</button>
            <button>Meal Planner</button>
            <button>Nutrition Calculator</button>
            <button>Food Preferences</button>
          </div>
        </header>

        <div className="banner">
          <img src="./images/banner.png" alt="banner" />
        </div>

        <div className="categories">
          {['Cooking & Baking', 'Bakery & Pastries', 'Fishery', 'Butchery', 'Canned Foods', 'Fruits & Vegetables', 'Frozen Foods', 'Dairy, Egg & Cheese'].map((cat, i) => (
            <div className="category" key={i}>
              <img src={`./images/cat${i + 1}.png`} alt={cat} />
              <span>{cat}</span>
            </div>
          ))}
        </div>
        <div id="popup" className="popup" onClick={this.closeSignin}>
  <div className="popup-content">
    <h2 id="popupHeader">Login</h2>

    {/* Sign In Form */}
    <div id="signIn">
      <input type="email" id="username" placeholder="Email" />
      <input type="password" id="password" placeholder="Password" />
      <div className="options">
        <label>
          <input type="checkbox" /> Remember Me
        </label>
        <span className="link" onClick={this.forgotPassword}>Forgot Password</span>
      </div>
      <div id="responseDiv"></div>
      <button className="popup-btn" onClick={this.signin}>Login</button>
      <p>Need an account? <span className="link" onClick={this.showSignup}>Sign Up</span></p>
    </div>

    {/* Sign Up Form */}
    <div id="signup" style={{ display: 'none' }}>
      <input type="text" id="fullname" placeholder="Full Name" />
      <input type="email" id="email" placeholder="Email" />
      <input type="text" id="role" placeholder="Role" />
      <input type="password" id="signuppassword" placeholder="Password" />
      <input type="password" id="confirmpassword" placeholder="Confirm Password" />
      <button className="popup-btn" onClick={this.userRegistration}>Sign Up</button>
      <p>Already have an account? <span className="link" onClick={this.showSignin}>Login</span></p>
    </div>
  </div>
</div>


        
      </div>
    );
  }
}


export default Dashboard