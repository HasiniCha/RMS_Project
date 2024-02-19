import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleIconClick = () => {
    handleSubmit();
  };

  return (
    <div style={{ width: '300px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', width: '70%' }}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
          style={{ width: '100%', height: '30px', boxSizing: 'border-box' }}
        />
      </form>
      <button
        className="btn btn-outline-secondary border-left-0"
        onClick={handleIconClick}
        style={{ display: 'inline-block', width: '40px', height: '30px' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
