import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Adminpie } from './adminpie';
import { AdminStacked } from './AdminStacked';

export default function Table() {
  const { users } = useSelector((state) => state.auth);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user._id);
  };

  return (
    <div>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
            >
              ID
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
            >
              Name
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
            >
              Email
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
            >
              department
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
            >
              Joining Date
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase '
            >
              Edit
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase '
            >
              Delete
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap'>
                {' '}
                {index + 1}{' '}
              </td>
              <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                <button onClick={() => handleUserClick(user)} className='text-blue-500'>
                  {user.name}
                </button>
              </td>
              <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{user.email}</td>
              <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                {user.department}
              </td>
              <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                {user.joining_date}
              </td>
              <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
                <a className='text-green-500 hover:text-green-700' href='#'>
                  Edit
                </a>
              </td>
              <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
                <a className='text-red-500 hover:text-red-700' href='#'>
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Popup window */}
      {selectedUser && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-8'>
            <div className='container mx-auto p-4'>
              <div className='grid grid-cols-2 gap-8'>
                <div>
                  <h2 className='text-lg font-semibold mb-2'>Pie Chart</h2>
                  <div className='bg-white p-4 rounded-lg shadow'>
                    <Adminpie userId={selectedUser} />
                  </div>
                </div>

                <div>
                  <h2 className='text-lg font-semibold mb-2'>Stacked Bar Chart</h2>
                  <div className='bg-white p-4 rounded-lg shadow'>
                    <AdminStacked userId={selectedUser} />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
