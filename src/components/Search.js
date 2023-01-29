import React, { useState } from 'react';
import '../style.css';

function Search({ onChangeText }) {
  const [searchText, setSearchText] = useState('');
  function onChange(e) {
    setSearchText(e.target.value);
  }
  function onSearchClick() {
    onChangeText(searchText);
  }
  return (
    <div className='search-body'>
      <input type='text' className='input-primary' onChange={onChange} />
      <button className='primary-btn' onClick={onSearchClick}>
        Search
      </button>
    </div>
  );
}

export default Search;
