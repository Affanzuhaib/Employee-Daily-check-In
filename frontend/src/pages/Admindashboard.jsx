import React from 'react';
import Sidebar from '../components/SidebarAdmin';
import { PieChart } from './pieChart';
import { Stackedbar } from './Stackedbar';

const AdminDashboard = () => {


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
                <h1 className='text-lg font-semibold'>Admin Dashboard</h1>
              </div>
              <div className='flex items-center'>{/*navbar content*/}</div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className='container mx-auto px-4 py-4'>
          <PieChart />
          <Stackedbar />
          {/*page content*/}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
