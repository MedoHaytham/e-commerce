import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopSlide from '../../components/topSlide';
import Product from '../../components/slideProducts/product';
import './categoryPage.css';
import CategoryPageLoading from './catePageLoading';

const CategoryPage = () => {
  
  const {slug} = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const count = products.length;
  console.log(count);
  
  useEffect(()=> {
    async function fetchProducts() {
      try {
        let response = await axios.get(`https://dummyjson.com/products/category/${slug}`);
        let data = response.data.products.map((p) => ({
          id: p.id,
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
    
    loading ? <CategoryPageLoading count={3}/> :
    <div className='category-products'>
      <div className="container">
        <TopSlide categoryName={slug.replace('-', ' ')} length={products.length} inCategory={true}/>
        <div className="products">
          {
            products.map((p) => (<Product key={p.id} item={p}/>))
          }
        </div>
      </div>
    </div>
  );
}
export default CategoryPage;