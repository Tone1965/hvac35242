'use client';

import { useState } from 'react';
import { 
  MapPin, 
  Plus, 
  Search, 
  Phone, 
  Globe, 
  Clock,
  Star,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website: string;
  hours: string;
  rating: number;
  reviews: number;
  status: 'active' | 'pending' | 'inactive';
  lastVerified: string;
  napScore: number;
}

const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Birmingham HVAC - Downtown',
    address: '123 Main Street',
    city: 'Birmingham',
    state: 'AL',
    zip: '35203',
    phone: '(205) 555-0100',
    website: 'www.birminghamhvac.com',
    hours: 'Mon-Fri 8AM-6PM, Sat 9AM-2PM',
    rating: 4.8,
    reviews: 234,
    status: 'active',
    lastVerified: '2024-01-08',
    napScore: 98
  },
  {
    id: '2',
    name: 'Birmingham HVAC - Mountain Brook',
    address: '456 Oak Avenue',
    city: 'Mountain Brook',
    state: 'AL',
    zip: '35213',
    phone: '(205) 555-0200',
    website: 'www.birminghamhvac.com/mountain-brook',
    hours: 'Mon-Fri 8AM-6PM',
    rating: 4.9,
    reviews: 187,
    status: 'active',
    lastVerified: '2024-01-09',
    napScore: 95
  },
  {
    id: '3',
    name: 'Birmingham HVAC - Hoover',
    address: '789 Riverchase Parkway',
    city: 'Hoover',
    state: 'AL',
    zip: '35244',
    phone: '(205) 555-0300',
    website: 'www.birminghamhvac.com/hoover',
    hours: 'Mon-Sat 8AM-7PM',
    rating: 4.7,
    reviews: 312,
    status: 'pending',
    lastVerified: '2024-01-05',
    napScore: 87
  }
];

export default function LocationsPage() {
  const [locations] = useState<Location[]>(mockLocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNapScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Locations</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your business locations and NAP consistency</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Location
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Locations</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{locations.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Active Locations</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {locations.filter(l => l.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Average Rating</p>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Avg NAP Score</p>
          <p className="text-2xl font-bold text-green-600 mt-1">93%</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredLocations.map((location) => (
          <div key={location.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${getStatusColor(location.status)}`}>
                  {location.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="text-sm text-gray-600">
                  {location.address}<br />
                  {location.city}, {location.state} {location.zip}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{location.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <a href={`https://${location.website}`} className="text-sm text-blue-600 hover:text-blue-800">
                  {location.website}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{location.hours}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{location.rating}</span>
                    <span className="text-xs text-gray-500">({location.reviews})</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">NAP Score</p>
                  <p className={`text-sm font-semibold mt-1 ${getNapScoreColor(location.napScore)}`}>
                    {location.napScore}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Verified</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {new Date(location.lastVerified).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {location.napScore < 90 && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">NAP Inconsistencies Detected</p>
                  <p className="text-xs text-yellow-700 mt-0.5">Review and update your business information across directories</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Location Modal (placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Location</h2>
            <p className="text-sm text-gray-600 mb-4">Location form would go here</p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}