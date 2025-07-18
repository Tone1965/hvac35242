'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { translations } from '@/lib/translations'
import { Phone, Clock, Shield, Award } from 'lucide-react'

interface HeaderProps {
  lang: 'en' | 'es'
  variant?: 'default' | 'emergency' | 'service' | 'location'
  emergencyMessage?: string
  serviceCategory?: string
  locationName?: string
}

export default function Header({ 
  lang, 
  variant = 'default',
  emergencyMessage,
  serviceCategory,
  locationName 
}: HeaderProps) {
  const pathname = usePathname()
  const t = translations[lang]
  
  const switchLang = lang === 'en' ? 'es' : 'en'
  const newPath = pathname.replace(`/${lang}`, `/${switchLang}`)
  
  // Emergency Header Variant
  if (variant === 'emergency') {
    return (
      <div>
        {/* Emergency Alert Bar */}
        <div className="bg-gradient-emergency text-white py-2 px-4 text-center animate-pulse">
          <div className="flex items-center justify-center space-x-2 text-sm font-bold">
            <Clock className="w-4 h-4" />
            <span>{emergencyMessage || "🚨 BIRMINGHAM HVAC EMERGENCY - CALL NOW: (205) 835-0111 🚨"}</span>
          </div>
        </div>
        
        {/* Main Header */}
        <header className="sticky top-0 z-50 w-full bg-white shadow-lg border-b-2 border-primary">
          <div className="container mx-auto px-4">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center space-x-8">
                <Link href={`/${lang}`} className="text-3xl font-bold text-primary hover:text-primary/80 transition-colors">
                  Birmingham HVAC
                </Link>
                <div className="hidden md:flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-green-600 font-semibold">
                    <Shield className="w-4 h-4 mr-1" />
                    Licensed & Insured
                  </div>
                  <div className="flex items-center text-blue-600 font-semibold">
                    <Award className="w-4 h-4 mr-1" />
                    5-Star Service
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-destructive">
                    (205) 835-0111
                  </div>
                  <div className="text-sm text-gray-600">24/7 Emergency Service</div>
                </div>
                
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-gradient-emergency hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href={`tel:2058350111`}>
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>
    )
  }
  
  // Service Page Header Variant
  if (variant === 'service') {
    return (
      <div>
        {/* Service Category Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-primary text-white py-3 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span className="font-semibold">
                  {serviceCategory || 'Professional HVAC Services'} - Birmingham & Surrounding Areas
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <span className="font-semibold">Licensed & Insured</span>
                <span className="font-semibold">Same-Day Service</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Header */}
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-8">
                <Link href={`/${lang}`} className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
                  Birmingham HVAC
                </Link>
                
                <nav className="hidden md:flex space-x-6">
                  <Link href={`/${lang}`} className="text-sm font-medium hover:text-primary transition-colors">
                    {t.nav.home}
                  </Link>
                  <Link href={`/${lang}/services`} className="text-sm font-medium hover:text-primary transition-colors">
                    {t.nav.services}
                  </Link>
                  <Link href={`/${lang}/contact`} className="text-sm font-medium hover:text-primary transition-colors">
                    {t.nav.contact}
                  </Link>
                  <Link href={`/${lang}/emergency`} className="text-sm font-medium text-destructive hover:text-destructive/80 transition-colors">
                    Emergency
                  </Link>
                </nav>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center text-sm font-medium text-destructive">
                  <Phone className="w-4 h-4 mr-1" />
                  24/7 Emergency: (205) 835-0111
                </div>
                
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  <Link href={`/${lang}/quote`}>Get Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>
    )
  }
  
  // Location Page Header Variant
  if (variant === 'location') {
    return (
      <div>
        {/* Location Bar */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">
                  Serving {locationName || 'Birmingham Area'} - Licensed HVAC Contractors
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <span className="font-semibold">Local Emergency Service</span>
                <span className="font-semibold">Same-Day Repairs</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Header */}
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-8">
                <Link href={`/${lang}`} className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
                  Birmingham HVAC
                </Link>
                
                <nav className="hidden md:flex space-x-6">
                  <Link href={`/${lang}`} className="text-sm font-medium hover:text-primary transition-colors">
                    {t.nav.home}
                  </Link>
                  <Link href={`/${lang}/services`} className="text-sm font-medium hover:text-primary transition-colors">
                    {t.nav.services}
                  </Link>
                  <Link href={`/${lang}/contact`} className="text-sm font-medium hover:text-primary transition-colors">
                    {t.nav.contact}
                  </Link>
                  <Link href={`/${lang}/emergency`} className="text-sm font-medium text-destructive hover:text-destructive/80 transition-colors">
                    Emergency
                  </Link>
                </nav>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center text-sm font-medium text-destructive">
                  <Phone className="w-4 h-4 mr-1" />
                  (205) 835-0111
                </div>
                
                <Button asChild className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                  <Link href={`tel:2058350111`}>Call Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>
    )
  }
  
  // Default Header
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href={`/${lang}`} className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
              Birmingham HVAC
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href={`/${lang}`} className="text-sm font-medium hover:text-primary transition-colors">
                {t.nav.home}
              </Link>
              <Link href={`/${lang}/services`} className="text-sm font-medium hover:text-primary transition-colors">
                {t.nav.services}
              </Link>
              <Link href={`/${lang}/contact`} className="text-sm font-medium hover:text-primary transition-colors">
                {t.nav.contact}
              </Link>
              <Link href={`/${lang}/emergency`} className="text-sm font-medium text-destructive hover:text-destructive/80 transition-colors">
                Emergency
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center text-sm font-medium text-destructive">
              <Phone className="w-4 h-4 mr-1" />
              {t.nav.emergency}
            </div>
            
            <Link href={newPath}>
              <Button variant="outline" size="sm">
                {lang === 'en' ? 'ES' : 'EN'}
              </Button>
            </Link>
            
            <Button asChild className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white">
              <Link href={`/${lang}/quote`}>Get Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}