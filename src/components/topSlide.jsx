import React from 'react';

const TopSlide = ({categoryName, content, desc}) => {
  return ( 
    <div className='top-slider'>
      <h2>{categoryName} {content}</h2>
      { 
        <p>{desc}</p>
      }
    </div>
  );
}

export default TopSlide;