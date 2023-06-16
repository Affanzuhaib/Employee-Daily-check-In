import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {  useNavigate } from 'react-router-dom';
// import { logoutUser } from '../features/auth/authSlice';
import Slidebaremployee from '../components/Slidebaremployee';

function Dashboard() {
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if(!user){
  //       navigate('/')
  //     }
  // }, [user])
  return (
    <div className='flex'>
      {/* Sidebar */}
      <Slidebaremployee />
      {/* Main Content */}
      <div className='flex-grow bg-gray-100'>
        {/* Navbar */}
        <nav className='bg-white shadow'>
          <div className='container mx-auto px-4'>
            <div className='flex justify-between'>
              <div className='flex items-center'>
                <h1 className='text-lg font-semibold'>Employee Dashboard</h1>
              </div>
              <div className='flex items-center'>{/* Add your navbar content here */}</div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className='container mx-auto px-4 py-4'>
          {/* Add your page content components here */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
