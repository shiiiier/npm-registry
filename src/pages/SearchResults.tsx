
import React from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

interface SearchResult {
  package: {
    name: string;
    author?: {
      name: string;
      email: string;
    };
    date: string;
  };
}

interface SearchResultsProps {
  searchResults: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  return (
    <table className="table table-responsive table-hover">
      <thead className="table-light">
        <tr>
          <th>Package Name</th>
          <th>Author</th>
          <th>Updated Date</th>
          <th>Details</th>
        </tr>
      </thead>

      <tbody>
        {searchResults.map((result) => (
          <tr key={result.package.name}>
            <td style={{ textAlign: 'left' }}>{result.package.name}</td>
            <td>{result.package.author?.name}</td>
            <td>{result.package.date.substring(0, 10)}</td>
            <td>
              <Link to={`/details/${encodeURIComponent(result.package.name)}`}>
                <button className="btn btn-success">
                  <FaInfoCircle />
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchResults;
