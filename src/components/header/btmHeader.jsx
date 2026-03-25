import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { toast } from 'react-toastify';
import { RiAccountCircleFill } from "react-icons/ri";
import { IoIosPaper } from "react-icons/io";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLogoutMutation } from '../../features/authSlice';
import { User, MapPin, CreditCard, Shield } from "lucide-react";
import { useGetMeQuery } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
import apiSlice from '../../app/api/apiSlice';

const navlinks = [
  {title: 'Home' , link: '/'},
  {title: 'Accessories' , link: '/accessories'},
  {title: 'Contact' , link: '/contact'},
];

const accountItems = [
  { label: "Profile", icon: User, path: "/profile" },
  { label: "Addresses", icon: MapPin, path: "/addresses" },
  { label: "Payments", icon: CreditCard, path: "/payments" },
  { label: "Security Settings", icon: Shield, path: "/security-settings" },
];

const BtmHeader = () => {

  const { data: meData, isLoading } = useGetMeQuery();
  
  const me = meData?.data;
  
  

  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const isAccountPage = accountItems.some(
    (item) => location.pathname.startsWith(item.path)
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(false);
  const [userActive, setUserActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const isAuthenticated = Cookies.get('accessToken') ? true : false;

  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout =  async () => {
    try {
      await logout().unwrap();
      Cookies.remove('accessToken', { path: "/" });
      dispatch(apiSlice.util.resetApiState());
      toast.success('Logout successful');
    } catch (error) {
      toast.error('Error on Logout');
    }
  };


  useEffect(() =>{
    async function fetchAllCategories () {
      try {
        let response = await axios.get('https://e-commerce-backend-geri.onrender.com/api/categories?limit=25');
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
              <MdOutlineArrowDropDown className={`${active ?  'active': ''} arrow`}/>
            </div>
            <div className={`${active ?  'active': ''} category-nav-list`}>
              {categories.map((cate, index) => (<NavLink className='link' key={index} to={`/category/${cate.slug}`} onClick={() => setActive(false)}>{cate.name}</NavLink>))}
            </div>
          </div>
          <div className="menu-toggle" onClick={() => setMenuOpen((prev) => !prev)}>
            <IoMdMenu />
          </div>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {isMobile && isAuthenticated && isAccountPage
              ? accountItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} onClick={() => setMenuOpen(false)}>
                      <NavLink className="link" to={item.path}>
                        <Icon size={18} style={{ marginRight: "6px" }} />
                        {item.label}
                      </NavLink>
                    </li>
                  );
                })
              : navlinks.map((navlink, index) => (
                  <li
                    key={index}
                    className={location.pathname === navlink.link ? "active" : ""}
                    onClick={() => setMenuOpen(false)}
                  >
                    <NavLink className="link" to={navlink.link}>
                      {navlink.title}
                    </NavLink>
                  </li>
                ))}
          </ul>
        </div>
        {
          isAuthenticated ? (
            <div className="sign-icon">
              {
                isLoading 
                ? '' 
                : <div className="user-info-btn" onClick={() => setUserActive((prev) => !prev)}>
                    <span>Hi, {me?.firstName}</span> 
                    <MdOutlineArrowDropDown className={`${userActive ?  'active': ''} arrow`}/>
                  </div>
              }
              <div className={`${userActive ?  'user-active': ''} user-info-list`}>
                <NavLink className='link' onClick={() => setUserActive(false)} state={{me: me || null}} to='/profile'>
                  <RiAccountCircleFill />
                  Profile
                </NavLink>
                <NavLink className='link' onClick={() => setUserActive(false)} to='/orders'>
                  <IoIosPaper />
                  My Orders
                </NavLink>
                <button className='link' onClick={handleLogout}>
                  <PiSignOutBold />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="reg-icon">
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