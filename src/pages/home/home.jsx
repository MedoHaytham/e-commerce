import React, { useEffect, useState } from 'react';
import HeroSlider from '../../components/heroSlider';
import SlideProducts from '../../components/slideProducts/slideProducts';

import './home.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import SlideProductsLoading from '../../components/slideProducts/slideProductsLoading';

const homeCate = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sunglasses",
  "sports-accessories",
];

const breakpoints = {
  340: 3,
  370: 3,
  520: 4,
  767: 5,
  992: 5,
};


const HomePage = () => {

  const [homeCategories, setHomeCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slidesCount, setSlidesCount] = useState(3);

  const updateSlidesCount = () => {
    const width = window.innerWidth;
    let count = 3;
    for (let bp in breakpoints) {
      if (width >= bp) count = breakpoints[bp];
    }
    setSlidesCount(count);
  };

  useEffect(() => {
    updateSlidesCount();
    window.addEventListener('resize', updateSlidesCount);
    return () => window.removeEventListener('resize', updateSlidesCount);
  }, []);

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
    <>
      <HeroSlider />
      {
        loading ? (
          homeCate.map((_, idx) => (
            <SlideProductsLoading key={idx} count={slidesCount} />  
          ))
        ) :
        homeCategories.map((hc) => (
          <SlideProducts key={hc.slug} categorySlug={hc.slug} categoryName={hc.name} />
        ))
      }
    </>
  );
}

export default HomePage;