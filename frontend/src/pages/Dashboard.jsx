import React from 'react';
import Slidebaremployee from '../components/Slidebaremployee';
import { PieChart } from './pieChart';
import { Stackedbar } from './Stackedbar';

function Dashboard() {

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
        <div className='container mx-auto p-4'>
          <div className='grid grid-cols-2 gap-8'>
            <div>
              <h2 className='text-lg font-semibold mb-2'>Pie Chart</h2>
              <div className='bg-white p-4 rounded-lg shadow'>
                <PieChart />
              </div>
            </div>

            <div>
              <h2 className='text-lg font-semibold mb-2'>Stacked Bar Chart</h2>
              <div className='bg-white p-4 rounded-lg shadow'>
                <Stackedbar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
