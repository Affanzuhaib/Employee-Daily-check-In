import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, getAllEmployees } from './authService';

// Async thunk for user registration
export const registerUserAsync = createAsyncThunk(
  'user/registerUser',
  async (
    { name, email, password, contact, department, joiningDate, role },
    { rejectWithValue, getState },
  ) => {
    try {
      const token = getState().auth.user.token;
      const user = await registerUser(
        name,
        email,
        password,
        contact,
        department,
        joiningDate,
        role,
        token,
      );
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Async thunk for user authentication
export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await loginUser(email, password);
      return user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

// Async thunk for user fetching
export const fetchAllEmployees = createAsyncThunk(
  'user/fetchEmployees',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      const users = await getAllEmployees(token);
      return users;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const user = JSON.parse(localStorage.getItem('user'));

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
      state.error = action.payload ? action.payload : action.error;
    });
    // Reducer for users fetching
    builder.addCase(fetchAllEmployees.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchAllEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error;
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
