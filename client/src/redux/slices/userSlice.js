import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const response = await fetch('/users');
  return response.json();
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    list: [],
    id: null,
    username: '',
    status: 'idle',
    isLoggedIn: false
  },
  reducers: {
    setUserId(state, action) {
      state.id = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
     .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
     .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
     .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
})

export const { setIsLoggedIn, setUserId } = userSlice.actions;
export default userSlice.reducer;