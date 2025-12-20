import React from 'react';
import { FaStar, FaRegHeart, FaCartArrowDown, FaShare, FaStarHalfAlt } from "react-icons/fa";




const Product = ({ title, price, image, onClickHandler }) => {
  return ( 
    <div className='product' onClick={onClickHandler}>
      <div className="image">
        <img src={image} alt="" />
      </div>
      <p className='title'>{title}</p>
      <div className="stars">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
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