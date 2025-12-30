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
        let response = await axios.get('https://dummyjson.com/products/categories');
        let categories = response.data.map((c) => c.slug);
        let accessoriesCat = categories.filter((c) => c.toLowerCase().includes('accessories'));

        const allAccessories = [];

        for (let category of accessoriesCat) {
          let response = await axios.get(`https://dummyjson.com/products/category/${category}`);
          allAccessories.push({
            category: category,
            products: response.data.products
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
                  <TopSlide categoryName={a.category}/>
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