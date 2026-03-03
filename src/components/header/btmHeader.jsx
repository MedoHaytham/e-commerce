import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { toast } from 'react-toastify';
import { clearCart } from '../../features/cartSlice';
import { clearFavorites } from '../../features/favoritesSclice';
import { logout } from '../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api/axiosInstance';
import { RiAccountCircleFill } from "react-icons/ri";
import { IoIosPaper } from "react-icons/io";




const navlinks = [
  {title: 'Home' , link: '/'},
  {title: 'Accessories' , link: '/accessories'},
  {title: 'Contact' , link: '/contact'},
];

const BtmHeader = () => {

  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(false);
  const [userActive, setUserActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [me, setMe] = useState(null);

  const { isAuthenticated, authChecked, user } = useSelector((state) => state.auth);

  const handleLogout =  async () => {
    try {
      await api.post('/auth/logout');
      toast.success('Logout Success');
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || "Logout Failed";
      toast.error(msg);
    } finally {
      dispatch(logout());
      dispatch(clearCart());
      dispatch(clearFavorites());
      navigate("/signIn", { replace: true });
    }
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

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await api.get(`/users/${user.id}`);
        setMe(response.data.data);
      } catch (error) {
        toast.error('Error on Fetch Me');
      }
    }

    if (!authChecked || !isAuthenticated || !user?.id) return;
    fetchMe();
  }, [authChecked, isAuthenticated, user?.id]);

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
          !authChecked ? null : isAuthenticated ? (
            <div className="sign-icon">
              <div className="user-info-btn" onClick={() => setUserActive((prev) => !prev)}>
                <span>Hi, {me?.firstName}</span>
                <MdOutlineArrowDropDown />
              </div>
              <div className={`${userActive ?  'user-active': ''} user-info-list`}>
                <NavLink className='link' onClick={() => setUserActive(false)} to='/profile'>
                  <RiAccountCircleFill />
                  Profile
                </NavLink>
                <NavLink className='link' onClick={() => setUserActive(false)} to='/orders'>
                  <IoIosPaper />
                  My Orders
                </NavLink>
                <NavLink className='link' onClick={() => {handleLogout(); setUserActive(false)}}>
                  <PiSignOutBold />
                  Logout
                </NavLink>
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