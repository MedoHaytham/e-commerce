import logo from '../../imgs/logo.png';
import { NavLink } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import './header.css';
import SearchBox from './searchBox';
import { useFetchCartQuery } from '../../features/cartSlice';
import { useFetchFavoritesQuery } from '../../features/favoritesSclice';


const TopHeader = () => {

  const { data: cartData } = useFetchCartQuery();
  const cartItems = cartData?.data?.inCartProducts || [];

  const { data: favoritesData } = useFetchFavoritesQuery();
  const favItems = favoritesData?.data?.favoriteProducts || [];

  return ( 
    <div className='top-header'>
      <div className='container'>
        <NavLink to={'/'}>
          <img src={logo} alt="logo" className='logo'/>
        </NavLink>
        <SearchBox />
        <div className='header-icons'>
          <NavLink to={'favorites'}>
            <div className='icon'>
              <FaRegHeart />
              <span className='count'>{favItems.length}</span>
            </div>
          </NavLink>
          <NavLink to={'cart'}>
            <div className='icon'>
              <TiShoppingCart />
              <span className='count'>{cartItems.length}</span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;