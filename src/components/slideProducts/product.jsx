import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegHeart, FaCartArrowDown, FaShare, FaStarHalfAlt } from "react-icons/fa";



const Product = ({title, rating, price, image}) => {
  return ( 
    <div className='product'>
      <Link>
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
      </Link>
      {/* <div className='icons'>
        <span><FaCartArrowDown /></span>
        <span><FaRegHeart /></span>
        <span><FaShare /></span>
      </div> */}
    </div>
  );
}

export default Product;