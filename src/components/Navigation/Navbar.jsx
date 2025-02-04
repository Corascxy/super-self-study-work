import React, { useState } from 'react';
import SearchBar from './SearchBar';
import './Navbar.scss';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <div className="logo">
            <img src="/logo.svg" alt="网站Logo" />
          </div>
          
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="/" className="nav-link">首页</a>
          <a href="/categories" className="nav-link">分类</a>
          <a href="/about" className="nav-link">关于</a>
        </div>
        
        <div className="navbar-right">
          <SearchBar />
          <div className="user-actions">
            <button className="btn btn-login">登录</button>
            <button className="btn btn-register">注册</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;