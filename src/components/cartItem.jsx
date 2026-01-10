import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../features/cartSlice";


const CartItem = ({item}) => {

  const dispatch = useDispatch();

  return ( 
    <div className="cart-item">
      <div className="item-info">
        <Link to={`/product/${item.id}`}>       
          <div className="image-item">
            <img src={item.images[0]} alt="" />
          </div>
        </Link>
        <div className="item-content">
          <Link to={`/product/${item.id}`}>          
            <h4>{item.title}</h4>
            <p className="price">${item.price}</p>
          </Link>
          <div className="quantity-control">
            <button onClick={()=> item.quantity <= 1 ? '' : dispatch(decreaseQuantity(item)) }>-</button>
            <span className='quantity'>{item.quantity}</span>
            <button onClick={()=>  item.quantity > 99 ? '' : dispatch(increaseQuantity(item)) }>+</button>
          </div>
        </div>
      </div>
      <button className='del-item' onClick={() => dispatch(removeFromCart(item))}>
        <FaTrashAlt />
      </button>
    </div>
   );
}

export default CartItem;