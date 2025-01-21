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

export const Chart = () => {
  const data = [
    { time: 0, value: 40 },
    { time: 1, value: 40 },
    { time: 2, value: 41 },
    { time: 3, value: 41 },
    { time: 4, value: 42 },
    { time: 5, value: 42 },
    { time: 6, value: 43 },
    { time: 7, value: 43 },
    { time: 8, value: 44 },
    { time: 9, value: 44 },
    { time: 10, value: 45 },
    { time: 11, value: 45 },
    { time: 12, value: 46 },
    { time: 13, value: 46 },
    { time: 14, value: 47 },
    { time: 15, value: 47 },
    { time: 16, value: 48 },
    { time: 17, value: 48 },
    { time: 18, value: 49 },
    { time: 19, value: 49 },
    { time: 20, value: 50 },
    { time: 21, value: 51 },
    { time: 22, value: 52 },
    { time: 23, value: 53 },
    { time: 24, value: 54 },
    { time: 25, value: 55 },
    { time: 26, value: 56 },
    { time: 27, value: 57 },
    { time: 28, value: 58 },
    { time: 29, value: 59 },
    { time: 30, value: 60 },
    { time: 31, value: 59 },
    { time: 32, value: 59 },
    { time: 33, value: 58 },
    { time: 34, value: 58 },
    { time: 35, value: 57 },
    { time: 36, value: 57 },
    { time: 37, value: 56 },
    { time: 38, value: 56 },
    { time: 39, value: 55 },
    { time: 40, value: 58 },
    { time: 41, value: 57 },
    { time: 42, value: 57 },
    { time: 43, value: 57 },
    { time: 44, value: 57 },
    { time: 45, value: 57 }
  ];

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
