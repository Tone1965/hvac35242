import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export const SeasonalDemandChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'AC Service Calls',
                data: [20, 25, 40, 120, 280, 450, 580, 520, 250, 80, 30, 25],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
              },
              {
                label: 'Heating Service Calls',
                data: [480, 420, 280, 80, 30, 20, 15, 18, 50, 180, 380, 520],
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true
              },
              {
                label: 'Maintenance Calls',
                data: [150, 140, 280, 320, 180, 120, 100, 110, 290, 310, 160, 140],
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.4,
                fill: true
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Birmingham HVAC Service Demand by Season',
                font: { size: 18 }
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Service Calls'
                }
              }
            }
          }
        });
      }
    }
  }, []);

  return (
    <div className="seasonal-chart-container bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4 text-center">
        <p className="text-gray-600">
          Plan ahead! See when Birmingham residents need HVAC services most.
        </p>
      </div>
      <div style={{ height: '400px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-blue-50 p-3 rounded">
          <strong className="text-blue-700">Summer Tip:</strong> Schedule AC maintenance in spring before the rush!
        </div>
        <div className="bg-red-50 p-3 rounded">
          <strong className="text-red-700">Winter Tip:</strong> Get heating checked in fall to avoid breakdowns.
        </div>
      </div>
    </div>
  );
};