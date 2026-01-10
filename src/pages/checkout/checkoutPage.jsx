import './checkoutPage.css';
import PageTransition from '../../components/pageTransition';
import OrderSummary from './orderSummary';
import ShipingMethod from './shipingMethod';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const CheckoutPage = () => {

  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  useEffect(()=> {
    if(cartItems.length === 0) {
      navigate('/cart');
    }
  },[cartItems,navigate]);

  if(cartItems.length === 0) {
    return null;
  }

  return ( 
    <PageTransition>
      <div className='checkout'>
        <div className="container">
          <OrderSummary />
          <ShipingMethod />
        </div>
      </div>
    </PageTransition>
  );
}

export default CheckoutPage;