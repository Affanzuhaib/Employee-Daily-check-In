import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';

export default function Slidebaremployee() {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if(!user){
  //       navigate('/')
  //     }
  // }, [user])
  return (
    <div className='bg-gray-800 text-white w-64 flex-none'>
      {/* Sidebar Content */}
      <div className='flex flex-col h-screen'>
        <div className='p-4'>
          <h2 className='text-lg font-semibold'>Employee Dashboard</h2>
        </div>
        <nav className='flex-1'>
          <ul className='space-y-2'>
            <li>
              <Link
                to='/dashboard'
                className='block py-2 px-4 rounded transition duration-200 hover:bg-gray-700'
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to='/Worktask'
                className='block py-2 px-4 rounded transition duration-200 hover:bg-gray-700'
              >
                Work Task
              </Link>
            </li>
            <li>
              <Link
                to='#'
                className='block py-2 px-4 rounded transition duration-200 hover:bg-gray-700'
              >
                <button onClick={() => dispatch(logoutUser())}>logout</button>
              </Link>
            </li>
            {/* Add more sidebar links as needed */}
          </ul>
        </nav>
      </div>
    </div>
  );
}
