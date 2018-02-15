import React from 'react';
import NavBar from './NavBar';

const title = 'Nick\'s Blog';
const categories = ['Outdoors', 'Tech', 'Sports', 'Movies & TV'];


const Header = (props) => {
  return (
    <div className="header">
      <div className="header__title">{title}</div>
      <div className="header__links">
        <NavBar categories={categories} />
      </div>
    </div>
  );
};

export default Header;
