'use client';

import { useState } from 'react';
import { 
  Building2,
  Star,
  MessageSquare,
  Camera,
  Clock,
  Phone,
  Globe,
  MapPin,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Edit,
  RefreshCw,
  Download
} from 'lucide-react';

interface BusinessProfile {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  website: string;
  hours: Record<string, string>;
  description: string;
  rating: number;
  reviews: number;
  photos: number;
  posts: number;
  questions: number;
  verified: boolean;
  lastSynced: string;
  insights: {
    searches: number;
    views: number;
    actions: number;
  };
}

const mockProfile: BusinessProfile = {
  id: '1',
  name: 'Birmingham HVAC Services',
  category: 'HVAC Contractor',
  address: '123 Main Street, Birmingham, AL 35203',
  phone: '(205) 555-0100',
  website: 'www.birminghamhvac.com',
  hours: {
    monday: '8:00 AM - 6:00 PM',
    tuesday: '8:00 AM - 6:00 PM',
    wednesday: '8:00 AM - 6:00 PM',
    thursday: '8:00 AM - 6:00 PM',
    friday: '8:00 AM - 6:00 PM',
    saturday: '9:00 AM - 2:00 PM',
    sunday: 'Closed'
  },
  description: 'Professional HVAC services in Birmingham, AL. We provide AC repair, heating installation, and 24/7 emergency service.',
  rating: 4.8,
  reviews: 234,
  photos: 47,
  posts: 12,
  questions: 8,
  verified: true,
  lastSynced: '2024-01-10T10:30:00',
  insights: {
    searches: 1842,
    views: 3256,
    actions: 428
  }
};

export default function GoogleBusinessPage() {
  const [profile] = useState<BusinessProfile>(mockProfile);
  const [activeTab, setActiveTab] = useState<'overview' | 'insights' | 'posts' | 'reviews'>('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Google Business Profile</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your Google Business Profile directly from the dashboard</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Sync Now
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{profile.category}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-900">{profile.rating}</span>
                  <span className="text-sm text-gray-500">({profile.reviews} reviews)</span>
                </div>
                {profile.verified && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Last synced</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(profile.lastSynced).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex gap-6">
            {(['overview', 'insights', 'posts', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Business Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Business Information</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Address</p>
                      <p className="text-sm text-gray-600">{profile.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">{profile.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Website</p>
                      <a href={`https://${profile.website}`} className="text-sm text-blue-600 hover:text-blue-800">
                        {profile.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Business Hours</h3>
                
                <div className="space-y-2">
                  {Object.entries(profile.hours).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 capitalize">{day}</span>
                      <span className="text-gray-900 font-medium">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <Camera className="w-5 h-5 text-gray-400" />
                  <span className="text-2xl font-bold text-gray-900">{profile.photos}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Photos</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <span className="text-2xl font-bold text-gray-900">{profile.posts}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Posts</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <Star className="w-5 h-5 text-gray-400" />
                  <span className="text-2xl font-bold text-gray-900">{profile.reviews}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Reviews</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <AlertCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-2xl font-bold text-gray-900">{profile.questions}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Q&A</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-blue-900">Discovery Searches</p>
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-blue-900">{profile.insights.searches.toLocaleString()}</p>
                <p className="text-sm text-blue-700 mt-2">+12% from last month</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-green-900">Profile Views</p>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-green-900">{profile.insights.views.toLocaleString()}</p>
                <p className="text-sm text-green-700 mt-2">+8% from last month</p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-purple-900">Customer Actions</p>
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-purple-900">{profile.insights.actions}</p>
                <p className="text-sm text-purple-700 mt-2">+23% from last month</p>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center">
              <p className="text-gray-500">Performance chart will be displayed here</p>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Posts</h3>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                Create Post
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center">
              <p className="text-gray-500">Google Posts will be displayed here</p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
              <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                Export Reviews
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center">
              <p className="text-gray-500">Customer reviews will be displayed here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}