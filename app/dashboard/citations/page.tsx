'use client';

import { useState } from 'react';
import { 
  Link2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Globe,
  MapPin,
  Phone,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

interface Citation {
  id: string;
  directory: string;
  url: string;
  status: 'consistent' | 'inconsistent' | 'missing';
  napAccuracy: {
    name: boolean;
    address: boolean;
    phone: boolean;
  };
  lastChecked: string;
  authority: number;
  category: string;
  issues: string[];
}

const mockCitations: Citation[] = [
  {
    id: '1',
    directory: 'Google My Business',
    url: 'https://google.com/maps',
    status: 'consistent',
    napAccuracy: { name: true, address: true, phone: true },
    lastChecked: '2024-01-10',
    authority: 95,
    category: 'Primary',
    issues: []
  },
  {
    id: '2',
    directory: 'Yelp',
    url: 'https://yelp.com/biz/birmingham-hvac',
    status: 'inconsistent',
    napAccuracy: { name: true, address: false, phone: true },
    lastChecked: '2024-01-09',
    authority: 85,
    category: 'Primary',
    issues: ['Address format differs', 'Missing suite number']
  },
  {
    id: '3',
    directory: 'Yellow Pages',
    url: 'https://yellowpages.com',
    status: 'consistent',
    napAccuracy: { name: true, address: true, phone: true },
    lastChecked: '2024-01-08',
    authority: 70,
    category: 'Secondary',
    issues: []
  },
  {
    id: '4',
    directory: 'Facebook',
    url: 'https://facebook.com/birminghamhvac',
    status: 'inconsistent',
    napAccuracy: { name: true, address: true, phone: false },
    lastChecked: '2024-01-07',
    authority: 80,
    category: 'Primary',
    issues: ['Old phone number listed']
  },
  {
    id: '5',
    directory: 'Better Business Bureau',
    url: 'https://bbb.org',
    status: 'missing',
    napAccuracy: { name: false, address: false, phone: false },
    lastChecked: '2024-01-06',
    authority: 90,
    category: 'Primary',
    issues: ['Business not listed']
  },
  {
    id: '6',
    directory: 'Angi (Angie\'s List)',
    url: 'https://angi.com',
    status: 'consistent',
    napAccuracy: { name: true, address: true, phone: true },
    lastChecked: '2024-01-10',
    authority: 75,
    category: 'Secondary',
    issues: []
  }
];

export default function CitationsPage() {
  const [citations] = useState<Citation[]>(mockCitations);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCitations = citations.filter(citation => {
    const matchesStatus = filterStatus === 'all' || citation.status === filterStatus;
    const matchesSearch = citation.directory.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const consistentCount = citations.filter(c => c.status === 'consistent').length;
  const inconsistentCount = citations.filter(c => c.status === 'inconsistent').length;
  const missingCount = citations.filter(c => c.status === 'missing').length;
  const overallAccuracy = Math.round((consistentCount / citations.length) * 100);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'consistent': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'inconsistent': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'missing': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'consistent': return 'bg-green-100 text-green-800';
      case 'inconsistent': return 'bg-yellow-100 text-yellow-800';
      case 'missing': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAuthorityColor = (authority: number) => {
    if (authority >= 80) return 'text-green-600';
    if (authority >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Citation Management</h1>
          <p className="text-sm text-gray-600 mt-1">Monitor and manage your business citations across directories</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Scan Citations
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Citations</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{citations.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">NAP Accuracy</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{overallAccuracy}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Consistent</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{consistentCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Inconsistent</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{inconsistentCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Missing</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{missingCount}</p>
        </div>
      </div>

      {/* NAP Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Business Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Business Name</p>
              <p className="text-sm text-gray-600">Birmingham HVAC Services</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Address</p>
              <p className="text-sm text-gray-600">123 Main Street, Birmingham, AL 35203</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Phone</p>
              <p className="text-sm text-gray-600">(205) 555-0100</p>
            </div>
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
                placeholder="Search directories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="consistent">Consistent</option>
            <option value="inconsistent">Inconsistent</option>
            <option value="missing">Missing</option>
          </select>
        </div>
      </div>

      {/* Citations List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Directory
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NAP Accuracy
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Authority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issues
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Checked
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCitations.map((citation) => (
                <tr key={citation.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{citation.directory}</p>
                        <p className="text-xs text-gray-500">{citation.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      {getStatusIcon(citation.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(citation.status)}`}>
                        {citation.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex gap-1">
                        <div className={`w-2 h-2 rounded-full ${citation.napAccuracy.name ? 'bg-green-500' : 'bg-red-500'}`} 
                             title="Name" />
                        <div className={`w-2 h-2 rounded-full ${citation.napAccuracy.address ? 'bg-green-500' : 'bg-red-500'}`} 
                             title="Address" />
                        <div className={`w-2 h-2 rounded-full ${citation.napAccuracy.phone ? 'bg-green-500' : 'bg-red-500'}`} 
                             title="Phone" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center">
                      <span className={`text-sm font-semibold ${getAuthorityColor(citation.authority)}`}>
                        {citation.authority}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {citation.issues.length > 0 ? (
                      <ul className="text-xs text-red-600 space-y-0.5">
                        {citation.issues.map((issue, index) => (
                          <li key={index}>• {issue}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-xs text-green-600">No issues</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {new Date(citation.lastChecked).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      <a 
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                      {citation.status !== 'consistent' && (
                        <button className="text-orange-600 hover:text-orange-800">
                          <AlertCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Required Alert */}
      {(inconsistentCount > 0 || missingCount > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-yellow-900">Action Required</h4>
              <p className="text-sm text-yellow-700 mt-1">
                You have {inconsistentCount} inconsistent and {missingCount} missing citations that need attention.
                Fixing these issues can improve your local search rankings.
              </p>
              <button className="mt-2 px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700">
                Fix Citations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add missing import
import { Building2 } from 'lucide-react';