import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  
  const {slug} = useParams();
  return ( 
    <h1>{`Category: ${slug}`}</h1>
  );
}
export default CategoryPage;