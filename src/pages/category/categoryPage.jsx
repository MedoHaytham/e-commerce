import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopSlide from '../../components/topSlide';
import Product from '../../components/slideProducts/product';
import './categoryPage.css';
import CategoryPageLoading from './catePageLoading';
import PageTransition from '../../components/pageTransition';
import axios from 'axios';

const CategoryPage = () => {
  
  const {slug} = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryExist, setCategoryExist] = useState(true);
  
  useEffect(()=> {
    async function fetchProducts() {
      try {
        setLoading(true);
        setProducts([]);
        let response = await axios.get(`https://e-commerce-backend-geri.onrender.com/api/products/category/${slug}`);
        setCategoryExist(true);
        let data = response.data.data.map((p) => ({
          id: p._id,
          title: p.title,
          price: p.price,
          rating: p.rating,
          images: p.images,
        }));
        setProducts(data);
      } catch(error) {
        if (error?.response?.status === 404) {
          setCategoryExist(false);
        } else {
          toast.error('Error fetching products: ' + error);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  },[slug])

  return (
    <PageTransition key={slug}>
      {
        loading 
        ? <CategoryPageLoading count={3}/> 
        : !categoryExist ? 
          (<div style={{ padding: '10px' }}>
            <h2>Category not found</h2>
            <p>The category "{slug}" doesn't exist.</p>
          </div>) : 
          (<div className='category-products'>
            <div className="container">
              <TopSlide 
                categoryName={slug.replace('-', ' ')} 
                content={`: ${products.length}`}
                desc={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptates?'}
              />
              <div className="products">
                {products.length === 0 ? (
                  <p>No products found</p>
                ) : (
                  products.map((p) => (<Product key={p.id} item={p}/>))
                )}
              </div>
            </div>
          </div>)
      }
    </PageTransition>
  );
}
export default CategoryPage;