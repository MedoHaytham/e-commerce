import React from 'react';
import logo from '../../imgs/logo.png';
import { NavLink } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import './header.css';


const TopHeader = () => {
  return ( 
    <div className='top-header'>
      <div className='container'>
        <NavLink to={'/'}>
          <img src={logo} alt="logo" className='logo'/>
        </NavLink>
        <form action="" className='search-box'>
          <input type="text" name='search' id='search' placeholder='Search For Products'/>
          <button type='submit'><FaSearch /></button>
        </form>
        <div className='header-icons'>
          <div className='icon'>
            <FaRegHeart />
            <span className='count'>0</span>
          </div>
          <div className='icon'>
            <TiShoppingCart />
            <span className='count'>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;