// SearchResultsComponent.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResultsComponent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const keyword = queryParams.get('keyword');
  /*const category = queryParams.get('category');*/

  if (!keyword /*&& !category*/) {
    // Ha a query paraméterek nem találhatók, kezeld ezt az állapotot
    return (
      <div>
        <p>Nincs keresési eredmény.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Keresési eredmények:</h2>
      <p>Kulcsszavak: {keyword}</p>
      {/*<p>Kategória: {category}</p>*/}
      {/* Itt megjelenítheted a keresési eredményeket */}
    </div>
  );
};

export default SearchResultsComponent;
