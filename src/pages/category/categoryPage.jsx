import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopSlide from '../../components/topSlide';
import Product from '../../components/slideProducts/product';
import './categoryPage.css';
import CategoryPageLoading from './catePageLoading';
import PageTransition from '../../components/pageTransition';

const CategoryPage = () => {
  
  const {slug} = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=> {
    async function fetchProducts() {
      try {
        let response = await axios.get(`https://e-commerce-backend-geri.onrender.com/api/products/category/${slug}`);
        let data = response.data.data.map((p) => ({
          id: p._id,
          title: p.title,
          price: p.price,
          rating: p.rating,
          images: p.images,
        }));
        setProducts(data);
      } catch(error) {
        toast.error('Error on fetch prodcuts: ' + error);
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
        : <div className='category-products'>
            <div className="container">
              <TopSlide 
                categoryName={slug.replace('-', ' ')} 
                content={`: ${products.length}`}
                desc={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptates?'}
              />
              <div className="products">
                {
                  products.map((p) => (<Product key={p.id} item={p}/>))
                }
              </div>
            </div>
          </div>
      }
    </PageTransition>
  );
}
export default CategoryPage;