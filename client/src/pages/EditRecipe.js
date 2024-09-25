import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecipe, fetchRecipes } from '../redux/slices/recipeSlice';
import RecipeForm from '../components/RecipeForm';
import Login from '../components/Login';

const EditRecipe = () => {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.id);
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const recipes = useSelector((state) => state.recipes.list);
  const status = useSelector((state) => state.recipes.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [dispatch, status]);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleRecipeSubmit = async (recipe) => {
    const updatedRecipe = { ...recipe, user_id: userId };
    const result = await dispatch(updateRecipe({ id: selectedRecipe.id, recipe: updatedRecipe }));

    if (result.meta.requestStatus === 'fulfilled') {
      setSuccessMessage('Recipe updated successfully!');
      setError('');
      setSelectedRecipe(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setError(result.payload || 'Failed to update recipe');
      setSuccessMessage('');
    }
  };

  if (!isLoggedIn) {
    return <Login />;
  }

  const userRecipes = recipes.filter((recipe) => recipe.user_id === userId);

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <div className="mt-4">
        <h3>Your Recipes</h3>
        {userRecipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          <ul className="list-group">
            {userRecipes.map((recipe) => (
              <li 
                key={recipe.id} 
                className="list-group-item d-flex justify-content-between align-items-center"
                onClick={() => handleRecipeSelect(recipe)}
                style={{ cursor: 'pointer' }}
              >
                {recipe.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedRecipe && (
        <RecipeForm
          onSubmit={handleRecipeSubmit}
          initialRecipe={{
            title: selectedRecipe.title,
            ingredients: selectedRecipe.ingredients,
            instructions: selectedRecipe.instructions,
            image: selectedRecipe.image,
            categoryIds: selectedRecipe.categoryIds,
          }}
          buttonText="Edit Recipe"
        />
      )}
    </div>
  );
};

export default EditRecipe;