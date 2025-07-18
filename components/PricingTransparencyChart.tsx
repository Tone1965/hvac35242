import React from 'react';

export const PricingTransparencyChart: React.FC = () => {
  return (
    <div className="pricing-chart-container bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Birmingham HVAC Service Pricing Guide</h2>
        <p className="text-gray-600">
          Transparent pricing for all services. Call{' '}
          <a href="tel:205-835-0111" className="text-blue-600 font-bold">
            (205) 835-0111
          </a>{' '}
          for a free quote\!
        </p>
      </div>
      <div className="chart-wrapper" style={{ height: '400px' }}>
        <div className="flex items-center justify-center h-full text-gray-500">
          Pricing chart will be loaded dynamically
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500 text-center">
        * Prices vary based on system type, home size, and specific issues
      </div>
    </div>
  );
};
