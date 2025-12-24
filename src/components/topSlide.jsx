import React from 'react';

const TopSlide = ({categoryName, length, inCategory}) => {
  return ( 
    <div className='top-slider'>
      <h2>{categoryName} { inCategory? `: ${length}`: ''}</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptates?</p>
    </div>
  );
}

export default TopSlide;