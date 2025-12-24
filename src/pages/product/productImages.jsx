import React from 'react';

const ProductImages = ({product, activeImg, setActiveImg}) => {

  return ( 
    <div className="product-img">
      <div className="big-img">
        <img src={activeImg} alt={product.title} />
      </div>
      <div className="sm-imgs">
        {
          product.images.map((img, index) => (
            <img key={index} src={img} alt={product.title} className={activeImg === img ? 'active' : ''} onClick={() => (setActiveImg(img))}/>
          ))
        }
      </div>
    </div>
  );
}

export default ProductImages;