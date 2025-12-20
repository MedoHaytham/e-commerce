import React from 'react';
import { FaStar, FaRegHeart, FaCartArrowDown, FaShare, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Product = ({ title, price, image, rating, onClickHandler }) => {

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
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
    <div className='product' onClick={onClickHandler}>
      <div className="image">
        <img src={image} alt="" />
      </div>
      <p className='title'>{title}</p>
      <div className="stars">
        { renderStars() }
      </div>
      <span className='price'>$ {price}</span>
      <div className='icons'>
        <span><FaCartArrowDown /></span>
        <span><FaRegHeart /></span>
        <span><FaShare /></span>
      </div>
    </div>
  );
}

export default Product;