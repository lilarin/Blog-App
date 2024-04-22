import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">На головну</Link>
        <Link to="/about">Про блог</Link>
        <Link to="/contacts">Контакти</Link>
      </nav>
    </header>
  );
};
