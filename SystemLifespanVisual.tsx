import React from 'react';

interface SystemData {
  type: string;
  avgLifespan: number;
  withMaintenance: number;
  icon: string;
  color: string;
}

export const SystemLifespanVisual: React.FC = () => {
  const systems: SystemData[] = [
    { type: 'Central AC', avgLifespan: 12, withMaintenance: 18, icon: '❄️', color: 'blue' },
    { type: 'Gas Furnace', avgLifespan: 15, withMaintenance: 22, icon: '🔥', color: 'orange' },
    { type: 'Heat Pump', avgLifespan: 10, withMaintenance: 15, icon: '♻️', color: 'green' },
    { type: 'Ductwork', avgLifespan: 25, withMaintenance: 35, icon: '🌬️', color: 'gray' },
  ];

  const maxYears = 40;

  return (
    <div className="system-lifespan-visual bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-6">
        HVAC System Lifespans in Birmingham Climate
      </h3>
      
      <div className="space-y-6">
        {systems.map((system) => (
          <div key={system.type} className="relative">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{system.icon}</span>
              <h4 className="font-semibold text-lg">{system.type}</h4>
            </div>
            
            <div className="relative h-12">
              {/* Background bar */}
              <div className="absolute w-full h-6 bg-gray-200 rounded-full top-3"></div>
              
              {/* Without maintenance bar */}
              <div 
                className={`absolute h-6 bg-${system.color}-300 rounded-full top-3 transition-all duration-1000`}
                style={{ width: `${(system.avgLifespan / maxYears) * 100}%` }}
              >
                <span className="absolute right-2 top-1 text-xs font-semibold text-white">
                  {system.avgLifespan} yrs
                </span>
              </div>
              
              {/* With maintenance bar */}
              <div 
                className={`absolute h-4 bg-${system.color}-500 rounded-full top-4 transition-all duration-1500`}
                style={{ width: `${(system.withMaintenance / maxYears) * 100}%` }}
              >
                <span className="absolute right-2 -top-1 text-xs font-semibold text-white">
                  {system.withMaintenance} yrs
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
          <span>Average Lifespan</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-500 rounded mr-2"></div>
          <span>With Regular Maintenance</span>
        </div>
      </div>
      
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-center text-green-800">
          <strong>Save Money:</strong> Regular maintenance can extend your system's life by 50% or more!
        </p>
        <div className="text-center mt-3">
          <a href="tel:205-835-0111" className="text-green-600 font-bold hover:underline">
            Call (205) 835-0111 for Maintenance Plans
          </a>
        </div>
      </div>
    </div>
  );
};