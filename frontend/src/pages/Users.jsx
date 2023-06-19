import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllEmployees } from '../features/auth/authSlice';
import Sidebar from '../components/SidebarAdmin';
import Signup from './Signup';
import Table from './UsersTable';

const Users = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  const handleAddEmployee = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className='flex-grow bg-gray-100'>
        {/* Navbar */}
        <nav className='bg-white shadow'>
          <div className='container mx-auto px-4'>
            <div className='flex justify-between'>
              <div className='flex items-center'>
                <h1 className='text-lg font-semibold'>Users</h1>
              </div>
              <div className='flex items-center'>
                <button
                  onClick={handleAddEmployee}
                  className='py-2 px-4 rounded transition duration-200 bg-blue-500 text-white hover:bg-blue-600'
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className='container mx-auto px-4 py-4'>
          {/*page content components*/}
          <Table />
        </div>
      </div>

      {/* Modal */}
      {showModal && <Signup onClose={handleCloseModal} />}
    </div>
  );
};

export default Users;
