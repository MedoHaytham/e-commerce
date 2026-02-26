import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import CheckoutProduct from './checkoutProduct';
import { useSelector } from "react-redux";


const OrderSummary = () => {

  const cartItems = useSelector((state) => state.cart.cartItems);
  const fee = 64;
  let totalCost = cartItems.reduce((acc, curent) => (acc + curent.product.price * curent.quantity), 0);
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
              key={p.product.id} 
              title={p.product.title}
              price={p.product.price}
              quantity={p.quantity}
            />))
        }
        <div className="subtotal-fee">
          <div className="subtotal">
            <p>Subtotal</p>
            <span>${totalCost.toFixed(2)}</span>
          </div>
          <div className="fee">
            <p>Delivery Fee</p>
            <span>${fee}</span>
          </div>
        </div>
        <div className="total">
          <div className="total-price">
            <p>Total</p>
            <span>${totalWithFees.toFixed(2)}</span>
          </div>
          <p>Coupons are available for registered users only.</p>
          <p>Redeemed Vouchers will be applied automatically upon placing the order.</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;