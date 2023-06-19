import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorks } from '../features/working/workslice';

export function Stackedbar() {
  const dispatch = useDispatch();
  const works = useSelector((state) => state.work.works);

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [], // To be populated dynamically
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      legend: {
        position: 'top',
      },
      fill: {
        opacity: 1,
      },
    },
    series: [],
  });

  useEffect(() => {
    dispatch(fetchWorks());
  }, [dispatch]);

  useEffect(() => {
    const taskNames = ['Not Working', 'Working', 'Meeting'];
    const weeklyData = {
      categories: [], // To be populated dynamically
      tasks: taskNames.map((taskName) => ({
        name: taskName,
        data: [],
      })),
    };

    // Calculate the week range based on available works data
    const startDate = works.length > 0 ? works[0].start_date : '';
    const endDate = works.length > 0 ? works[works.length - 1].start_date : '';
    const weekRange = generateWeekRange(startDate, endDate);

    // Populate the data for each task and week
    works.forEach((work, index) => {
      const taskIndex = index % taskNames.length;
      const weekIndex = Math.floor(index / taskNames.length);

      if (!weeklyData.categories.includes(weekIndex)) {
        weeklyData.categories.push(weekIndex);
      }

      weeklyData.tasks[taskIndex].data.push(work.time_taken);
    });

    // Set the chart options and series data
    setChartData((prevChartData) => ({
      ...prevChartData,
      options: {
        ...prevChartData.options,
        xaxis: {
          categories: weekRange,
        },
      },
      series: weeklyData.tasks.map((task) => ({
        name: task.name,
        data: task.data,
      })),
    }));
  }, [works]);

  // Generate week range based on start and end date
  const generateWeekRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const weekRange = [];
    let currentDate = start;

    while (currentDate <= end) {
      weekRange.push(getWeekString(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
    }

    return weekRange;
  };

  // Format date as week string (e.g., "Week 1")
  const getWeekString = (date) => {
    const weekNumber = Math.ceil((date.getDate() + (date.getDay() + 1)) / 7);
    return 'Week' + { weekNumber };
  };

  return (
    <div>
      <h2>Weekly Activity</h2>
      <Chart options={chartData.options} series={chartData.series} type='bar' height={350} />
    </div>
  );
}
