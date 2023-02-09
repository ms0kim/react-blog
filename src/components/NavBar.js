import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { login, logout } from '../store/authSlice';

const NavBar = () => {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();


  return ( 
  <nav>
      <div className={isLoggedIn ? 'click' : 'menu'}>
        <NavLink 
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} 
          to="/">
            Home
        </NavLink>
      </div>
      <div className='navTitle'>SONGIBLOG</div>
      <div className={isLoggedIn ? 'click' : 'menu'}>
        <button 
          className='login'
          onClick={() => {
            if (isLoggedIn) {
              dispatch(logout());
            } else {
              dispatch(login());
            }
          }}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
        {isLoggedIn ? <NavLink 
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          to="/admin">
            Admin
        </NavLink> : null}
        <NavLink 
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          to="/blog">
            Blog
        </NavLink>
      </div>
    </nav>
    );
};

export default NavBar;