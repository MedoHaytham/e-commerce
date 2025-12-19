import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Product from './product';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/navigation';
import './slideProducts.css';
import { useNavigate } from 'react-router-dom';


const SlideProducts = ({categorySlug, categoryName}) => {

  const [products, setProducts] = useState([]);
  const naviget = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        let response = await axios.get(`https://dummyjson.com/products/category/${categorySlug}`);
        let data = response.data.products.map((p) => ({
          id: p.id,
          title : p.title,
          price: p.price,
          rating: p.rating,
          image: p.thumbnail,
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
        <div className='top-slider'>
          <h2>{categoryName}</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptates?</p>
        </div>
        <Swiper 
          loop={products.length > 5}
          autoplay={{
            delay: 2500
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
          { products.map((p) => (
              <SwiperSlide  key={p.id}>
                <Product
                  title={p.title} 
                  price={p.price} 
                  image={p.image}
                  onClickHandler={() => naviget(`/product/${p.id}`)}
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