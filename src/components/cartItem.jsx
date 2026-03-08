import { FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import LoadingCircle from "./loadingCircle/loadingCircle";
import { useDecreaseQuantityMutation, useIncreaseQuantityMutation, useRemoveFromCartMutation } from "../features/cartSlice";


const CartItem = ({item}) => {

  const product = item.product;
  const productId = product?._id || product?.id;
  const quantity = item.quantity;

  const [increaseQuantity, { isLoading: increaseLoading }] = useIncreaseQuantityMutation();
  const [decreaseQuantity, { isLoading: decreaseLoading }] = useDecreaseQuantityMutation();
  const [removeFromCart, { isLoading: removeLoading }] = useRemoveFromCartMutation();

  const isDisabled = removeLoading || increaseLoading || decreaseLoading;
  const isUpdating = increaseLoading || decreaseLoading;


  return (
    <div className={`cart-item ${isDisabled ? "is-removing" : ""}`}>
      <div className="item-info">
        <Link to={`/product/${productId}`}>       
          <div className="image-item">
            <img src={product.images?.[0]} alt="" />
          </div>
        </Link>
        <div className="item-content">
          <Link to={`/product/${productId}`}>          
            <h4>{product.title}</h4>
            <p className="price">${product.price}</p>
          </Link>
          <div className="quantity-control">
            <button onClick={()=> quantity <= 1 ? '' : decreaseQuantity({ productId }) } disabled={isDisabled}>-</button>
            <span className='quantity'>{ isUpdating ? <LoadingCircle /> : quantity}</span>
            <button onClick={()=>  quantity > 99 ? '' : increaseQuantity({ productId }) } disabled={isDisabled}>+</button>
          </div>
        </div>
      </div>
      <button className='del-item' disabled={isDisabled} onClick={() => removeFromCart({ productId })}>
        {
          removeLoading ? <LoadingCircle />  : <FaTrashAlt />
        }
      </button>
    </div>
  );
}

export default CartItem;