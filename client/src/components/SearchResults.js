import React from 'react';
import { useSelector } from 'react-redux';

const SearchResults = ({ onRecipeClick }) => {
  const { searchResults, status } = useSelector((state) => state.recipes);

  if (status === 'loading') {
    return <div className="text-center">Loading recipes...</div>;
  }
  
  if (status === 'failed') {
    return <div className="text-danger text-center">Error loading recipes</div>;
  }

  return (
    <div className="mt-3">
      {searchResults.length === 0 ? (
        <div className="text-center">No results found.</div>
      ) : (
        <ul className="list-group">
          {searchResults.map((recipe) => (
            <li 
              key={recipe.id} 
              className="list-group-item list-group-item-action" 
              onClick={() => onRecipeClick(recipe)}
            >
              {recipe.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;