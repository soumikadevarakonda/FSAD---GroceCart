import React from 'react';
import './ProductDetail.css';
import { FaSearch, FaCartPlus } from 'react-icons/fa';

const ProductDetail = () => {
  return (
    <div> {/* ← This wrapper is required */}
      {/* Product Section */}
      <div className="product-section">
        <div className="product-image">
          <img
            src="https://cdn.pixabay.com/photo/2017/04/04/16/29/avocado-2202354_1280.jpg"
            alt="Avocado"
          />
        </div>
        <div className="product-info">
          <h2>Avacado 70g</h2>
          <p className="price">Rs 99.00</p>
          <button className="add-cart-btn">
            <FaCartPlus /> Add to cart
          </button>
        </div>
      </div>

      {/* Description Tabs */}
      <div className="description-tabs">
        <span className="active-tab">Description</span>
        <span>Specifications</span>
      </div>
    </div>
  );
};

export default ProductDetail;
