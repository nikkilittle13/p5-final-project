import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecipes = createAsyncThunk('recipes/fetchAll', async () => {
  const resp = await fetch('/recipes');
  return resp.json();
});

export const fetchRecipeById = createAsyncThunk('recipes/fetchById', async (id) => {
  const response = await fetch(`/recipes/${id}`);
  return response.json();
});

export const fetchRecipesByCategory = createAsyncThunk('recipes/fetchByCategory', async (id) => {
  const response = await fetch(`/recipes/category/${id}`);
  return response.json();
})

export const createRecipe = createAsyncThunk('recipes/create', async (recipe) => {
  const response = await fetch('/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  });
  return response.json();
});

export const updateRecipe = createAsyncThunk('recipes/update', async ({ id, recipe }) => {
  const response = await fetch(`/recipes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  });
  return response.json();
});

export const searchRecipes = createAsyncThunk('recipes/search', async (query) => {
  const response = await fetch(`/recipes`);
  return response.json();
});

export const deleteRecipe = createAsyncThunk('recipes/delete', async (id) => {
  await fetch(`/recipes/${id}`, {
    method: 'DELETE',
  });
  return id;
})


const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    list: [],
    byCategory: [],
    searchResults: [],
    selectedRecipes: [],
    selectedRecipe: null,
    currentRecipe: null,
    status: 'idle',
    error: null,
    viewMode: null,
  },
  reducers: {
    filterRecipes(state, action) {
      const query = action.payload.toLowerCase();
      state.searchResults = state.list.filter(recipe =>
        recipe.title.toLowerCase().includes(query)
      );
      state.viewMode ='search';
    },
    selectCategory(state, action) {
      const categoryId = action.payload;
      state.selectedRecipes = state.list.filter(recipe =>
        recipe.categories.some(category => category.id === categoryId)
      );
      state.viewMode = 'category';
    },
    setCurrentRecipe(state, action) {
      state.currentRecipe = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRecipeById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        const updatedRecipe = action.payload;
        const index = state.list.findIndex(recipe => recipe.id === updatedRecipe.id);
        if (index !== -1) {
          state.list[index] = updatedRecipe;
        }
      })
      .addCase(searchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRecipesByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipesByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.byCategory = action.payload;
      })
      .addCase(fetchRecipesByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.list = state.list.filter(recipe =>  recipe.id !== action.payload)
      });
  },
});


export const { filterRecipes, selectCategory, setCurrentRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;