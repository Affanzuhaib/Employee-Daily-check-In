import axios from 'axios';

const API_URL = 'http://localhost:5000'

// Register a new user
export const registerUser = async (name, email, password, contact, department, joining_date,role) => {
  try {
    const response = await axios.post(API_URL + '/api/users/register', {
      name,
      email,
      password,
      contact,
      department,
      joining_date,
      role
    });

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
      password
    });
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    console.log(error)
    throw error.response.data.message;
  }
};
