import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const menuItems = [
  {
    id: 0,
    to: '',
    label: 'Home',
  },
  {
    id: 1,
    to: 'about',
    label: 'About us',
  },
  {
    id: 2,
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
          {menuItems.map(({ id, to, label }) => (
            <li key={id}>
              <Link to={to} className="menu-link">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
