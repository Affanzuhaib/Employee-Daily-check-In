// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { PieChart } from './pieChart';
// import { Stackedbar } from './Stackedbar';

// function EmployeeDetails({ match }) {
//   const { userId } = match.params;
//   const { users } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   // Fetch the user data based on the user ID
//   useEffect(() => {
//     // Find the user with the matching ID
//     const selectedUser = users.find((user) => user._id === userId);

//     if (selectedUser) {
//       dispatch(fetchWorksById(userId));
//     }
//   }, [userId, users, dispatch]);

//   return (
//     <div>
//       {/* Render the pie chart and stacked bar chart using the fetched user data */}
//       {userId && (
//         <div>
//           <h2>Pie Chart for {userId}</h2>
//           <PieChart />

//           <h2>Stacked Bar Chart for {userId}</h2>
//           <Stackedbar />
//         </div>
//       )}
//     </div>
//   );
// }

// export default EmployeeDetails;

// import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import {  useDispatch } from 'react-redux';
// import { fetchWorksById } from '../features/working/workslice';
// import { PieChart } from './pieChart';
// import { Stackedbar } from './Stackedbar';

// function EmployeeDetails({ match }) {
//   // const { users } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (match) {
//       dispatch(fetchWorksById(match._id));
//     }
//   }, [match, dispatch]);

//   return (
//     <div>
//       {match && (
//         <div>
//           <h2>Pie Chart for {match._id}</h2>
//           <PieChart />

//           <h2>Stacked Bar Chart for {match._id}</h2>
//           <Stackedbar />
//         </div>
//       )}
//     </div>
//   );
// }

// EmployeeDetails.propTypes = {
//   match: PropTypes.object.isRequired,
// };

// export default EmployeeDetails;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { fetchWorksById } from '../features/working/workslice';
// import { PieChart } from './pieChart';
import { Stackedbar } from './Stackedbar';
import { PieChart } from './pieChart';

function EmployeeDetails({ userId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchWorksById({ userId }));
    }
  }, [userId, dispatch]);

  return (
    <div>
      {userId && (
        // <div>
        //   <h2>Pie Chart for {userId}</h2>
        //   {/* <PieChart /> */}

        //   <h2>Stacked Bar Chart for {userId}</h2>
        //   <Stackedbar />
        // </div>
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
      )}
    </div>
    
  );
}

EmployeeDetails.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default EmployeeDetails;
