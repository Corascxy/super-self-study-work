import React, { useState } from 'react';
import './SearchBar.scss';

const SearchBar = () => {
  const [searchType, setSearchType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // 实现搜索逻辑
    console.log('搜索类型:', searchType, '搜索词:', searchTerm);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <div className="search-container">
          <select
            className="search-type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="all">全部</option>
            <option value="book">书籍</option>
            <option value="movie">电影</option>
            <option value="game">游戏</option>
          </select>
          
          <input
            type="text"
            className="search-input"
            placeholder="搜索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <button type="submit" className="search-button">
            搜索
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar; 