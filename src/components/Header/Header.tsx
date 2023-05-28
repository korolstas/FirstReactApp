import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const menuItems = [
  {
    to: '',
    label: 'Home',
  },
  {
    to: 'about',
    label: 'About us',
  },
  {
    to: 'form',
    label: 'Form',
  },
];

const Header = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-logo">RICK&MORTY Wikipedia</div>
        <ul className="navbar-menu">
          {menuItems.map((menuItem) => (
            <li key={menuItem.to}>
              <Link to={menuItem.to} className="menu-link">
                {menuItem.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
