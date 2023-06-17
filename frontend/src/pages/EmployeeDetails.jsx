import React from 'react'

function EmployeeDetails({ selectedEmployee }) {
  return (
    <div>
    <div>
      {selectedEmployee && (
        <>
          <h2>Pie Chart for {selectedEmployee.name}</h2>
          <Pie data={selectedEmployee.pieChartData} />

          <h2>Stacked Bar Chart for {selectedEmployee.name}</h2>
          <StackedBarChart data={selectedEmployee.stackedBarData} />
        </>
      )}
    </div>
    </div>
  )
}

export default EmployeeDetails