import React, { useState } from 'react';

interface ChecklistItem {
  id: string;
  task: string;
  frequency: 'monthly' | 'quarterly' | 'biannual' | 'annual';
  diy: boolean;
  importance: 'critical' | 'important' | 'recommended';
  season?: string[];
}

export const MaintenanceChecklistVisual: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [selectedFrequency, setSelectedFrequency] = useState<string>('all');
  
  const tasks: ChecklistItem[] = [
    { id: '1', task: 'Change/clean air filters', frequency: 'monthly', diy: true, importance: 'critical' },
    { id: '2', task: 'Check thermostat settings', frequency: 'monthly', diy: true, importance: 'important' },
    { id: '3', task: 'Clear debris around outdoor unit', frequency: 'monthly', diy: true, importance: 'important' },
    { id: '4', task: 'Check for unusual noises', frequency: 'monthly', diy: true, importance: 'important' },
    { id: '5', task: 'Clean supply/return vents', frequency: 'quarterly', diy: true, importance: 'recommended' },
    { id: '6', task: 'Test system operation', frequency: 'quarterly', diy: true, importance: 'important' },
    { id: '7', task: 'Professional inspection', frequency: 'biannual', diy: false, importance: 'critical', season: ['spring', 'fall'] },
    { id: '8', task: 'Clean condensate drain', frequency: 'biannual', diy: false, importance: 'critical' },
    { id: '9', task: 'Check refrigerant levels', frequency: 'biannual', diy: false, importance: 'critical' },
    { id: '10', task: 'Lubricate moving parts', frequency: 'annual', diy: false, importance: 'important' },
    { id: '11', task: 'Inspect electrical connections', frequency: 'annual', diy: false, importance: 'critical' },
    { id: '12', task: 'Calibrate thermostat', frequency: 'annual', diy: false, importance: 'recommended' },
  ];
  
  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };
  
  const filteredTasks = selectedFrequency === 'all' 
    ? tasks 
    : tasks.filter(task => task.frequency === selectedFrequency);
  
  const completionPercentage = Math.round((completedTasks.size / tasks.length) * 100);
  
  const frequencyColors = {
    monthly: 'blue',
    quarterly: 'green',
    biannual: 'yellow',
    annual: 'purple'
  };
  
  const importanceIcons = {
    critical: '🔴',
    important: '🟡',
    recommended: '🟢'
  };
  
  return (
    <div className="maintenance-checklist-visual bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-6">
        HVAC Maintenance Checklist for Birmingham Homes
      </h3>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Maintenance Progress</span>
          <span className="font-semibold">{completionPercentage}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      
      {/* Frequency Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setSelectedFrequency('all')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedFrequency === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Tasks
        </button>
        {Object.entries(frequencyColors).map(([freq, color]) => (
          <button
            key={freq}
            onClick={() => setSelectedFrequency(freq)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedFrequency === freq 
                ? `bg-${color}-600 text-white` 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {freq.charAt(0).toUpperCase() + freq.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Task List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer
              ${completedTasks.has(task.id) 
                ? 'bg-green-50 border-green-300' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            onClick={() => toggleTask(task.id)}
          >
            <input
              type="checkbox"
              checked={completedTasks.has(task.id)}
              onChange={() => {}}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={completedTasks.has(task.id) ? 'line-through text-gray-500' : ''}>
                  {task.task}
                </span>
                <span>{importanceIcons[task.importance]}</span>
                {task.diy && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">DIY</span>
                )}
              </div>
              {task.season && (
                <div className="text-xs text-gray-500 mt-1">
                  Best in: {task.season.join(' & ')}
                </div>
              )}
            </div>
            
            <div className={`text-xs font-medium px-2 py-1 rounded bg-${frequencyColors[task.frequency]}-100 text-${frequencyColors[task.frequency]}-700`}>
              {task.frequency}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend and Tips */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Importance Guide</h4>
          <div className="space-y-1 text-sm">
            <div>🔴 Critical - Prevents breakdowns</div>
            <div>🟡 Important - Improves efficiency</div>
            <div>🟢 Recommended - Extends lifespan</div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Birmingham Tip</h4>
          <p className="text-sm">Our humid climate requires more frequent filter changes. Check monthly during summer!</p>
        </div>
      </div>
      
      {/* CTA */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 mb-3">
          Need help with professional maintenance tasks?
        </p>
        <a
          href="tel:205-835-0111"
          className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Schedule Maintenance: (205) 835-0111
        </a>
      </div>
    </div>
  );
};