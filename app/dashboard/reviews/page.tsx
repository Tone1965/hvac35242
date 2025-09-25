'use client';

import { useState } from 'react';
import { 
  Star,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Reply
} from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  source: 'Google' | 'Facebook' | 'Yelp' | 'BBB';
  text: string;
  response?: string;
  responseDate?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
  location: string;
  verified: boolean;
}

const mockReviews: Review[] = [
  {
    id: '1',
    author: 'John Smith',
    rating: 5,
    date: '2024-01-08',
    source: 'Google',
    text: 'Excellent service! The technician arrived on time and fixed our AC unit quickly. Very professional and knowledgeable. Highly recommend Birmingham HVAC.',
    response: 'Thank you so much for your kind words, John! We\'re thrilled to hear you had a great experience with our team.',
    responseDate: '2024-01-09',
    sentiment: 'positive',
    keywords: ['excellent', 'professional', 'recommend'],
    location: 'Birmingham Downtown',
    verified: true
  },
  {
    id: '2',
    author: 'Sarah Johnson',
    rating: 4,
    date: '2024-01-07',
    source: 'Facebook',
    text: 'Good service overall. The repair was done well, but scheduling took a bit longer than expected. The technician was friendly and explained everything clearly.',
    sentiment: 'positive',
    keywords: ['good', 'friendly', 'explained'],
    location: 'Mountain Brook',
    verified: true
  },
  {
    id: '3',
    author: 'Michael Brown',
    rating: 2,
    date: '2024-01-06',
    source: 'Yelp',
    text: 'Had to wait 3 days for service. When they finally came, the problem wasn\'t fully resolved. Had to call them back.',
    sentiment: 'negative',
    keywords: ['wait', 'problem', 'call back'],
    location: 'Hoover',
    verified: false
  },
  {
    id: '4',
    author: 'Emily Davis',
    rating: 5,
    date: '2024-01-05',
    source: 'Google',
    text: 'Amazing experience from start to finish! They installed our new HVAC system efficiently and cleaned up after. Great pricing too!',
    response: 'We appreciate your wonderful feedback, Emily! It was a pleasure working with you.',
    responseDate: '2024-01-06',
    sentiment: 'positive',
    keywords: ['amazing', 'efficient', 'great pricing'],
    location: 'Vestavia Hills',
    verified: true
  }
];

export default function ReviewsPage() {
  const [reviews] = useState<Review[]>(mockReviews);
  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReviews = reviews.filter(review => {
    const matchesSource = filterSource === 'all' || review.source === filterSource;
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    const matchesSearch = review.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSource && matchesRating && matchesSearch;
  });

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const responseRate = (reviews.filter(r => r.response).length / reviews.length) * 100;

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Google': return 'bg-blue-100 text-blue-800';
      case 'Facebook': return 'bg-indigo-100 text-indigo-800';
      case 'Yelp': return 'bg-red-100 text-red-800';
      case 'BBB': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews Management</h1>
          <p className="text-sm text-gray-600 mt-1">Monitor and respond to customer reviews across all platforms</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <MessageSquare className="w-4 h-4" />
          Request Reviews
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Average Rating</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Reviews</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{reviews.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Response Rate</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{responseRate.toFixed(0)}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">This Month</p>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-2xl font-bold text-gray-900">12</p>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Awaiting Response</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">2</p>
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
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Sources</option>
            <option value="Google">Google</option>
            <option value="Facebook">Facebook</option>
            <option value="Yelp">Yelp</option>
            <option value="BBB">BBB</option>
          </select>

          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-600">
                    {review.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{review.author}</h3>
                    {review.verified && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSourceColor(review.source)}`}>
                      {review.source}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.location}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              {!review.response && (
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <Reply className="w-3 h-3" />
                  Reply
                </button>
              )}
            </div>

            <p className="text-gray-700 mb-3">{review.text}</p>

            {review.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {review.keywords.map((keyword, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    {keyword}
                  </span>
                ))}
              </div>
            )}

            {review.response && (
              <div className="mt-4 pl-4 border-l-2 border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-900">Business Response</span>
                  <span className="text-xs text-gray-500">
                    {new Date(review.responseDate!).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{review.response}</p>
              </div>
            )}

            {review.sentiment === 'negative' && !review.response && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900">Negative Review - Response Required</p>
                  <p className="text-xs text-red-700 mt-0.5">Respond quickly to address customer concerns</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}