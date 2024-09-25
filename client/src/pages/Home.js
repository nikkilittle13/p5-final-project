import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentRecipe } from '../redux/slices/recipeSlice';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTrendingRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5555/recipes/trending');
        const data = await response.json();
        setTrendingRecipes(data);
      } catch (error) {
        console.error('Error fetching trending recipes:', error);
      }
    };
    
    fetchTrendingRecipes();
  }, []);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    dispatch(setCurrentRecipe(recipe.id));
  };

  const closeRecipeCard = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Trending Recipes</h1>
      <div className="row">
        {trendingRecipes.map((recipe) => (
          <div className="col-md-6 mb-4" key={recipe.id}>
            <div 
              className="card" 
              onClick={() => handleRecipeClick(recipe)} 
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedRecipe && (
        <RecipeCard recipe={selectedRecipe} onClose={closeRecipeCard} />
      )}
    </div>
  );
};

export default Home;