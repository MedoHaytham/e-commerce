import axios from 'axios';
import React, { useEffect , useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './productPage.css';
import SlideProducts from '../../components/slideProducts/slideProducts';
import ProductLoading from './productLoading';
import ProductImages from './productImages';
import ProductInfo from './productInfo';
import SlideProductsLoading from '../../components/slideProducts/slideProductsLoading';

const ProductPage = () => {

  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState('');

  useEffect(() => {
    async function fetchProduct () {
      try {
        let response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        setActiveImg(response.data.images[0] || '');
      } catch (error) {
        toast.error('Error fetchProduct: ' + error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  },[id]);

  return (
    <>
      {
        loading 
        ? <ProductLoading /> 
        : <div className='product-details'>
            <div className="container">
              <ProductImages 
                product={product} 
                activeImg={activeImg} 
                setActiveImg={setActiveImg}
              />
              <ProductInfo product={product} />
            </div>
          </div>
      }
      {
        loading 
        ? <SlideProductsLoading count={3}/> 
        : <SlideProducts 
            categorySlug={product.category} 
            categoryName={product.category} 
          />
      }
    </>
  );
}

export default ProductPage;