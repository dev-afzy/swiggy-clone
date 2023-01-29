import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_URL } from '../Constant';
import '../style.css';

function Header() {
  return (
    <div className='header'>
      <div>
        <Link to='/'>
          <img className='header-logo' src={LOGO_URL} alt='logo' />
        </Link>
      </div>
      <div>
        <ul className='nav-items'>
          <li id='cart'>
            <Link to='/cart'>Cart</Link>
          </li>
          <li id='about'>
            <Link to='/about'>About</Link>
          </li>
          <li id='contact'>
            <Link to='/contact'>Contact us</Link>
          </li>
          <li>
            <Link to='/instamart'>Instamart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
