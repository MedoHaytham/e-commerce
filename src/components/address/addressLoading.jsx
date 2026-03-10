import React from 'react';
import './addressLoading.css';

const AddressLoading = ({count}) => {
  return ( 
    <div className='addresses-loading'>
      {
        Array.from({ length: count }).map((_, index) => (
          <div key={index} className='address-loading'>
            <div className="title skeltoin"></div>
            <div className="content skeltoin"></div>
            <div className="content skeltoin"></div>
            <div className="content skeltoin"></div>
          </div>
        ))
      }
    </div>
  );
}

export default AddressLoading;