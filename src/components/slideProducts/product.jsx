import React, { useContext, useEffect, useState } from 'react';
import { FaStar, FaRegHeart, FaCartArrowDown, FaShare, FaRegStar, FaStarHalfAlt, FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';



const Product = ({ item }) => {

  const [inCart, setInCart] = useState(false);
  const [inFav, setInFav] = useState(false);
  const {cartItems, addToCart} = useContext(CartContext);

  console.log(cartItems);

    useEffect(() => {
      const exists = cartItems.find((Cartitem) => +Cartitem.id === +item.id);
      console.log(exists);
      if (exists) setInCart(true);
    },[item.id, cartItems])

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(item.rating);
    const hasHalfStar = item.rating % 1 !== 0;
    const totalStars = 5;

    // full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }

    //half star
    if(hasHalfStar) {
      stars.push(<FaStarHalfAlt key='half'/>)
    }

    //empty star
    const remaining = totalStars - stars.length;
    for(let i = 0; i < remaining; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }
    
    return stars;
  };

  return ( 
    <div className='product'>
      <Link to={`/product/${item.id}`}>
        <span className={`in-cart-check ${ inCart ? 'in-cart' : '' }`}>
          <FaCheck />
          in Cart
        </span>
        <div className="image">
          <img src={item.images[0]} alt="" />
        </div>
        <p className='title'>{item.title}</p>
        <div className="stars">
          { renderStars() }
        </div>
        <span className='price'>$ {item.price}</span>
      </Link>
      <div className='icons'>
        <span className={ inCart ? 'in-cart' : '' } onClick={() => {
          setInCart(true);
          addToCart(item);
          }}><FaCartArrowDown /></span>
        <span className={ inFav ? 'in-fav' : '' } onClick={() => setInFav((prev) => !prev)}><FaRegHeart /></span>
        <span><FaShare /></span>
      </div>
    </div>
  );
}

export default Product;