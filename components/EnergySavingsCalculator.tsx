import React, { useState } from 'react';

export const EnergySavingsCalculator: React.FC = () => {
  const [monthlyBill, setMonthlyBill] = useState<number>(200);
  const [systemAge, setSystemAge] = useState<number>(10);
  
  // Calculate savings based on system age and efficiency
  const calculateSavings = () => {
    let savingsPercent = 0;
    
    if (systemAge >= 15) {
      savingsPercent = 0.35; // 35% savings for very old systems
    } else if (systemAge >= 10) {
      savingsPercent = 0.25; // 25% savings for old systems
    } else if (systemAge >= 5) {
      savingsPercent = 0.15; // 15% savings for mid-age systems
    } else {
      savingsPercent = 0.10; // 10% savings for newer systems
    }
    
    const monthlySavings = monthlyBill * savingsPercent;
    const annualSavings = monthlySavings * 12;
    const fiveYearSavings = annualSavings * 5;
    
    return {
      monthly: monthlySavings,
      annual: annualSavings,
      fiveYear: fiveYearSavings,
      percent: savingsPercent * 100
    };
  };
  
  const savings = calculateSavings();
  
  // Generate SVG visualization
  const generateSVG = () => {
    const maxHeight = 200;
    const currentHeight = maxHeight;
    const newHeight = maxHeight * (1 - savings.percent / 100);
    
    return (
      <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto">
        {/* Background */}
        <rect x="0" y="0" width="400" height="300" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="2" rx="8"/>
        
        {/* Title */}
        <text x="200" y="30" textAnchor="middle" className="text-lg font-bold" fill="#1f2937">
          Your Potential Energy Savings
        </text>
        
        {/* Current Bill Bar */}
        <g transform="translate(80, 50)">
          <rect x="0" y={250 - currentHeight} width="80" height={currentHeight} 
                fill="#ef4444" opacity="0.8" rx="4"/>
          <text x="40" y="270" textAnchor="middle" className="text-sm font-semibold" fill="#1f2937">
            Current
          </text>
          <text x="40" y={240 - currentHeight} textAnchor="middle" className="text-sm font-bold" fill="#ef4444">
            ${monthlyBill}
          </text>
        </g>
        
        {/* New Bill Bar */}
        <g transform="translate(240, 50)">
          <rect x="0" y={250 - newHeight} width="80" height={newHeight} 
                fill="#10b981" opacity="0.8" rx="4"/>
          <text x="40" y="270" textAnchor="middle" className="text-sm font-semibold" fill="#1f2937">
            After Upgrade
          </text>
          <text x="40" y={240 - newHeight} textAnchor="middle" className="text-sm font-bold" fill="#10b981">
            ${(monthlyBill - savings.monthly).toFixed(0)}
          </text>
        </g>
        
        {/* Savings Arrow */}
        <g transform="translate(160, 100)">
          <path d="M 0 0 L 80 0" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          <text x="40" y="-10" textAnchor="middle" className="text-sm font-bold" fill="#10b981">
            Save {savings.percent}%
          </text>
        </g>
        
        {/* Arrow marker */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#10b981"/>
          </marker>
        </defs>
      </svg>
    );
  };
  
  return (
    <div className="energy-savings-calculator bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-6">
        Calculate Your Energy Savings
      </h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Monthly Energy Bill
          </label>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">$</span>
            <input
              type="range"
              min="50"
              max="500"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              className="flex-1"
            />
            <span className="font-bold text-lg w-16 text-right">${monthlyBill}</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current System Age (Years)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="1"
              max="25"
              value={systemAge}
              onChange={(e) => setSystemAge(Number(e.target.value))}
              className="flex-1"
            />
            <span className="font-bold text-lg w-16 text-right">{systemAge} yrs</span>
          </div>
        </div>
      </div>
      
      {/* SVG Visualization */}
      <div className="mb-6">
        {generateSVG()}
      </div>
      
      {/* Savings Summary */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-bold text-green-900 mb-3">Your Estimated Savings:</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              ${savings.monthly.toFixed(0)}
            </div>
            <div className="text-sm text-gray-600">Per Month</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              ${savings.annual.toFixed(0)}
            </div>
            <div className="text-sm text-gray-600">Per Year</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              ${savings.fiveYear.toFixed(0)}
            </div>
            <div className="text-sm text-gray-600">Over 5 Years</div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 mb-3">
          Ready to start saving on your energy bills?
        </p>
        <a
          href="tel:205-835-0111"
          className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Call (205) 835-0111 for Free Consultation
        </a>
      </div>
    </div>
  );
};