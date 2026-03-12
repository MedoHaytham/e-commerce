import './cartPage.css';
import CartItem from '../../components/cartItem';
import PageTransition from '../../components/pageTransition';
import { useNavigate } from 'react-router-dom';
import CartPageLoading from './cartPageLoading';
import { useFetchCartQuery } from '../../features/cartSlice';


const CartPage = () => {

  const { data: cartData, isLoading } = useFetchCartQuery();
  const cartItems = cartData?.data?.inCartProducts || [];
  let totalCost = cartItems.reduce((acc, curent) => (acc + curent.product.price * curent.quantity), 0)
  const navigate = useNavigate();

  return (
    <PageTransition>
      {
        isLoading ? 
          <CartPageLoading /> 
          : <div className='cart'>
              <div className="checkout">
                <h1>Order Summary</h1>
                <div className="items">
                  {
                    cartItems.length === 0
                    ? <p>Your Cart is empty.</p> 
                    : cartItems.map((item) => (
                      <CartItem
                        key={item.product?.id || item.product?._id}
                        item={item}
                      />
                    ))
                  }
                </div>
                {  
                  cartItems.length === 0 
                    ? '' 
                    : <div className="summary">
                        <div className="info">
                          <p>Total:</p>
                          <span>${totalCost.toFixed(2)}</span>
                        </div>
                        <button onClick={() => navigate('/checkout')}>Proceed to checkout</button>
                      </div>
                }
              </div>
            </div>
      }
    </PageTransition>
  );
}

export default CartPage;