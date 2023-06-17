// // workSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Define your API base URL
// const apiUrl = 'http://localhost:5000/api';

// // Fetch works from the backend
// export const fetchWorks = createAsyncThunk('work/fetchWorks', async () => {
//   const response = await axios.get(`${apiUrl}/work`);
//   return response.data;
// });

// // Create, update, and delete works
// export const createWork = createAsyncThunk('work/createWork', async (workData) => {
//   const response = await axios.post(`${apiUrl}/work`, workData);
//   return response.data;
// });

// export const updateWork = createAsyncThunk('work/updateWork', async (workData) => {
//   const response = await axios.put(`${apiUrl}/work/${workData.id}`, workData);
//   return response.data;
// });

// export const deleteWork = createAsyncThunk('work/deleteWork', async (workId) => {
//   await axios.delete(`${apiUrl}/works/${workId}`);
//   return workId;
// });

// // Define the initial state
// const initialState = {
//   works: [],
//   loading: false,
//   error: null,
// };

// // Create the work slice
// const workSlice = createSlice({
//   name: 'work',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWorks.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchWorks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.works = action.payload;
//       })
//       .addCase(fetchWorks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(createWork.fulfilled, (state, action) => {
//         state.works.push(action.payload);
//       })
//       .addCase(updateWork.fulfilled, (state, action) => {
//         const updatedWork = action.payload;
//         const index = state.works.findIndex((work) => work._id === updatedWork._id);
//         if (index !== -1) {
//           state.works[index] = updatedWork;
//         }
//       })
//       .addCase(deleteWork.fulfilled, (state, action) => {
//         const deletedWorkId = action.payload;
//         state.works = state.works.filter((work) => work._id !== deletedWorkId);
//       });
//   },
// });

// // Export the actions and reducer
// export const workActions = {
//   ...workSlice.actions,
//   fetchWorks,
//   createWork,
//   updateWork,
//   deleteWork,
// };

// export default workSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:5000';

// Define the initial state
const initialState = {
  works: [],
  loading: false,
  error: null,
};

// Helper function to get the bearer token from the Redux store
const getBearerToken = (getState) => {
  const token = getState().auth.user.token;
  return `Bearer ${token}`;
};

// Create an async thunk to fetch works from the backend
export const fetchWorks = createAsyncThunk(
  'works/fetchWorks',
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/work`, {
        headers: {
          Authorization: getBearerToken(getState),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchWorksById = createAsyncThunk(
  'works/fetchWorksById',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/users/works/${userId}`, {
        headers: {
          Authorization: getBearerToken(getState),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Create an async thunk to create a new work
export const createWork = createAsyncThunk(
  'works/createWork',
  async (workData, { rejectWithValue, getState }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/work`, workData, {
        headers: {
          Authorization: getBearerToken(getState),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Create an async thunk to update a work
export const updateWork = createAsyncThunk(
  'works/updateWork',
  async (workData, { rejectWithValue, getState }) => {
    try {
      const response = await axios.put(`${apiUrl}/api/work/${workData.id}`, workData, {
        headers: {
          Authorization: getBearerToken(getState),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Create an async thunk to delete a work
export const deleteWork = createAsyncThunk(
  'works/deleteWork',
  async (id, { rejectWithValue, getState }) => {
    try {
      await axios.delete(`${apiUrl}/api/work/${id}`, {
        headers: {
          Authorization: getBearerToken(getState),
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Create a slice for works
const workSlice = createSlice({
  name: 'works',
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
        state.error = null;
        state.works = action.payload;
      })
      .addCase(fetchWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createWork.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWork.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.works.push(action.payload);
      })
      .addCase(createWork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateWork.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWork.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.works.findIndex((work) => work._id === action.payload._id);
        if (index !== -1) {
          state.works[index] = action.payload;
        }
      })
      .addCase(updateWork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteWork.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWork.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.works = state.works.filter((work) => work._id !== action.payload);
      })
      .addCase(deleteWork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchWorksById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorksById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.works = action.payload;
      })
      .addCase(fetchWorksById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions and reducer
export const { actions: workActions, reducer: workReducer } = workSlice;
export default workSlice.reducer;
