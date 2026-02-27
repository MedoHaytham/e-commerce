import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../features/cartSlice";
import LoadingCircle from "./loadingCircle/loadingCircle";


const CartItem = ({item}) => {

  const { removingById, updatingById } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const product = item.product;
  const productId = product?._id || product?.id;
  const quantity = item.quantity;

  const isRemoving = !!removingById?.[productId];
  const isUpdating = !!updatingById?.[productId];

  const isDisabled = isRemoving || isUpdating;

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
            <button onClick={()=> quantity <= 1 ? '' : dispatch(decreaseQuantity(productId)) } disabled={isDisabled}>-</button>
            <span className='quantity'>{ isUpdating ? <LoadingCircle /> : quantity}</span>
            <button onClick={()=>  quantity > 99 ? '' : dispatch(increaseQuantity(productId)) } disabled={isDisabled}>+</button>
          </div>
        </div>
      </div>
      <button className='del-item' onClick={() => dispatch(removeFromCart(productId))}>
        {
          isRemoving ? <LoadingCircle />  : <FaTrashAlt />
        }
      </button>
    </div>
  );
}

export default CartItem;