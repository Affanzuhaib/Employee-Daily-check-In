import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchWorksById } from '../features/working/workslice';
import { Chart, ArcElement, Tooltip, Title, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
Chart.register(ArcElement, Tooltip, Title, Legend);

export function Adminpie({userId}) {
  const dispatch = useDispatch();
  const works = useSelector((state) => state.work.works);

  const [breakTimeCurrentDay, setBreakTimeCurrentDay] = useState(0);
  const [meetingTimeCurrentDay, setMeetingTimeCurrentDay] = useState(0);
  const [workTimeCurrentDay, setWorkTimeCurrentDay] = useState(0);

  const [breakTimePreviousDay, setBreakTimePreviousDay] = useState(0);
  const [meetingTimePreviousDay, setMeetingTimePreviousDay] = useState(0);
  const [workTimePreviousDay, setWorkTimePreviousDay] = useState(0);

//   useEffect(() => {
//     dispatch(fetchWorksById());
//   }, [dispatch]);  
    useEffect(() => {
        if (userId) {
        dispatch(fetchWorksById({ userId }));
        }
    }, [userId, dispatch]);
  useEffect(() => {
    // Calculate total time for current day
    const currentDateWorks = works.filter((work) => work.start_date === getCurrentDate());
    const currentDayBreakTime = calculateTotalTime(currentDateWorks, 'Break');
    const currentDayMeetingTime = calculateTotalTime(currentDateWorks, 'Meeting');
    const currentDayWorkTime = calculateTotalTime(currentDateWorks, 'Work');

    setBreakTimeCurrentDay(currentDayBreakTime);
    setMeetingTimeCurrentDay(currentDayMeetingTime);
    setWorkTimeCurrentDay(currentDayWorkTime);

    // Calculate total time for previous day
    const previousDateWorks = works.filter((work) => work.start_date === getPreviousDate());
    const previousDayBreakTime = calculateTotalTime(previousDateWorks, 'Break');
    const previousDayMeetingTime = calculateTotalTime(previousDateWorks, 'Meeting');
    const previousDayWorkTime = calculateTotalTime(previousDateWorks, 'Work');

    setBreakTimePreviousDay(previousDayBreakTime);
    setMeetingTimePreviousDay(previousDayMeetingTime);
    setWorkTimePreviousDay(previousDayWorkTime);
  }, [works]);

  const getCurrentDate = () => {
    const today = new Date();
    const currentDate = today.toISOString().split('T')[0];
    return currentDate;
  };

  const getPreviousDate = () => {
    const yesterday = new Date(Date.now() - 864e5);
    const previousDate = yesterday.toISOString().split('T')[0];
    return previousDate;
  };

  const calculateTotalTime = (works, task) => {
    const filteredWorks = works.filter((work) => work.task === task);
    const totalTime = filteredWorks.reduce((sum, work) => sum + work.time_taken, 0);
    return totalTime;
  };

  const currentDateData = {
    labels: ['Break', 'Meeting', 'Work'],
    datasets: [
      {
        label: 'Current Day',
        data: [breakTimeCurrentDay, meetingTimeCurrentDay, workTimeCurrentDay],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const previousDateData = {
    labels: ['Break', 'Meeting', 'Work'],
    datasets: [
      {
        label: 'Previous Day',
        data: [breakTimePreviousDay, meetingTimePreviousDay, workTimePreviousDay],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Pie Chart</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <h2 className='text-lg font-semibold mb-2'>Current Day {getCurrentDate()}</h2>
          <div className='bg-white p-4 rounded-lg shadow'>
            <Pie data={currentDateData} height={350} />
          </div>
        </div>

        <div>
          <h2 className='text-lg font-semibold mb-2'>Previous Day {getPreviousDate()}</h2>
          <div className='bg-white p-4 rounded-lg shadow'>
            <Pie data={previousDateData} height={350} />
          </div>
        </div>
      </div>
    </div>
  );
}

Adminpie.propTypes = {
    userId: PropTypes.string.isRequired,
  };