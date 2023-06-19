import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Slidebaremployee from '../components/Slidebaremployee';
import Addtask from './Addtask';
import { fetchWorks } from '../features/working/workslice';
import WorkTable from './worktable';

function Worktask() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchWorks());
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
      <Slidebaremployee />

      {/* Main Content */}
      <div className='flex-grow bg-gray-100'>
        {/* Navbar */}
        <nav className='bg-white shadow'>
          <div className='container mx-auto px-4'>
            <div className='flex justify-between'>
              <div className='flex items-center'>
                <h1 className='text-lg font-semibold'>Work</h1>
              </div>
              <div className='flex items-center'>
                <button
                  onClick={handleAddEmployee}
                  className='py-2 px-4 rounded transition duration-200 bg-blue-500 text-white hover:bg-blue-600'
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className='container mx-auto px-4 py-4'>
          {/*page content components*/}
          <WorkTable />
        </div>
      </div>

      {/* Modal */}
      {showModal && <Addtask onClose={handleCloseModal} />}
    </div>
  );
}

export default Worktask;
