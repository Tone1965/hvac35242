import React, { useState } from 'react';

interface Problem {
  id: number;
  issue: string;
  symptoms: string[];
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  solution: string;
  color: string;
}

export const CommonProblemsWheel: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  
  const problems: Problem[] = [
    {
      id: 1,
      issue: 'AC Not Cooling',
      symptoms: ['Warm air from vents', 'System running constantly', 'High energy bills'],
      urgency: 'high',
      solution: 'May need refrigerant recharge, compressor check, or filter replacement',
      color: '#ef4444'
    },
    {
      id: 2,
      issue: 'Strange Noises',
      symptoms: ['Banging', 'Squealing', 'Rattling', 'Clicking'],
      urgency: 'medium',
      solution: 'Could indicate loose parts, belt issues, or motor problems',
      color: '#f59e0b'
    },
    {
      id: 3,
      issue: 'System Won\'t Start',
      symptoms: ['No response', 'Thermostat blank', 'Breaker trips'],
      urgency: 'emergency',
      solution: 'Check power supply, thermostat batteries, or call for emergency service',
      color: '#dc2626'
    },
    {
      id: 4,
      issue: 'Poor Air Flow',
      symptoms: ['Weak airflow', 'Uneven cooling', 'Some rooms hot'],
      urgency: 'medium',
      solution: 'Dirty filters, blocked vents, or ductwork issues',
      color: '#3b82f6'
    },
    {
      id: 5,
      issue: 'Water Leaks',
      symptoms: ['Puddles near unit', 'Water stains', 'Musty smell'],
      urgency: 'high',
      solution: 'Clogged drain line, frozen coils, or condensate pump failure',
      color: '#8b5cf6'
    },
    {
      id: 6,
      issue: 'Bad Odors',
      symptoms: ['Musty smell', 'Burning odor', 'Rotten egg smell'],
      urgency: 'high',
      solution: 'Mold growth, electrical issues, or gas leak - needs immediate attention',
      color: '#ec4899'
    }
  ];
  
  const centerX = 200;
  const centerY = 200;
  const radius = 150;
  
  return (
    <div className="common-problems-wheel bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-6">
        Common HVAC Problems in Birmingham Homes
      </h3>
      
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Interactive Wheel */}
        <div className="relative">
          <svg viewBox="0 0 400 400" className="w-full max-w-md">
            {/* Background circle */}
            <circle cx={centerX} cy={centerY} r={radius} fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="2"/>
            
            {/* Problem segments */}
            {problems.map((problem, index) => {
              const angle = (index * 60 - 90) * (Math.PI / 180);
              const nextAngle = ((index + 1) * 60 - 90) * (Math.PI / 180);
              
              const x1 = centerX + radius * Math.cos(angle);
              const y1 = centerY + radius * Math.sin(angle);
              const x2 = centerX + radius * Math.cos(nextAngle);
              const y2 = centerY + radius * Math.sin(nextAngle);
              
              const midAngle = (angle + nextAngle) / 2;
              const textX = centerX + (radius * 0.7) * Math.cos(midAngle);
              const textY = centerY + (radius * 0.7) * Math.sin(midAngle);
              
              return (
                <g key={problem.id} className="cursor-pointer" onClick={() => setSelectedProblem(problem)}>
                  <path
                    d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
                    fill={selectedProblem?.id === problem.id ? problem.color : `${problem.color}88`}
                    stroke="white"
                    strokeWidth="3"
                    className="transition-all hover:opacity-100"
                    opacity={selectedProblem && selectedProblem.id !== problem.id ? 0.5 : 1}
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white font-semibold text-sm pointer-events-none"
                  >
                    {problem.issue}
                  </text>
                </g>
              );
            })}
            
            {/* Center circle */}
            <circle cx={centerX} cy={centerY} r="50" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
            <text x={centerX} y={centerY - 10} textAnchor="middle" className="font-bold text-gray-700">
              Click Any
            </text>
            <text x={centerX} y={centerY + 10} textAnchor="middle" className="font-bold text-gray-700">
              Problem
            </text>
          </svg>
        </div>
        
        {/* Problem Details */}
        <div className="flex-1 max-w-md">
          {selectedProblem ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: selectedProblem.color }}
                ></div>
                <h4 className="text-xl font-bold">{selectedProblem.issue}</h4>
                <span className={`px-2 py-1 rounded text-xs font-semibold text-white
                  ${selectedProblem.urgency === 'emergency' ? 'bg-red-600' : ''}
                  ${selectedProblem.urgency === 'high' ? 'bg-orange-600' : ''}
                  ${selectedProblem.urgency === 'medium' ? 'bg-yellow-600' : ''}
                  ${selectedProblem.urgency === 'low' ? 'bg-green-600' : ''}
                `}>
                  {selectedProblem.urgency.toUpperCase()}
                </span>
              </div>
              
              <div>
                <h5 className="font-semibold mb-2">Common Symptoms:</h5>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {selectedProblem.symptoms.map((symptom, idx) => (
                    <li key={idx}>{symptom}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-blue-50 p-3 rounded">
                <h5 className="font-semibold mb-1">Likely Solution:</h5>
                <p className="text-gray-700">{selectedProblem.solution}</p>
              </div>
              
              {selectedProblem.urgency === 'emergency' && (
                <div className="bg-red-50 border border-red-200 p-4 rounded">
                  <p className="text-red-800 font-semibold">
                    ⚠️ This requires immediate attention!
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p className="text-lg mb-4">Click on any problem in the wheel to see details</p>
              <p>Our Birmingham technicians handle all these issues and more!</p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-3">Having HVAC problems?</p>
            <a
              href="tel:205-835-0111"
              className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Call (205) 835-0111 for Fast Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};