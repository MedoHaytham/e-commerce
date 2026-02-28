import React, { useEffect , useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SlideProducts from '../../components/slideProducts/slideProducts';
import ProductLoading from './productLoading';
import ProductImages from './productImages';
import ProductInfo from './productInfo';
import SlideProductsLoading from '../../components/slideProducts/slideProductsLoading';
import PageTransition from '../../components/pageTransition';
import api from '../../api/axiosInstance';
import './productPage.css';

const ProductPage = () => {

  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState('');

  useEffect(() => {
    async function fetchProduct () {
      setLoading(true);
      setProduct(null);
      try {
        let response = await api.get(`/products/${id}`);
        setProduct(response.data.data);
        setActiveImg(response.data.data.images[0] || '');
      } catch (error) {
        toast.error('Error fetchProduct: ' + error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  },[id]);

  return (
    <PageTransition key={id}>
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
    </PageTransition>
  );
}

export default ProductPage;