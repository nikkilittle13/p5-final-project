import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, setCurrentRecipe } from '../redux/slices/recipeSlice';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import CategoryBar from '../components/CategoryBar';
import SelectedRecipes from '../components/SelectedRecipes';
import RecipeCard from '../components/RecipeCard';

const Recipes = () => {
  const dispatch = useDispatch();
  const { status, error, viewMode } = useSelector((state) => ({
    status: state.recipes.status,
    error: state.recipes.error,
    viewMode: state.recipes.viewMode,
  }));
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [dispatch, status]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    dispatch(setCurrentRecipe(recipe.id));
  };

  const closeRecipeCard = () => {
    setSelectedRecipe(null);
  };

  if (status === 'loading') return <div>Loading recipes...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <SearchBar />
      <CategoryBar />
      {viewMode === 'category' && <SelectedRecipes onRecipeClick={handleRecipeClick} />}
      {viewMode === 'search' && <SearchResults onRecipeClick={handleRecipeClick} />}
      
      {selectedRecipe && <RecipeCard recipe={selectedRecipe} onClose={closeRecipeCard} />}
    </div>
  );
};

export default Recipes;