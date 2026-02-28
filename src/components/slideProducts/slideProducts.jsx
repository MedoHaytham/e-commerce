import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Product from './product';
import TopSlide from '../topSlide';
import api from '../../api/axiosInstance';

import 'swiper/css';
import 'swiper/css/navigation';
import './slideProducts.css';


const SlideProducts = ({categorySlug, categoryName}) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let response = await api.get(`/products/category/${categorySlug}`);
        let data = response.data.data.map((p) => ({
          id: p._id,
          title : p.title,
          price: p.price,
          rating: p.rating,
          images: p.images,
        }));
        setProducts(data);
      } catch(error) {
        toast.error('Error on fetch prodcuts: ' + error);
      }
    }
    fetchProducts();
  },[categorySlug]);

  return ( 
    <div className="slider">
      <div className="container">
        <TopSlide categoryName={categoryName.replace('-', ' ')} desc={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptates?'}/>
        <Swiper 
          loop={products.length > 5}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true
          }}
          breakpoints={{
            340: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            370: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            520: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            767: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          navigation={true} 
          modules={[Autoplay, Navigation]} 
          className="mySwiper"
        >
          { 
            products.map((p) => (
              <SwiperSlide  key={p.id}>
                <Product item={p} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
 );
}

export default SlideProducts;