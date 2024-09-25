import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/slices/categorySlice';

const RecipeForm = ({ onSubmit, initialRecipe, buttonText }) => {
  const [recipe, setRecipe] = useState(initialRecipe);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { list: categories, status } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setRecipe((prevRecipe) => ({ ...prevRecipe, categoryIds: selectedCategories }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(recipe);
      setRecipe(initialRecipe);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <h3 className="mb-3">{buttonText}</h3>
      {['title', 'ingredients', 'instructions', 'image'].map((field, index) => (
        <div className="mb-3" key={index}>
          {field === 'ingredients' || field === 'instructions' ? (
            <textarea
              name={field}
              value={recipe[field]}
              onChange={handleChange}
              placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (separated by new line)`}
              required
              className="form-control"
              rows="3"
            />
          ) : (
            <input
              type={field === 'image' ? 'url' : 'text'}
              name={field}
              value={recipe[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required
              className="form-control"
            />
          )}
        </div>
      ))}
      <div className="mb-3">
        <label htmlFor="categories" className="form-label">Categories</label>
        <select
          name="categoryIds"
          multiple
          value={recipe.categoryIds || []}
          onChange={handleCategoryChange}
          required
          className="form-select"
          id="categories"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-danger">{error}</p>}
      <button type="submit" className="btn btn-primary">{buttonText}</button>
    </form>
  );
};

export default RecipeForm;