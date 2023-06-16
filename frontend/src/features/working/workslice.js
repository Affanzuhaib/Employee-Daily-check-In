// workSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define your API base URL
const apiUrl = 'http://localhost:5000/api';

// Fetch works from the backend
export const fetchWorks = createAsyncThunk('work/fetchWorks', async () => {
  const response = await axios.get(`${apiUrl}/work`);
  return response.data;
});

// Create, update, and delete works
export const createWork = createAsyncThunk('work/createWork', async (workData) => {
  const response = await axios.post(`${apiUrl}/work`, workData);
  return response.data;
});

export const updateWork = createAsyncThunk('work/updateWork', async (workData) => {
  const response = await axios.put(`${apiUrl}/work/${workData.id}`, workData);
  return response.data;
});

export const deleteWork = createAsyncThunk('work/deleteWork', async (workId) => {
  await axios.delete(`${apiUrl}/works/${workId}`);
  return workId;
});

// Define the initial state
const initialState = {
  works: [],
  loading: false,
  error: null,
};

// Create the work slice
const workSlice = createSlice({
  name: 'work',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorks.fulfilled, (state, action) => {
        state.loading = false;
        state.works = action.payload;
      })
      .addCase(fetchWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createWork.fulfilled, (state, action) => {
        state.works.push(action.payload);
      })
      .addCase(updateWork.fulfilled, (state, action) => {
        const updatedWork = action.payload;
        const index = state.works.findIndex((work) => work._id === updatedWork._id);
        if (index !== -1) {
          state.works[index] = updatedWork;
        }
      })
      .addCase(deleteWork.fulfilled, (state, action) => {
        const deletedWorkId = action.payload;
        state.works = state.works.filter((work) => work._id !== deletedWorkId);
      });
  },
});

// Export the actions and reducer
export const workActions = {
  ...workSlice.actions,
  fetchWorks,
  createWork,
  updateWork,
  deleteWork,
};

export default workSlice.reducer;
