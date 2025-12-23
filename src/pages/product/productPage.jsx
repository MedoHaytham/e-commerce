import axios from 'axios';
import React, { useContext, useEffect , useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaStar, FaRegHeart, FaShare, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import './productPage.css';
import SlideProducts from '../../components/slideProducts/slideProducts';
import ProductLoading from './productLoading';
import { CartContext } from '../../context/cartContext';
import hotToast from 'react-hot-toast';




const ProductPage = () => {

  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState('');
  const [inCart, setInCart] = useState(false);
  const {cartItems, addToCart} = useContext(CartContext);
  const [inFav, setInFav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct () {
      try {
        let response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        setActiveImg(response.data.images[0]);
      } catch (error) {
        toast.error('Error fetchProduct: ' + error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  },[id]);

  useEffect(() => {
    if (!product) return;
    const exists = cartItems.find((cartItem) => +cartItem.id === +product.id);
    setInCart(!!exists);
  },[product, cartItems])

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

  if(loading) return <ProductLoading />
  if(!product) return <p>Product Not Found</p>

  console.log(product);

  return (
    <>
      <div className='product-details'>
        <div className="container">
          <div className="product-img">
            <div className="big-img">
              <img src={activeImg} alt={product.title} />
            </div>
            <div className="sm-imgs">
              {
                product.images.map((img, index) => (
                  <img key={index} src={img} alt={product.title} className={activeImg === img ? 'active' : ''} onClick={() => (setActiveImg(img))}/>
                ))
              }
            </div>
          </div>
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
              <span className={ inFav ? 'in-fav' : '' } onClick={() => setInFav((prev) => !prev)}><FaRegHeart /></span>
              <span><FaShare /></span>
            </div>
          </div>
        </div>
      </div>
      <SlideProducts categorySlug={product.category} categoryName={product.category} />
    </>
  );
}

export default ProductPage;