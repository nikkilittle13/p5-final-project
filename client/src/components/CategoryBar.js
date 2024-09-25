import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/slices/categorySlice';
import { selectCategory } from '../redux/slices/recipeSlice';

const CategoryBar = () => {
  const dispatch = useDispatch();
  const { list: categories, status } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const handleClick = (id) => {
    dispatch(selectCategory(id));
  };

  const renderContent = () => {
    if (status === 'loading') return <div className="text-center">Loading categories...</div>;
    if (status === 'failed') return <div className="text-danger text-center">Error loading categories</div>;

    return categories.length > 0 ? (
      categories.map((category) => (
        <button 
          key={category.id} 
          onClick={() => handleClick(category.id)} 
          className="btn btn-primary m-2"
        >
          {category.name}
        </button>
      ))
    ) : (
      <div>No categories available</div>
    );
  };

  return (
    <div className="d-flex flex-wrap justify-content-center mt-3 mb-4">
      {renderContent()}
    </div>
  );
};

export default CategoryBar;