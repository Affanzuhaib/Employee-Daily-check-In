import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';

export default function Sidebar() {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/');
  //   }
  // }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };
  return (
    <div className='bg-gray-800 text-white w-64 flex-none'>
      {/* Sidebar Content */}
      <div className='flex flex-col h-screen'>
        <div className='p-4'>
          <h2 className='text-lg font-semibold'>Admin Dashboard</h2>
        </div>
        <nav className='flex-1'>
          <ul className='space-y-2'>
            <li>
              <Link
                to='/admindashboard'
                className='block py-2 px-4 rounded transition duration-200 hover:bg-gray-700'
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to='/users'
                className='block py-2 px-4 rounded transition duration-200 hover:bg-gray-700'
              >
                Users
              </Link>
            </li>
            <li>
              <Link>
              <button
                onClick={handleLogout}
                className='block py-2 px-4 rounded transition duration-200 hover:bg-gray-700'
              >
                Logout
              </button>
              </Link>
            </li>
            {/* Add more sidebar links as needed */}
          </ul>
        </nav>
      </div>
    </div>
  );
}
