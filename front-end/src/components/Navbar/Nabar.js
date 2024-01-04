import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/view-product">View Product</Link>
        </li>
        <li>
          <Link to="/product">Add Product</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/Signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
