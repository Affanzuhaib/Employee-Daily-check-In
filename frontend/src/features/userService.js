import axios from 'axios'

const userService = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your server URL
});


// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await userService.post('/api/users/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login a user
export const loginUser = async (credentials) => {
  try {
    const response = await userService.post('/api/users', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user data
export const getUserData = async () => {
  try {
    const response = await userService.get('/api/users');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};


