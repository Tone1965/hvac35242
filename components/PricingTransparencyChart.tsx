import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export const PricingTransparencyChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Emergency Repair', 'AC Installation', 'Heating Repair', 'Maintenance', 'Duct Cleaning'],
            datasets: [
              {
                label: 'Our Pricing',
                data: [350, 4500, 275, 150, 400],
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1
              },
              {
                label: 'Industry Average',
                data: [450, 5800, 385, 200, 550],
                backgroundColor: 'rgba(239, 68, 68, 0.8)',
                borderColor: 'rgb(239, 68, 68)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Transparent Pricing - Birmingham HVAC',
                font: { size: 18 }
              },
              legend: {
                display: true,
                position: 'top'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Price ($)'
                }
              }
            }
          }
        });
      }
    }
  }, []);

  return (
    <div className="pricing-chart-container bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4 text-center">
        <p className="text-gray-600">
          See how our transparent pricing compares to industry averages.
        </p>
      </div>
      <div style={{ height: '400px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          All prices include parts and labor. No hidden fees.
        </p>
      </div>
    </div>
  );
};