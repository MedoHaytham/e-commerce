import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { toast } from 'react-toastify';
import { IoPerson } from "react-icons/io5";
import { clearCart } from '../../features/cartSlice';
import { clearFavorites } from '../../features/favoritesSclice';
import { logout } from '../../features/authSlice';
import { useDispatch } from 'react-redux';
import api from '../../api/axiosInstance';


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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout  = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearFavorites());
    navigate("/signIn", { replace: true });
  };


  useEffect(() =>{
    async function fetchAllCategories () {
      try {
        let response = await api.get('/categories?limit=25');
        let data = response.data.data.map((cate) => ({
          name: cate.name,
          slug: cate.slug,
        }));
        setCategories(data);
      } catch(error) {
        toast.error('Error on Fetch Categories:'+ error)
      }
    }
    fetchAllCategories();
  },[]);

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
        {
          localStorage.getItem('token') ? (
            <div className="sign-reg-icon">
              <NavLink to= '/#'><IoPerson /></NavLink>
              <PiSignOutBold onClick={handleLogout} />
            </div>
          ) : (
            <div className="sign-reg-icon">
              <NavLink to= '/signIn'><PiSignInBold /></NavLink>
              <NavLink to= '/register'><MdPersonAddAlt1 /></NavLink>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default BtmHeader;