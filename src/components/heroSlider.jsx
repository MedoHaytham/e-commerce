import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

import banner1 from '../imgs/banner_Hero1.jpg';
import banner2 from '../imgs/banner_Hero2.jpg';
import banner3 from '../imgs/banner_Hero3.jpg';

const HeroSlider = () => {
  return ( 
    <>
    <div className="hero-slider">
      <div className="container">
        <Swiper loop={true} autoplay={{delay: 2500}} pagination={true} modules={[Autoplay,Pagination]} className="mySwiper">
          <SwiperSlide>
            <div className="content">
              <h4>Introducing the new</h4>
              <h3>Microsoft Xbox <br /> 360 Controller</h3>
              <p>Windows 11/10/8/7/Xp, PS3, Tv Box</p>
              <Link to='/' className='btn'>Shop Now</Link>
            </div>
            <img src={banner1} alt="banner1" />
          </SwiperSlide>
          <SwiperSlide>
            <div className="content">
              <h4>M/N1-X6U SPEAKER</h4>
              <h3>Led Bluetooth <br />Speaker Lamp</h3>
              <p>support 3.5 mm jack audio input</p>
              <Link to='/' className='btn'>Shop Now</Link>
            </div>
            <img src={banner2} alt="banner2" />
          </SwiperSlide>
          <SwiperSlide>
            <div className="content">
              <h4>NEW ARRIVAL</h4>
              <h3>Xiaomi Air 75 <br /> Earbuds</h3>
              <p>AAC HD Sound Quality</p>
              <Link to='/' className='btn'>Shop Now</Link>
            </div>
            <img src={banner3} alt="banner3" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

    </>
  );
}

export default HeroSlider;