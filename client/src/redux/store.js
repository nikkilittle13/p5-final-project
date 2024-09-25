import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './slices/recipeSlice';
import userReducer from './slices/userSlice';
import commentReducer from './slices/commentSlice';
import categoryReducer from './slices/categorySlice';

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    users: userReducer,
    comments: commentReducer,
    categories: categoryReducer,
  },
});

export default store;