import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ to, className = '', children }) => {
  return (
    <Link to={to} className={`nav-item ${className}`}>
      {children}
    </Link>
  );
};

export default NavItem;