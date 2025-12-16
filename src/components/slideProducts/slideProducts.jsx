import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Product from './product';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/navigation';
import './slideProducts.css';


const SlideProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let response = await axios.get('https://dummyjson.com/products/category/smartphones');
        let data = response.data.products.map((p) => ({
          title : p.title,
          price: p.price,
          rating: p.rating,
          image: p.images[0],
        }));
        setProducts(data);
      } catch(error) {
        toast.error('Error on fetch prodcuts: ' + error);
      }
    }
    fetchProducts();
  },[])

  return ( 
    <div className="slider">
      <div className="container">
        <div className='top-slider'>
          <h2>smart phones</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptates?</p>
        </div>
        <Swiper loop={true} autoplay={{delay: 2500}} slidesPerView={5} navigation={true} modules={[Autoplay, Navigation]} className="mySwiper">
          { products.map((p, index) => (
              <SwiperSlide>
                <Product
                  key={index}
                  title={p.title} 
                  price={p.price} 
                  rating={p.rating} 
                  image={p.image}
                /> 
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
 );
}

export default SlideProducts;