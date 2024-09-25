import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../redux/slices/commentSlice';

const CommentForm = ({ recipeId }) => {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      recipe_id: recipeId,
      user_id: userId,
      content,
    };

    try {
      const resultAction = await dispatch(createComment(commentData));
      if (createComment.fulfilled.match(resultAction)) {
        setMessage('Comment added successfully!');
        setContent('');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to add comment. Please try again.');
      }
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="form-group">
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add your comment..."
            rows="3"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
};

export default CommentForm;