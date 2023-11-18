import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';

interface Author {
    name: string;
    email: string;
    username: string;
}

interface SearchResult {
  package: {
    name: string;
    author?: Author;
    date: string;
  }
}

const SearchComponent:  React.FC = () => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [noResults, setNoResults] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${searchTerm}`);
      const results: SearchResult[] = response.data.objects;

      if (results.length > 0) {
        setSearchResults(results);
        setCurrentPage(1); //Reset to the first page
        setNoResults(false);
      } else {
        setSearchResults([]);
        setNoResults(true);
      }

      console.log(results);

    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };
  
  const handleLoadMore = async () => {
    try {
        const nextPage = currentPage + 1;
        const response = await axios.get(
            `https://registry.npmjs.org/-/v1/search?text=${searchTerm}&size=10&page=${nextPage}`
        );

        const newResults: SearchResult[] = response.data.objects;

        if (newResults.length > 0) {
            setSearchResults((prevResults) => [...prevResults, ...newResults]);
            setCurrentPage(nextPage);
        }
    } catch (error) {
      console.error('Error fetching more search results', error);
        
    }
  }
  return (
    <div>

        <div className='search-bar-container'>
            <input 
            className='btn searchBar'
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
        />
        <button onClick={handleSearch} className="btn btn-success">Search</button>
        </div>

        <div className='noResults'>
          {noResults && <p>No results found</p>}
        </div>

      {searchResults.length > 0 && (
        <div className='appContainer'>
          <SearchResults searchResults={searchResults} />

        <button className='btn loadMore' onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
