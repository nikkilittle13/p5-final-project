import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk('comments/fetchAll', async () => {
  const response = await fetch('/comments');
  return response.json();
});

export const createComment = createAsyncThunk('comments/create', async (commentData) => {
  const { recipe_id, user_id, content } = commentData;
  const response = await fetch('/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipe_id, user_id, content }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create comment');
  }
  return response.json();
});

export const deleteComment = createAsyncThunk('comments/delete', async (id) => {
  await fetch(`/comments/${id}`, {
    method: 'DELETE',
  });
  return id;
})

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.list = state.list.filter(recipe =>  recipe.id !== action.payload)
      });
  },
});

export default commentSlice.reducer;