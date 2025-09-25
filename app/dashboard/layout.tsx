import { ReactNode } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  MapPin, 
  TrendingUp, 
  Building2, 
  Star, 
  Link2, 
  Settings,
  BarChart3,
  Search,
  Users
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Rank Tracking', href: '/dashboard/rank-tracking', icon: TrendingUp },
  { name: 'Locations', href: '/dashboard/locations', icon: MapPin },
  { name: 'Google Business', href: '/dashboard/google-business', icon: Building2 },
  { name: 'Reviews', href: '/dashboard/reviews', icon: Star },
  { name: 'Citations', href: '/dashboard/citations', icon: Link2 },
  { name: 'Competitors', href: '/dashboard/competitors', icon: Users },
  { name: 'Keywords', href: '/dashboard/keywords', icon: Search },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-900">LocalRank</h1>
              <p className="text-xs text-gray-500 mt-1">Local SEO Dashboard</p>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Add Location
                </button>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}