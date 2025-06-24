import React, { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import Model from './model/Model';
import { PostContext } from '../context/PostProvider';
import { useContext } from 'react';

const Navbar = () => {
  const [openModel, setOpenModel] = useState(false);
  const { currentUser } = useContext(PostContext); 

  return (
    <>
      {openModel && <Model onClose={() => setOpenModel(false)} />}
         
      <div className="header">
        <div className="title-1">
          <h2>😎My Blog</h2>
        </div>
        <div className="nav">
          <NavLink exact to="/" className="nav-link" activeClassName="active">
            Home
          </NavLink>
          {currentUser?.role === 'admin' && (
          <NavLink to="/create-post" className="nav-link" activeClassName="active">
            Create Post
          </NavLink>)}
          <NavLink to="/explore-post" className="nav-link" activeClassName="active">
            Explore Post 
          </NavLink>
        </div>
        <button className="btn" onClick={() => setOpenModel(true)}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;

