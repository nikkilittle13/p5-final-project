import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, deleteComment } from '../redux/slices/commentSlice';
import Login from '../components/Login';
import { fetchRecipes, setCurrentRecipe, deleteRecipe } from '../redux/slices/recipeSlice';
import RecipeCard from '../components/RecipeCard';

const Profile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.id);
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const recipes = useSelector((state) => state.recipes.list);
  const comments = useSelector((state) => state.comments.list);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchRecipes());
      dispatch(fetchComments());
    }
  }, [dispatch, isLoggedIn]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    dispatch(setCurrentRecipe(recipe.id));
  };

  const closeRecipeCard = () => {
    setSelectedRecipe(null);
  };

  const handleDelete = (type, id) => {
    const deleteAction = type === 'recipe' ? deleteRecipe : deleteComment;

    dispatch(deleteAction(id)).then(() => {
      setSuccessMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} successfully deleted.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    });
  };

  if (!isLoggedIn) {
    return <Login />;
  }

  const userRecipes = recipes.filter(recipe => recipe.user_id === userId);
  const userComments = comments.filter(comment => comment.user_id === userId);

  return (
    <div className="container mt-5">
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <section>
        <h3>Your Recipes</h3>
        {userRecipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          <ul className="list-group">
            {userRecipes.map(recipe => (
              <li key={recipe.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span onClick={() => handleRecipeClick(recipe)}>{recipe.title}</span>
                <button className="btn btn-danger" onClick={() => handleDelete('recipe', recipe.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {selectedRecipe && <RecipeCard recipe={selectedRecipe} onClose={closeRecipeCard} />}

      <section>
        <h3>Your Comments</h3>
        {userComments.length === 0 ? (
          <p>No comments found.</p>
        ) : (
          <ul className="list-group">
            {userComments.map(comment => (
              <li key={comment.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{comment.content}</span>
                <button className="btn btn-danger" onClick={() => handleDelete('comment', comment.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Profile;