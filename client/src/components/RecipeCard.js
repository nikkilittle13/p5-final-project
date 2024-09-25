import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommentForm from './CommentForm';
import { fetchComments } from '../redux/slices/commentSlice';
import Login from './Login';

const RecipeCard = ({ recipe, onClose }) => {
  const dispatch = useDispatch();
  const { list: comments, status } = useSelector((state) => state.comments);
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchComments());
    }
  }, [dispatch, status]);

  const recipeComments = comments.filter(comment => comment.recipe_id === recipe.id);
  const ingredientsList = recipe.ingredients.split('\n').map(ingredient => ingredient.trim());
  const instructionsList = recipe.instructions.split('\n').map(instruction => instruction.trim());

  const renderComments = () => (
    recipeComments.length > 0 
      ? recipeComments.map((comment, index) => (
          <li key={index} className="list-group-item">{comment.content}</li>
        )) 
      : <li className="list-group-item">No comments yet.</li>
  );

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">{recipe.title}</h2>
        <img 
          src={recipe.image} 
          alt={recipe.title}
          style={{ maxWidth: '250px', height: 'auto' }}
          className="mb-3"
        />
        <h3>Ingredients:</h3>
        <ul className="list-group mb-3">
          {ingredientsList.map((ingredient, index) => (
            <li key={index} className="list-group-item">{ingredient}</li>
          ))}
        </ul>
        
        <h3>Instructions:</h3>
        <ul className="list-group mb-3">
          {instructionsList.map((instruction, index) => (
            <li key={index} className="list-group-item">{instruction}</li>
          ))}
        </ul>
        
        <button className="btn btn-secondary" onClick={onClose}>Close Recipe</button>

        <h3 className="mt-4">Comments:</h3>
        {isLoggedIn ? <CommentForm recipeId={recipe.id} /> : (
          <div className="alert alert-warning">
            <p>Please log in to add a comment.</p>
            <Login />
          </div>
        )}
        
        <ul className="list-group mb-3">
          {renderComments()}
        </ul>
      </div>
    </div>
  );
};

export default RecipeCard;