import React from 'react';
import HeroSlider from '../../components/heroSlider';
import SlideProducts from '../../components/slideProducts/slideProducts';

import './home.css';

const HomePage = () => {
  return ( 
    <>
      <HeroSlider />
      <SlideProducts />
    </>
  );
}

export default HomePage;