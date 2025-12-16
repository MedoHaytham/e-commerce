import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'
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
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
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
              <h4>Introducing the new</h4>
              <h3>Microsoft Xbox <br /> 360 Controller</h3>
              <p>Windows 11/10/8/7/Xp, PS3, Tv Box</p>
              <Link to='/' className='btn'>Shop Now</Link>
            </div>
            <img src={banner2} alt="banner2" />
          </SwiperSlide>
          <SwiperSlide>
            <div className="content">
              <h4>Introducing the new</h4>
              <h3>Microsoft Xbox <br /> 360 Controller</h3>
              <p>Windows 11/10/8/7/Xp, PS3, Tv Box</p>
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