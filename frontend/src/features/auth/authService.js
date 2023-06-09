import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Register a new user
export const registerUser = async (
  name,
  email,
  password,
  contact,
  department,
  joining_date,
  role,
  token,
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      API_URL + '/api/users/register',
      {
        name,
        email,
        password,
        contact,
        department,
        joining_date,
        role,
      },
      config,
    );

    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Authenticate a user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_URL + '/api/users', {
      email,
      password,
    });
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.message;
  }
};

// Authenticate a user
export const getAllEmployees = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + '/api/users/employees', config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.message;
  }
};
