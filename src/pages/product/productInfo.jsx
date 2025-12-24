import React, { useContext, useEffect, useState } from 'react';
import { FaStar, FaRegHeart, FaShare, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { CartContext } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';
import hotToast from 'react-hot-toast';
import { FavoritesContext } from '../../context/favoritesContext';


const ProductInfo = ({product}) => {

  const [inCart, setInCart] = useState(false);
  const [inFav, setInFav] = useState(false);
  const {cartItems, addToCart} = useContext(CartContext);
  const {favItems, toggleFavorites} = useContext(FavoritesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!product) return;
    const exists = cartItems.find((cartItem) => +cartItem.id === +product.id);
    setInCart(!!exists);
  },[product, cartItems])

  useEffect(() => {
    if (!product) return;
    const exists = favItems.find((favitem) => +favitem.id === +product.id);
    setInFav(!!exists);
  },[product, favItems])

  const renderStars = () => {
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
    addToCart(product);
    setInCart(true);
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
    toggleFavorites(product);
    setInFav((prev) => !prev)
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
      <button className={`btn ${ inCart ? 'in-cart-btn' : '' }`} onClick={handleAddToCart} disabled={inCart}>
        { inCart ? 'Item In Cart' : 'Add to Cart'} 
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