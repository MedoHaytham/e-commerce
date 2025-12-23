import React, { useContext } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { CartContext } from '../context/cartContext';


const CartItem = ({item}) => {

  const { removeFromCartHandler, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  return ( 
    <div className="cart-item">
      <div className="item-info">
        <div className="image-item">
          <img src={item.images[0]} alt="" />
        </div>
        <div className="item-content">
          <h4>{item.title}</h4>
          <p className="price">${item.price}</p>
          <div className="quantity-control">
            <button onClick={()=> item.quantity <= 0 ? '' : decreaseQuantity(item) }>-</button>
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