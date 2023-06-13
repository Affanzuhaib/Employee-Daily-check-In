import React, { useState } from 'react';
import { registerUserAsync } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const Signup = ({onClose}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [department, setDepartment] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [role, setRole] = useState('Employee');


  // const [open, setOpen] = useState(false);
 
  // const handleOpen = () => setOpen(!open);


  const handleModalClose = () => {
    // Close the modal
    onClose();
  };


  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUserAsync({ name, email, password, contact, department, joiningDate, role }));
    // Perform form submission logic here
    // You can access the form values using the state variables (name, email, password, etc.)

    // Reset the form
    setName('');
    setEmail('');
    setPassword('');
    setContact('');
    setDepartment('');
    setJoiningDate('');
    setRole('Employee');
  };

  return (
    // <div className='fixed inset-0 flex items-center justify-center z-50 overflow-y-auto verflow-x-hidden outline-none'>
    <div className='fixed left-0 top-0 z-[1055] justify-center flex h-full w-full overflow-y-auto overflow-x-hidden outline-none'>
    <div className='w-full max-w-sm p-6 bg-white rounded-md shadow-md'>
    <div className='flex justify-between items-center mb-4'>
      <h1 className='text-2xl font-semibold text-center text-gray-700'>Create an account</h1>
    <button
            onClick={handleModalClose}
            className='text-gray-500 hover:text-gray-700 focus:outline-none'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      <form className='mt-6' onSubmit={handleSubmit}>
        <div className='mb-2'>
          <label htmlFor='name' className='block text-sm font-semibold text-gray-800'>
            Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='email' className='block text-sm font-semibold text-gray-800'>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='password' className='block text-sm font-semibold text-gray-800'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
            placeholder='Password must be at least 8 characters long'
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='contact' className='block text-sm font-semibold text-gray-800'>
            Contact
          </label>
          <input
            type='text'
            id='contact'
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='department' className='block text-sm font-semibold text-gray-800'>
            Department
          </label>
          <input
            type='text'
            id='department'
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='joiningDate' className='block text-sm font-semibold text-gray-800'>
            Joining Date
          </label>
          <input
            type='text'
            id='joiningDate'
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>
        <div className='mb-2'>
          <label htmlFor='role' className='block text-sm font-semibold text-gray-800'>
            Role
          </label>
          <select
            id='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
          >
            <option value='Employee'>Employee</option>
            <option value='Admin'>Admin</option>
          </select>
        </div>
        <div className='mt-6'>
          <button className='w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600'>
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>

  );
};

Signup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Signup;
