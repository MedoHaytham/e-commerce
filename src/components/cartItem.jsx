import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../features/cartSlice";


const CartItem = ({item}) => {

  const dispatch = useDispatch();
  const product = item.product;
  const productId = product?._id || product?.id;
  const quantity = item.quantity;

  return ( 
    <div className="cart-item">
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
            <button onClick={()=> quantity <= 1 ? '' : dispatch(decreaseQuantity(productId)) }>-</button>
            <span className='quantity'>{quantity}</span>
            <button onClick={()=>  quantity > 99 ? '' : dispatch(increaseQuantity(productId)) }>+</button>
          </div>
        </div>
      </div>
      <button className='del-item' onClick={() => dispatch(removeFromCart(productId))}>
        <FaTrashAlt />
      </button>
    </div>
   );
}

export default CartItem;