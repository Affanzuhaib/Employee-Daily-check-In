// import React, { useEffect, useState } from 'react';
// import { useDispatch} from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// import { fetchAllEmployees} from '../features/auth/authSlice';
// import Sidebar from '../components/SidebarAdmin';
// import Modal from 'react-modal';
// import Signup from './Signup';

// const Users = () => {
//   const dispatch = useDispatch();
//   // const { user, users } = useSelector((state) => state.auth);
//   const [showModal, setShowModal] = useState(false);

//   // const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchAllEmployees());
//   }, []);

//   // const handleLogout = () => {
//   //   dispatch(logoutUser());
//   //   navigate('/');
//   //  };
//   // const handleAddEmployee = () => {
//   //   navigate('/signup');
//   // };
//   const handleAddEmployee = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className='flex'>
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className='flex-grow bg-gray-100'>
//         {/* Navbar */}
//         <nav className='bg-white shadow'>
//           <div className='container mx-auto px-4'>
//             <div className='flex justify-between'>
//               <div className='flex items-center'>
//                 <h1 className='text-lg font-semibold'>Users</h1>
//               </div>
//               <div className='flex items-center'>
//                 <button
//                   onClick={handleAddEmployee}
//                   className='py-2 px-4 rounded transition duration-200 bg-blue-500 text-white hover:bg-blue-600'
//                 >
//                   Add Employee
//                 </button>
//               </div>
//             </div>
//           </div>
//         </nav>

//         {/* Page Content */}
//         <div className='container mx-auto px-4 py-4'>
//           {/* Add your page content components here */}
//         </div>
//         <Modal
//           isOpen={showModal}
//           onRequestClose={handleCloseModal}
//           contentLabel='Add Employee Modal'
//         >
//                     {/* Render the SignUp component */}
//                     <Signup />

//           <button onClick={handleCloseModal}>Close</button>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Users;
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { fetchAllEmployees } from '../features/auth/authSlice';
import Sidebar from '../components/SidebarAdmin';
// import SignupPopup from './SignupPopup';
import Signup from './Signup';
// import { Modal } from 'react-modal';
import Table from './Table';


const Users = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // const { user, users } = useSelector((state) => state.auth);
  // const { users } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  const handleAddEmployee = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   navigate('/');
  // };

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
          {/* Add your page content components here */}
          <Table/>
        </div> 
      </div>

      {/* Modal */}
      {/* <Modal></Modal> */}
      {showModal && <Signup onClose={handleCloseModal} />}
    </div>
  );
};

export default Users;
