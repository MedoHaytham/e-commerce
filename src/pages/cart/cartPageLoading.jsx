/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import './cartPage.css';

const CartPageLoading = ({count}) => {
  return (
    <div className='cart'>
      <div className="checkout">
        <h1>Order Summary</h1>
        <div className="items">
          {
            Array.from({length: 2}).map((_, index) => (
              <div className="cart-item">
                <div className="item-info">
                  <div className="image-item skeltoin"></div>
                  <div className="item-content">         
                    <h4 className='title-loading skeltoin'></h4>
                    <p className="price-loading skeltoin"></p>
                    <div className="quantity-control-loading skeltoin"></div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default CartPageLoading;