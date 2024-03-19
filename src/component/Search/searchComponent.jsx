import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchComponent = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Update the URL with the search term
    navigate(`/termekek?keyword=${encodeURIComponent(keyword)}`);
    // Call the onSearch function with the keyword
    onSearch(keyword);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Kulcsszavak"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Keresés</button>
    </div>
  );
};

export default SearchComponent;
