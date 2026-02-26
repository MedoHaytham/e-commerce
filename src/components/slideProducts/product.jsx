import React from 'react';
import { FaStar, FaRegHeart, FaCartArrowDown, FaShare, FaRegStar, FaStarHalfAlt, FaCheck } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import { toggleFavorites } from '../../features/favoritesSclice';

const Product = ({ item }) => {

  const productId = item?._id || item?.id;

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const favItems = useSelector((state) => state.favorites.favoritesItems);
  const navigate = useNavigate();


  const inCart = cartItems.some((cartItem) => (cartItem.product._id || cartItem.product.id) === item.id);
  const inFav = favItems.some((favItem) => (favItem._id  || favItem.id) === item.id);

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

  

  const handleAddToCart = () => {
    // addToCart(item);
    if(!localStorage.getItem('token')) {
      toast.error('Please login first');
      return;
    }
    if(inCart) return;
    dispatch(addToCart(productId));
    toast.success(
      <div className='toast-wrapper'>
        <img src={item.images[0]} alt="toast-img" />
        <div className="toast-contet">
          <strong>{item.title}</strong>
          Added To Cart
          <button className='btn' onClick={() => navigate('/cart')}>View Cart</button>
        </div>
      </div>
      ,{duration: 3500}
    )
  }

  const handleAddToFav = () => {
    // toggleFavorites(item);
    if(!localStorage.getItem('token')) {
      toast.error('Please login first');
      return;
    }
    inFav 
    ? toast.error(
      <div className='toast-wrapper'>
        <img src={item.images[0]} alt="toast-img" />
        <div className="toast-contet">
          <strong>{item.title}</strong>
          Removed From Favorites
        </div>
      </div>
      ,{duration: 3500}
    ) 
    : toast.success(
      <div className='toast-wrapper'>
        <img src={item.images[0]} alt="toast-img" />
        <div className="toast-contet">
          <strong>{item.title}</strong>
          Added To Favorites
        </div>
      </div>
      ,{duration: 3500}
    )
    dispatch(toggleFavorites(productId));
  }

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
        <span className={ inCart ? 'in-cart' : '' } onClick={handleAddToCart}><FaCartArrowDown /></span>
        <span className={ inFav ? 'in-fav' : '' } onClick={handleAddToFav}><FaRegHeart /></span>
        <span><FaShare /></span>
      </div>
    </div>
  );
}

export default Product;