import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SearchBox = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    async function fetchSuggestions() {
      try {
        let response = await axios.get(`https://dummyjson.com/products/search?q=${searchTerm}`);
        let data = response.data.products.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          rating: p.rating,
          images: p.images,
        }));
        setSuggestions(data.slice(0, 6));
      } catch (error) {
        toast.error('Error on fetch suggestions: ' + error)
      }
    }
  }, [searchTerm])

  console.log(suggestions);

  let submitHadnler = (e) => {
    e.preventDefault();
    if(searchTerm.trim()) navigate(`search?query=${encodeURIComponent(searchTerm.trim())}`);
  }

  return ( 
    <form onSubmit={submitHadnler} className='search-box'>
      <input onChange={(e) => setSearchTerm(e.target.value)} type="text" name='search' id='search' placeholder='Search For Products'/>
      <button type='submit'><FaSearch /></button>
    </form>
  );
}

export default SearchBox;