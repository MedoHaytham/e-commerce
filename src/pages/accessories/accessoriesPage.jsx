import React, { useEffect, useState } from 'react';
import PageTransition from '../../components/pageTransition';
import AccessoriesPageLoading from './accessoriesPageLoading';
import Product from '../../components/slideProducts/product';
import { toast } from 'react-toastify';
import axios from 'axios';
import TopSlide from '../../components/topSlide';

import './accessoriesPage.css';


const AccessoriesPage = () => {

  const [accessories, setAccessories] = useState([]);
  const [accessoriesPageLoading, setAccessoriesPageLoading] = useState(true);
  

  useEffect(() => {
    async function fetchAccessories() {
      try {
        let response = await axios.get('https://e-commerce-backend-geri.onrender.com/api/categories?limit=0');
        let categories = response.data.data.map((c) => c.slug);
        let accessoriesCat = categories.filter((c) => c.toLowerCase().includes('accessories'));
        const allAccessories = [];

        for (let category of accessoriesCat) {
          let response = await axios.get(`https://e-commerce-backend-geri.onrender.com/api/products/category/${category}`);
          allAccessories.push({
            category: category,
            products: response.data.data.map((p) => ({
              id: p._id,
              title: p.title,
              price: p.price,
              images: p.images,
              rating: p.rating,
            }))
          });
        }
        setAccessories(allAccessories);
      }catch(error) {
        toast.error('Error on fetchAccessories' + error);
      }finally {
        setAccessoriesPageLoading(false);
      }
    } 
    fetchAccessories();
  },[]);

  return (
    accessoriesPageLoading 
    ? <AccessoriesPageLoading count={3}/>
    : <PageTransition>
        <div className='accessories'>
          <div className="container">
            {
              accessories.map((a, index) => (
                <div className='accessory' key={index}>
                  <TopSlide categoryName={a.category.replace('-', ' ')}/>
                  <div className="products">
                    {
                      a.products.map((p) => (<Product key={p.id} item={p} />))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </PageTransition>
  );
}

export default AccessoriesPage;