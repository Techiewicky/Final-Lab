import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">BookmarkApp</h2>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Add Bookmark</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;