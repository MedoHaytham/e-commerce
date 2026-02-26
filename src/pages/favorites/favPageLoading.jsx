/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import './favoritesPage.css';
import TopSlide from '../../components/topSlide';


const FavPageLoading = ({count}) => {
  return (
    <div className='favorites-products-loading'>
      <div className="container">
        <TopSlide categoryName='Your Favorites' />
        <div className="products-loading">
          {
            Array.from({length: count}).map((_, index) => (
              <div key={index} className="product-loading">
                <div className="image skeltoin"></div>
                <div className="content skeltoin"></div>
                <div className="content skeltoin"></div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default FavPageLoading;