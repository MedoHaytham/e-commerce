import logo from '../../imgs/logo.png';
import { NavLink } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import './header.css';
import SearchBox from './searchBox';
import { useSelector } from 'react-redux';


const TopHeader = () => {

  const cartItems = useSelector((state) => state.cart.cartItems);
  const favItems = useSelector((state) => state.favorites.favoritesItems);

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