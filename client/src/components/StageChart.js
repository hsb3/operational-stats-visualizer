import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StageChart({ stages }) {
  const [selectedData, setSelectedData] = useState('timeSpent');

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Project Stage Data',
      },
    },
  };

  const data = {
    labels: stages.map(stage => stage.name),
    datasets: [
      {
        label: selectedData.charAt(0).toUpperCase() + selectedData.slice(1).replace(/([A-Z])/g, ' $1'),
        data: stages.map(stage => parseFloat(stage[selectedData])),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="stage-chart">
      <h2>Project Stage Data</h2>
      <div>
        <label htmlFor="dataSelector">Select Data to Display: </label>
        <select
          id="dataSelector"
          value={selectedData}
          onChange={(e) => setSelectedData(e.target.value)}
        >
          <option value="timeSpent">Time Spent (hours)</option>
          <option value="timeElapsed">Time Elapsed (hours)</option>
          <option value="moneySpent">Money Spent ($)</option>
          <option value="rejections">Rejections</option>
        </select>
      </div>
      <Bar options={options} data={data} />
    </div>
  );
}

export default StageChart;
