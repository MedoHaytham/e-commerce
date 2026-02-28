import React, { useEffect, useState } from 'react';
import PageTransition from './../../components/pageTransition';
import TopSlide from './../../components/topSlide';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Product from '../../components/slideProducts/product';
import SearchPageLoading from './searchPageLoading';
import api from '../../api/axiosInstance';

import './searchPage.css';

const SearchPage = () => {

  const query = new URLSearchParams(useLocation().search).get('query');

  const [seacrhProducts, setSearchProducts] = useState([]);
  const [searchPageLoading, setSearchPageLoading] = useState(true);

  useEffect(() => {
    async function fetchProudtsSearch() {
      try {
        let response = await api.get(`/products/search?q=${query}&limit=0`);
        let data = response.data.data.map((p) => ({
          id: p._id,
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