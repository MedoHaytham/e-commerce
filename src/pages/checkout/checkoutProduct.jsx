import React from 'react';

const CheckoutProduct = ({title, quantity, price}) => {

  let subtotal = price * quantity;

  return ( 
    <div className="product-summary">
      <h2>{title}</h2>
      <div className='quantity'>
        <p>Quantity: {quantity}</p>
        <p>${price} each</p>
      </div>
      <div className="price">
        <p>Subtotal</p>
        <span>${subtotal.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default CheckoutProduct;