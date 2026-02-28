import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';

const SearchBox = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=> {
    async function fetchSuggestions() {

      if(!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        let response = await api.get(`/products/search?q=${searchTerm}&limit=5`);
        let data = response.data.data.map((p) => ({
          id: p._id,
          title: p.title,
          price: p.price,
          rating: p.rating,
          images: p.images,
        }));
        setSuggestions(data || []);
      } catch (error) {
        toast.error('Error on fetch suggestions: ' + error)
      }
    }
    
    const debouce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debouce);
    // fetchSuggestions();
  }, [searchTerm]);

  let submitHadnler = (e) => {
    e.preventDefault();
    if(searchTerm.trim()) navigate(`search?query=${encodeURIComponent(searchTerm.trim())}`);
    setSuggestions([]);
  }

  useEffect(() => {
    setSuggestions([]);
  },[location])

  return ( 
    <div className={`searchBox-container ${suggestions.length > 0 ? 'has-suggestions' : ''}`}>
      <form onSubmit={submitHadnler} className='search-box' autoComplete='off'>
        <input onChange={(e) => setSearchTerm(e.target.value)} type="text" name='search' id='search' placeholder='Search For Products'/>
        <button type='submit'><FaSearch /></button>
      </form>
      {
        suggestions.length > 0 && (
          <ul className='suggestions'>
            {
              suggestions.map((p) => (
                <Link to={`product/${p.id}`} key={p.id}>
                  <li key={p.id} >
                    <img src={p.images[0]} alt={p.title} />
                    <span>{p.title}</span>
                  </li>
                </Link>
              ))
            }
          </ul>
        )
      }
    </div>
  );
}

export default SearchBox;