import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaStar, FaRegHeart, FaShare, FaStarHalfAlt } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

import './productPage.css';



const ProductPage = () => {

  const {id} = useParams();
  const imgRef = useRef();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActicveImg] = useState('');

  useEffect(() => {
    async function fetchProduct () {
      try {
        let response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        setActicveImg(response.data.images[0])
      } catch (error) {
        toast.error('Error fetchProduct: ' + error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  },[id])

  if(loading) return <p>Loading....</p>
  if(!product) return <p>Product Not Found</p>

  return ( 
    <div className='product-details'>
      <div className="container">
        <div className="product-img">
          <div className="big-img">
            <img src={activeImg} alt={product.title} />
          </div>
          <div className="sm-imgs">
            {
              product.images.map((img, index) => (
                <img key={index} src={img} alt={product.title} onClick={() => setActicveImg(img)}/>
              ))
            }
          </div>
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <div className="rating">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </div>
          <p className="price">$ {product.price}</p>
          <h5>Availability: <span>{product.availabilityStatus}</span></h5>
          <h5>Brand: <span>{product.brand}</span></h5>
          <p className='desc'>{product.description}</p>
          <h5 className='stock'><span>Only {product.stock} products left in Stock</span></h5>
          <button className='btn'>
            Add to cart 
            <TiShoppingCart />
          </button>
          <div className="icons">
            <span><FaRegHeart /></span>
            <span><FaShare /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;