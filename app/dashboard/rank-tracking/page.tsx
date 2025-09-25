'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Minus,
  MapPin,
  Calendar,
  ChevronDown
} from 'lucide-react';

interface RankingData {
  id: string;
  keyword: string;
  location: string;
  position: number;
  previousPosition: number;
  change: number;
  searchVolume: number;
  difficulty: number;
  url: string;
  lastUpdated: string;
}

const mockRankings: RankingData[] = [
  {
    id: '1',
    keyword: 'HVAC repair Birmingham',
    location: 'Birmingham, AL',
    position: 2,
    previousPosition: 4,
    change: 2,
    searchVolume: 1200,
    difficulty: 45,
    url: '/services/hvac-repair',
    lastUpdated: '2024-01-10'
  },
  {
    id: '2',
    keyword: 'AC installation near me',
    location: 'Mountain Brook, AL',
    position: 1,
    previousPosition: 1,
    change: 0,
    searchVolume: 890,
    difficulty: 38,
    url: '/services/ac-installation',
    lastUpdated: '2024-01-10'
  },
  {
    id: '3',
    keyword: 'emergency HVAC service',
    location: 'Hoover, AL',
    position: 5,
    previousPosition: 3,
    change: -2,
    searchVolume: 450,
    difficulty: 52,
    url: '/services/emergency-hvac',
    lastUpdated: '2024-01-10'
  },
  {
    id: '4',
    keyword: 'furnace repair Birmingham',
    location: 'Birmingham, AL',
    position: 3,
    previousPosition: 5,
    change: 2,
    searchVolume: 670,
    difficulty: 41,
    url: '/services/furnace-repair',
    lastUpdated: '2024-01-10'
  },
  {
    id: '5',
    keyword: 'commercial HVAC Birmingham',
    location: 'Birmingham, AL',
    position: 4,
    previousPosition: 4,
    change: 0,
    searchVolume: 320,
    difficulty: 58,
    url: '/services/commercial-hvac',
    lastUpdated: '2024-01-10'
  }
];

export default function RankTrackingPage() {
  const [rankings] = useState<RankingData[]>(mockRankings);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('7d');

  const filteredRankings = rankings.filter(ranking => {
    const matchesSearch = ranking.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || ranking.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600 bg-green-50';
    if (change < 0) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rank Tracking</h1>
          <p className="text-sm text-gray-600 mt-1">Monitor your keyword rankings across all locations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Keywords Tracked</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{rankings.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Average Position</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">3.2</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Keywords in Top 3</p>
          <p className="text-2xl font-bold text-green-600 mt-1">3</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Position Changes</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-green-600 font-semibold">↑ 2</span>
            <span className="text-gray-400">|</span>
            <span className="text-red-600 font-semibold">↓ 1</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="all">All Locations</option>
              <option value="Birmingham, AL">Birmingham, AL</option>
              <option value="Mountain Brook, AL">Mountain Brook, AL</option>
              <option value="Hoover, AL">Hoover, AL</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Rankings Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Keyword
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Search Volume
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRankings.map((ranking) => (
                <tr key={ranking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ranking.keyword}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{ranking.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-bold text-gray-900 bg-gray-100 rounded-full">
                      {ranking.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1">
                      {getChangeIcon(ranking.change)}
                      <span className={`text-sm font-medium px-2 py-0.5 rounded ${getChangeColor(ranking.change)}`}>
                        {Math.abs(ranking.change)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-900">{ranking.searchVolume.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            ranking.difficulty < 30 ? 'bg-green-500' :
                            ranking.difficulty < 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${ranking.difficulty}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href={ranking.url} className="text-sm text-blue-600 hover:text-blue-800">
                      {ranking.url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}