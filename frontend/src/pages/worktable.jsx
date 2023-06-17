import React from 'react';
import { useSelector } from 'react-redux';

function WorkTable() {
  const { works } = useSelector((state) => state.work);

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 864e5).toISOString().split('T')[0];

  // Filter works to get only today and yesterday's work
  const filteredWorks = works.filter(
    (work) => work.start_date === today || work.start_date === yesterday,
  );

  // Sort the filteredWorks array by date and time
  filteredWorks.sort((a, b) => {
    const dateA = new Date(a.start_date);
    const dateB = new Date(b.start_date);
    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    } else {
      const [hourA, minuteA] = a.start_time.split(':');
      const [hourB, minuteB] = b.start_time.split(':');
      return new Date(2000, 0, 1, hourA, minuteA) - new Date(2000, 0, 1, hourB, minuteB);
    }
  });

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
              Description
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
            >
              Task
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
            >
              Start Time
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
            >
              Date
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
            >
              Time Taken
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
          {filteredWorks.map((work, index) => (
            <tr key={work._id}>
              <td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap'>
                {' '}
                {index + 1}{' '}
              </td>
              <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{work.desc}</td>
              <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{work.task}</td>
              <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                {work.start_time}
              </td>
              <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                {work.start_date}
              </td>
              <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
                {work.time_taken}
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
    </div>
  );
}

export default WorkTable;

// import React from 'react';
// import { useSelector } from 'react-redux';

// function UsersTable() {
//   const { works } = useSelector((state) => state.work);
//   const today = new Date().toISOString().split('T')[0];
//   const yesterday = new Date(Date.now() - 864e5).toISOString().split('T')[0];

//   // Filter works to get only today and yesterday's work
//   const filteredWorks = works
//   .filter((work) => work.start_date === today || work.start_date === yesterday)
//   .sort((a, b) => {
//     const dateA = new Date(a.start_date);
//     const dateB = new Date(b.start_date);
//     if (dateA.getTime() !== dateB.getTime()) {
//       return dateA - dateB;
//     }

//     const timeA = new Date(`1970-01-01T${a.start_time}`);
//     const timeB = new Date(`1970-01-01T${b.start_time}`);
//     return timeA - timeB;
//   });

//   return (
//     <div>
//       <table className='min-w-full divide-y divide-gray-200'>
//         <thead className='bg-gray-50'>
//           <tr>
//             <th
//               scope='col'
//               className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
//             >
//               ID
//             </th>
//             <th
//               scope='col'
//               className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
//             >
//               Description
//             </th>
//             <th
//               scope='col'
//               className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
//             >
//               Task
//             </th>
//             <th
//               scope='col'
//               className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
//             >
//               Start Time
//             </th>
//             <th
//               scope='col'
//               className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
//             >
//               Date
//             </th>
//             <th
//               scope='col'
//               className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
//             >
//               Time Taken
//             </th>
//             <th
//               scope='col'
//               className='px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase '
//             >
//               Edit
//             </th>
//             <th
//               scope='col'
//               className='px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase '
//             >
//               Delete
//             </th>
//           </tr>
//         </thead>
//         <tbody className='divide-y divide-gray-200'>
//           {filteredWorks.map((work, index) => (
//             <tr key={work._id}>
//               <td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap'>
//                 {' '}
//                 {index + 1}{' '}
//               </td>
//               <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{work.desc}</td>
//               <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>{work.task}</td>
//               <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
//                 {work.start_time}
//               </td>
//               <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
//                 {work.start_date}
//               </td>
//               <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
//                 {work.time_taken}
//               </td>
//               <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
//                 <a className='text-green-500 hover:text-green-700' href='#'>
//                   Edit
//                 </a>
//               </td>
//               <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
//                 <a className='text-red-500 hover:text-red-700' href='#'>
//                   Delete
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default UsersTable;
