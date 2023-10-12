import React from 'react';

import './SearchInput.scss';

const SearchBar = ({ value, onChange, onClick,placeholder }) => {
return (
    <div className="search-bar">
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        <button onClick={onClick}>Search</button>
    </div>
);
};

export default SearchBar;