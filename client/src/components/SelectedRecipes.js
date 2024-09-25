import React from 'react';
import { useSelector } from 'react-redux';

const SelectedRecipes = ({ onRecipeClick }) => {
  const { selectedRecipes, status } = useSelector((state) => state.recipes);

  if (status === 'loading') {
    return <div className="text-center">Loading recipes...</div>;
  }

  if (status === 'failed') {
    return <div className="text-danger text-center">Error loading recipes</div>;
  }

  return (
    <div className="mt-3">
      {selectedRecipes.length === 0 ? (
        <div className="text-center">No selected recipes.</div>
      ) : (
        <ul className="list-group">
          {selectedRecipes.map((recipe) => (
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

export default SelectedRecipes;