import React from 'react';
import { FaStar, FaRegHeart, FaShare, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import hotToast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import { toggleFavorites } from '../../features/favoritesSclice';


const ProductInfo = ({product}) => {

  const productId = product?._id || product?.id;

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const favItems = useSelector((state) => state.favorites.favoritesItems);
  const navigate = useNavigate();

  const inCart = cartItems.some((cartItem) => (cartItem.product._id || cartItem.product.id) === product?.id);
  const inFav = favItems.some((favItem) => (favItem._id  || favItem.id) === product?.id); 

  const renderStars = () => {
    if (!product?.rating && product?.rating !== 0) return null;

    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    const totalStars = 5;
    
    // full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`}/>);
    }

    // has half star
    if(hasHalfStar) {
      stars.push(<FaStarHalfAlt key='half'/>);
    }

    // empty stars
    const remaining = totalStars - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }

    return stars;
  }

  const handleAddToCart = () => {
    // addToCart(product);
    if(!product || inCart) return;
    dispatch(addToCart({ productId, product }))
    hotToast.success(
      <div className='toast-wrapper'>
        <img src={product.images[0]} alt="toast-img" />
        <div className="toast-contet">
          <strong>{product.title}</strong>
          Added To Cart
          <button className='btn' onClick={() => navigate('/cart')}>View Cart</button>
        </div>
      </div>
      ,{duration: 3500}
    )
  }

  const handleAddToFav = () => {
    // toggleFavorites(product);
    if (!product) return;
    inFav 
    ? hotToast.error(
      <div className='toast-wrapper'>
        <img src={product.images[0]} alt="toast-img" />
        <div className="toast-contet">
          <strong>{product.title}</strong>
          Removed From Favorites
        </div>
      </div>
      ,{duration: 3500}
    ) 
    : hotToast.success(
      <div className='toast-wrapper'>
        <img src={product.images[0]} alt="toast-img" />
        <div className="toast-contet">
          <strong>{product.title}</strong>
          Added To Favorites
        </div>
      </div>
      ,{duration: 3500}
    )
    dispatch(toggleFavorites({ productId, product: product }));
  }

  return ( 
    <div className="product-info">
      <h1>{product.title}</h1>
      <div className="rating">
        {renderStars ()}
      </div>
      <p className="price">$ {product.price}</p>
      <h5>Availability: <span>{product.availabilityStatus}</span></h5>
      <h5>Brand: <span>{product.brand}</span></h5>
      <p className='desc'>{product.description}</p>
      <h5 className='stock'><span>Only {product.stock} products left in Stock</span></h5>
      <button 
        className={`btn ${ inCart ? 'in-cart-btn' : '' }`} 
        onClick={() => inCart ? navigate('/cart') : handleAddToCart()}
      >
        { inCart ? 'View Cart' : 'Add to Cart'} 
        <TiShoppingCart />
      </button>
      <div className="icons">
        <span className={ inFav ? 'in-fav' : '' } onClick={handleAddToFav}><FaRegHeart /></span>
        <span><FaShare /></span>
      </div>
    </div>
  );
}

export default ProductInfo;