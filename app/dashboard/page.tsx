'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Star, 
  Link2,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
}

const metrics: MetricCard[] = [
  {
    title: 'Average Position',
    value: '3.2',
    change: 15.3,
    trend: 'up',
    icon: TrendingUp
  },
  {
    title: 'Total Locations',
    value: '24',
    change: 4.2,
    trend: 'up',
    icon: MapPin
  },
  {
    title: 'Average Rating',
    value: '4.7',
    change: 2.1,
    trend: 'up',
    icon: Star
  },
  {
    title: 'Total Citations',
    value: '1,284',
    change: -1.2,
    trend: 'down',
    icon: Link2
  }
];

const recentActivity = [
  { id: 1, type: 'ranking', message: 'HVAC Repair Birmingham moved to position #2', status: 'success', time: '2 hours ago' },
  { id: 2, type: 'review', message: 'New 5-star review received for Mountain Brook location', status: 'success', time: '4 hours ago' },
  { id: 3, type: 'citation', message: 'Citation inconsistency detected on Yelp', status: 'warning', time: '6 hours ago' },
  { id: 4, type: 'competitor', message: 'New competitor detected in Hoover market', status: 'info', time: '1 day ago' },
  { id: 5, type: 'ranking', message: 'AC Installation dropped 3 positions', status: 'error', time: '2 days ago' }
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {Math.abs(metric.change)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <metric.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ranking Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ranking Performance</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Chart will be implemented with Chart.js</p>
          </div>
        </div>

        {/* Location Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Locations</h3>
          <div className="space-y-3">
            {['Birmingham Downtown', 'Mountain Brook', 'Hoover', 'Vestavia Hills', 'Homewood'].map((location, index) => (
              <div key={location} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 w-6">#{index + 1}</span>
                  <span className="text-sm font-medium text-gray-900">{location}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{95 - index * 5}%</p>
                    <p className="text-xs text-gray-500">visibility</p>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${95 - index * 5}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="mt-0.5">
                {activity.status === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                {activity.status === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                {activity.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                {activity.status === 'info' && <AlertCircle className="w-5 h-5 text-blue-500" />}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}