import React from 'react';
import { FaStar, FaRegHeart, FaCartArrowDown, FaShare, FaRegStar, FaStarHalfAlt, FaCheck } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAddToCartMutation, useFetchCartQuery } from '../../features/cartSlice';
import { useFetchFavoritesQuery, useToggleFavoritesMutation } from '../../features/favoritesSlice';
import Cookies from 'js-cookie';

const Product = ({ item }) => {

  const productId = item?._id || item?.id;
  const productImage = item?.images?.[0] || '/placeholder.jpg';
  const navigate = useNavigate();

  const isAuthenticated = Cookies.get('accessToken') ? true : false;
  
  const { data: cartData } = useFetchCartQuery();
  const cartItems = cartData?.data?.inCartProducts || [];

  const [addToCart] = useAddToCartMutation();

  const {data: favoritesData} = useFetchFavoritesQuery();
  const favItems = favoritesData?.data?.favoriteProducts || [];

  const [toggleFavorites] = useToggleFavoritesMutation();

  const inCart = cartItems.some((cartItem) => (cartItem.product?._id || cartItem.product?.id) === productId);
  const inFav = favItems.some((favItem) => (favItem._id || favItem.id) === productId);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(item?.rating || 0);
    const hasHalfStar = (item?.rating || 0) % 1 !== 0;
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
    if(!isAuthenticated) {
      toast.error('Please login first');
      return;
    }
    if(inCart) return;
    addToCart({ productId, product: item }).unwrap().then(() => {
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
    }).catch((error) => {
      toast.error('Error addToCart: ' + error);
    })
  }

  const handleAddToFav = () => {
    if(!isAuthenticated) {
      toast.error('Please login first');
      return;
    }
    toggleFavorites({ productId, product: item }).unwrap().then(() => {
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
    }).catch((error) => {
      toast.error('Error toggleFavorites: ' + error);
    })
  }

  return ( 
    <div className='product'>
      <Link to={`/product/${productId}`}>
        <span className={`in-cart-check ${ inCart ? 'in-cart' : '' }`}>
          <FaCheck />
          in Cart
        </span>
        <div className="image">
          <img src={productImage} alt="" />
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