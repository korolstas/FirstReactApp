import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default class Header extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="container">
          <div className="navbar-logo">RICK&MORTY Wikipedia</div>
          <ul className="navbar-menu">
            <li>
              <Link to="" className="menu-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="about" className="menu-link">
                About us
              </Link>
            </li>
            <li>
              <Link to="form" className="menu-link">
                Form
              </Link>
            </li>
            <li></li>
          </ul>
        </div>
      </div>
    );
  }
}
