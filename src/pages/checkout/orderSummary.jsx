import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import CheckoutProduct from './checkoutProduct';


const OrderSummary = () => {

  const {cartItems} = useContext(CartContext);
  const {state} = useLocation();
  const totalCost = state?.totalCost;
  const fee = 64;
  const totalWithFees = totalCost + fee;

  return ( 
    <div className="order-summary">
      <div className="top-summary">
        <IoMdCheckmarkCircleOutline />
        <h1>Order Summary</h1>
      </div>
      <div className="bottom-summary">
        {
          cartItems.map((p) => (
            <CheckoutProduct
              key={p.id} 
              title={p.title}
              price={p.price}
              quantity={p.quantity}
            />))
        }
        <div className="subtotal-fee">
          <div className="subtotal">
            <p>Subtotal</p>
            <span>${totalCost}</span>
          </div>
          <div className="fee">
            <p>Delivery Fee</p>
            <span>${fee}</span>
          </div>
        </div>
        <div className="total">
          <div className="total-price">
            <p>Total</p>
            <span>${totalWithFees}</span>
          </div>
          <p>Coupons are available for registered users only.</p>
          <p>Redeemed Vouchers will be applied automatically upon placing the order.</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;