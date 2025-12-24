import React, { useContext } from 'react';
import './cartPage.css';
import { CartContext } from '../../context/cartContext';
import CartItem from '../../components/cartItem';
import PageTransition from '../../components/pageTransition';


const CartPage = () => {

  const {cartItems} = useContext(CartContext);
  let totalCost = cartItems.reduce((acc, curent) => (acc + curent.price * curent.quantity), 0)

  return (
    <PageTransition>
      <div className='cart'>
        <div className="checkout">
          <h1>Order Summary</h1>
          <div className="items">
            {
              cartItems.length === 0 
              ? <p>Your Cart is empty.</p> 
              : cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))
            }
          </div>
          <div className="summary">
            <div className="info">
              <p>Total:</p>
              <span>${totalCost.toFixed(2)}</span>
            </div>
              <button type='submit'>Place Order</button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default CartPage;