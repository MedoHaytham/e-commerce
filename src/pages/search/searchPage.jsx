import React, { useEffect, useState } from 'react';
import PageTransition from './../../components/pageTransition';
import TopSlide from './../../components/topSlide';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Product from '../../components/slideProducts/product';

import './searchPage.css';
import SearchPageLoading from './searchPageLoading';

const SearchPage = () => {

  const query = new URLSearchParams(useLocation().search).get('query');

  const [seacrhProducts, setSearchProducts] = useState([]);
  const [searchPageLoading, setSearchPageLoading] = useState(true);

  useEffect(() => {
    async function fetchProudtsSearch() {
      try {
        let response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
        let data = response.data.products.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          rating: p.rating,
          images: p.images,
        }));
        setSearchProducts(data || []);
      } catch (error) {
        toast.error('Error On fetch search products: ' + error);
      } finally {
        setSearchPageLoading(false);
      }
    }
    fetchProudtsSearch();
  },[query]);

  return ( 
    searchPageLoading 
    ? <SearchPageLoading count={3}/>
    : <PageTransition key={query}>
        <div className="search-products">
          <div className="container">
            <TopSlide categoryName='Results for' content={`: ${query}`}/>
            <div className="products">
              {
                seacrhProducts.length === 0 
                ? <p>No Results found.</p>
                : seacrhProducts.map((p) => <Product key={p.id} item={p} />)
              }
            </div>
          </div>
        </div>
      </PageTransition>
  );
}

export default SearchPage;