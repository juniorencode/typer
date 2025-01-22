import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export const Chart = ({ data }) => {
  const chartData = {
    labels: data.map(point => point.time),
    datasets: [
      {
        label: 'WPM',
        data: data.map(point => point.value),
        borderColor: '#00BE73',
        backgroundColor: '#00BE73',
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: context => ` ${context.raw} WPM`
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.4)',
          maxTicksLimit: 25
        },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      y: {
        ticks: { color: 'rgba(255, 255, 255, 0.4)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        beginAtZero: true,
        min: 0
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 px-4 py-6 w-full border rounded-xl bg-black/60 border-white/10">
      <span className="text-white">Words Per Minute</span>
      <div className="h-[200px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired
};
