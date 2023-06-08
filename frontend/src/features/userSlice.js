import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, getUserData } from './userService';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
  };

  
  export const registerUserAsync = createAsyncThunk(
    'user/register',
    async (userData) => {
      try {
        const response = await registerUser(userData);
        return response;
      } catch (error) {
        throw error;
      }
    }
  );

  
  export const loginUserAsync = createAsyncThunk(
    'user/login',
    async (credentials) => {
      try {
        const response = await loginUser(credentials);
        return response;
      } catch (error) {
        throw error;
      }
    }
  );

  
  export const fetchUserDataAsync = createAsyncThunk('user/fetchUserData', async () => {
    try {
      const response = await getUserData();
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  });
  
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(registerUserAsync.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(registerUserAsync.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
        })
        .addCase(registerUserAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })
        .addCase(loginUserAsync.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(loginUserAsync.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
        })
        .addCase(loginUserAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })
        .addCase(fetchUserDataAsync.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchUserDataAsync.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
        })
        .addCase(fetchUserDataAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    },
  });



  export default userSlice.reducer;

//   export { registerUserAsync, loginUserAsync, fetchUserDataAsync };
