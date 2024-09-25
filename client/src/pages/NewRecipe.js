import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../redux/slices/recipeSlice';
import RecipeForm from '../components/RecipeForm';
import Login from '../components/Login';

const NewRecipe = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.id);
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  const initialRecipe = {
    title: '',
    ingredients: '',
    instructions: '',
    image: '',
    categoryIds: [],
    user_id: userId,
  };

  const handleRecipeSubmit = async (recipe) => {
    const newRecipe = { ...recipe, user_id: userId };
    const result = await dispatch(createRecipe(newRecipe));

    if (result.meta.requestStatus === 'fulfilled') {
      setMessage('Recipe created successfully!');
    } else {
      setMessage('Failed to create recipe');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="container mt-5">
      {message && (
        <p className={`text-${message.includes('successfully') ? 'success' : 'danger'}`}>
          {message}
        </p>
      )}
      {isLoggedIn ? (
        <RecipeForm
          onSubmit={handleRecipeSubmit}
          initialRecipe={initialRecipe}
          buttonText="Create Recipe"
        />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default NewRecipe;