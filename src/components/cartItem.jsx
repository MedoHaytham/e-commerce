import React, { useContext } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { CartContext } from '../context/cartContext';
import { Link } from 'react-router-dom';


const CartItem = ({item}) => {

  const { removeFromCartHandler, increaseQuantity, decreaseQuantity } = useContext(CartContext);

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
            <button onClick={()=> item.quantity <= 1 ? '' : decreaseQuantity(item) }>-</button>
            <span className='quantity'>{item.quantity}</span>
            <button onClick={()=>  item.quantity > 99 ? '' : increaseQuantity(item) }>+</button>
          </div>
        </div>
      </div>
      <button className='del-item' onClick={() => removeFromCartHandler(item)}>
        <FaTrashAlt />
      </button>
    </div>
   );
}

export default CartItem;