import React, { useEffect, useState } from 'react';
import HeroSlider from '../../components/heroSlider';
import SlideProducts from '../../components/slideProducts/slideProducts';

import './home.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import SlideProductsLoading from '../../components/slideProducts/slideProductsLoading';
import PageTransition from '../../components/pageTransition';

const homeCate = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sunglasses",
  "sports-accessories",
];

const HomePage = () => {
  const [homeCategories, setHomeCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    async function fetchCategories () {
      try {
        let response = await axios.get('https://dummyjson.com/products/categories');
        let data = response.data.map((cate) => ({
          name: cate.name,
          slug: cate.slug,
        }));

        let homeData = homeCate.map((slug) =>  (
          data.find(cate => cate.slug === slug)
        )).filter(Boolean);

      setHomeCategories(homeData);

      } catch(error) {
        toast.error('Error on Fetch Categories:'+ error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  },[]);
  
  return ( 
    <PageTransition>
      <HeroSlider />
      {
        loading 
        ? homeCate.map((_,index) => (
            <SlideProductsLoading key={index} count={3} />  
          ))
        : homeCategories.map((hc) => (
            <SlideProducts key={hc.slug} categorySlug={hc.slug} categoryName={hc.name} />
          ))
      }
    </PageTransition>
  );
}

export default HomePage;