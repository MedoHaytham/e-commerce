/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';

import './categoryPage.css';

const CategoryPageLoading = ({count}) => {
  return ( 
    <div className='category-loading'>
      <div className="container">
        <div className='top-slider'>
          <h2 className='skeltoin'></h2>
          <p className='skeltoin'></p>
        </div>
        <div className="products-loading">
          { 
            Array.from({length: count}).map((_,index) => (
              <div key={index} className='product'>
                <div className="image skeltoin"></div>
                <div className="content skeltoin"></div>
                <div className="content skeltoin"></div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default CategoryPageLoading;