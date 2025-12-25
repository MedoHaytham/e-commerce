import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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