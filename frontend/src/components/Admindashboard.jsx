// import React from 'react'

// function Admindashboard() {
//   return (
//     <div>Admindashboard</div>
//   )
// }

// export default Admindashboard

import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 flex-none">
        {/* Sidebar Content */}
        <div className="flex flex-col h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          </div>
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700"
                >
                  Users
                </Link>
              </li>
              {/* Add more sidebar links as needed */}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-100">
        {/* Navbar */}
        <nav className="bg-white shadow">
          <div className="container mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex items-center">
                <h1 className="text-lg font-semibold">Admin Dashboard</h1>
              </div>
              <div className="flex items-center">
                {/* Add your navbar content here */}
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="container mx-auto px-4 py-4">
          {/* Add your page content components here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
