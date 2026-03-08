import './checkoutPage.css';
import PageTransition from '../../components/pageTransition';
import OrderSummary from './orderSummary';
import ShipingMethod from './shipingMethod';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useFetchCartQuery } from '../../features/cartSlice';


const CheckoutPage = () => {

  const { data: cartData } = useFetchCartQuery();
  const cartItems = useMemo(() => cartData?.data?.inCartProducts || [], [cartData]);
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