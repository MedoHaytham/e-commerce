import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PiSignInBold } from "react-icons/pi";
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';

const navlinks = [
  {title: 'Home' , link: '/'},
  {title: 'Accessories' , link: '/accessories'},
  {title: 'Contact' , link: '/contact'},
];

const BtmHeader = () => {

  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();


  useEffect(() =>{
    async function fetchAllCategories () {
      try {
        let response = await axios.get('https://dummyjson.com/products/categories');
        let data = response.data.map((cate) => ({
          name: cate.name,
          slug: cate.slug,
        }));
        setCategories(data);
      } catch(error) {
        toast.error('Error on Fetch Categories:'+ error)
      }
    }
    fetchAllCategories();
  },[])

  return ( 
    <div className='btm-hedear'>
      <div className="container">
        <div className="my-nav">
          <div className="category-nav">
            <div className="category-btn" onClick={() => setActive((prev) => !prev)}>
              <IoMdMenu className="menu-icon" />
              <p>Browse Category</p>
              <MdOutlineArrowDropDown />
            </div>
            <div className={`${active ?  'active': ''} category-nav-list`}>
              {categories.map((cate, index) => (<NavLink className='link' key={index} to={`/category/${cate.slug}`} onClick={() => setActive(false)}>{cate.name}</NavLink>))}
            </div>
          </div>
          <div className="menu-toggle" onClick={() => setMenuOpen((prev) => !prev)}>
            <IoMdMenu />
          </div>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navlinks.map((navlink, index) => (            
                <li key={index} className={ location.pathname === navlink.link ? 'active' : '' } onClick={() => setMenuOpen(false)} >
                  <NavLink className= 'link' to={navlink.link}>{navlink.title}</NavLink>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="sign-reg-icon">
          <NavLink to= '/signIn'><PiSignInBold /></NavLink>
          <NavLink to= '/register'><MdPersonAddAlt1 /></NavLink>
        </div>
      </div>
    </div>
  );
}

export default BtmHeader;