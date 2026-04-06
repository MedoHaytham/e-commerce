import React, { useEffect , useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SlideProducts from '../../components/slideProducts/slideProducts';
import ProductLoading from './productLoading';
import ProductImages from './productImages';
import ProductInfo from './productInfo';
import SlideProductsLoading from '../../components/slideProducts/slideProductsLoading';
import PageTransition from '../../components/pageTransition';
import axios from 'axios';
import './productPage.css';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState('');

  useEffect(() => {
    async function fetchProduct () {
      setLoading(true);
      setProduct(null);
      try {
        let response = await axios.get(`https://e-commerce-backend-geri.onrender.com/api/products/${id}`);
        setProduct(response.data.data);
        setActiveImg(response.data.data.images[0] || '');
      } catch (error) {
        if (error?.response?.status === 404) {
          setProduct(null);
        } else {
          toast.error('Error fetchProduct: ' + error);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  },[id]);

  useEffect(() => {
    if (!loading && !product) {
      navigate('/');
    }
  }, [loading, product, navigate]);

  return (
    <PageTransition key={id}>
      {
        loading 
        ? <ProductLoading /> 
        : product ? <div className='product-details'>
            <div className="container">
              <ProductImages 
                product={product} 
                activeImg={activeImg} 
                setActiveImg={setActiveImg}
              />
              <ProductInfo product={product} />
            </div>
          </div> : null
      }
      {
        loading 
        ? <SlideProductsLoading count={3}/> 
        : product ? <SlideProducts 
            categorySlug={product?.category?.slug || product?.category} 
            categoryName={product?.category?.name || product?.category || ''} 
          /> : null
      }
    </PageTransition>
  );
}

export default ProductPage;