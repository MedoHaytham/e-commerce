import './checkoutPage.css';
import PageTransition from '../../components/pageTransition';
import OrderSummary from './orderSummary';
import ShipingMethod from './shipingMethod';


const CheckoutPage = () => {

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