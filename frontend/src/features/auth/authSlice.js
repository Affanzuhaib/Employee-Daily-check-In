import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './authService';

// Async thunk for user registration
export const registerUserAsync = createAsyncThunk(
  'user/registerUser',
  async ({ name, email, password, contact, department, joiningDate,role }, { rejectWithValue }) => {
    try {
      const user = await registerUser(name, email, password, contact, department, joiningDate,role);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk for user authentication
export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await loginUser(email, password);
      return user;
    } catch (error) {
        console.log(error)
      return rejectWithValue(error);
    }
  }
);

const user = JSON.parse(localStorage.getItem('user'))

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: user || null,
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Reducer for user registration
    builder.addCase(registerUserAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    });
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Reducer for user authentication
    builder.addCase(loginUserAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error;
    });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
