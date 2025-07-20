'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Search, MapPin, Phone } from 'lucide-react'
import { translations } from '@/lib/translations'

// ALL 46 Birmingham Metro locations
const locations = [
  // Premium/Existing locations
  { slug: 'pelham', name: 'Pelham' },
  { slug: 'hoover', name: 'Hoover' },
  { slug: 'homewood', name: 'Homewood' },
  { slug: 'mountain-brook', name: 'Mountain Brook' },
  { slug: 'river-chase', name: 'River Chase' },
  { slug: 'htw-280-corridor', name: 'HWY 280 Corridor' },
  { slug: 'hwy-280-corridor', name: 'HWY 280 Corridor' },
  { slug: 'valleydale', name: 'Valleydale' },
  { slug: 'hwy-119', name: 'Hwy 119' },
  { slug: 'vestavia-hills', name: 'Vestavia Hills' },
  
  // New locations created by agents
  { slug: 'alabaster', name: 'Alabaster' },
  { slug: 'bessemer', name: 'Bessemer' },
  { slug: 'birmingham', name: 'Birmingham' },
  { slug: 'chelsea', name: 'Chelsea' },
  { slug: 'columbiana', name: 'Columbiana' },
  { slug: 'helena', name: 'Helena' },
  
  // Remaining 30 locations to be created
  { slug: 'english-village', name: 'English Village' },
  { slug: 'cahaba-heights', name: 'Cahaba Heights' },
  { slug: 'trussville', name: 'Trussville' },
  { slug: 'irondale', name: 'Irondale' },
  { slug: 'springville', name: 'Springville' },
  { slug: 'gardendale', name: 'Gardendale' },
  { slug: 'fultondale', name: 'Fultondale' },
  { slug: 'clay', name: 'Clay' },
  { slug: 'pinson', name: 'Pinson' },
  { slug: 'center-point', name: 'Center Point' },
  { slug: 'warrior', name: 'Warrior' },
  { slug: 'hueytown', name: 'Hueytown' },
  { slug: 'leeds', name: 'Leeds' },
  { slug: 'moody', name: 'Moody' },
  { slug: 'odenville', name: 'Odenville' },
  { slug: 'riverside', name: 'Riverside' },
  { slug: 'kimberly', name: 'Kimberly' },
  { slug: 'locust-fork', name: 'Locust Fork' },
  { slug: 'blountsville', name: 'Blountsville' },
  { slug: 'cleveland', name: 'Cleveland' },
  { slug: 'steele', name: 'Steele' },
  { slug: 'ashville', name: 'Ashville' },
  { slug: 'riverchase', name: 'Riverchase' },
  { slug: 'bessemer-west', name: 'Bessemer West' },
  { slug: 'forestdale', name: 'Forestdale' },
  { slug: 'west-end', name: 'West End' },
  { slug: 'north-birmingham', name: 'North Birmingham' },
  { slug: 'east-birmingham', name: 'East Birmingham' },
  { slug: 'smithfield', name: 'Smithfield' },
  { slug: 'ensley', name: 'Ensley' },
  { slug: 'fairfield', name: 'Fairfield' },
  { slug: 'wylam', name: 'Wylam' },
  { slug: 'tarrant', name: 'Tarrant' },
  { slug: 'center-point-south', name: 'Center Point South' },
  { slug: 'homewood-south', name: 'Homewood South' },
  { slug: 'homewood-west', name: 'Homewood West' },
  { slug: 'forestdale-north', name: 'Forestdale North' },
  { slug: 'eastwood', name: 'Eastwood' }
]

// TOP 10 PREMIUM AREAS (from CLAUDE.md)
const premiumSlugs = ['mountain-brook', 'vestavia-hills', 'hoover', 'english-village', 'cahaba-heights', 'pelham', 'helena', 'trussville']

interface LocationsFrameworkProps {
  lang: 'en' | 'es'
}

export default function LocationsFramework({ lang }: LocationsFrameworkProps) {
  const t = translations[lang]
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  // Filter out duplicates and separate premium vs regular
  const uniqueLocations = locations.filter((location, index, self) => 
    index === self.findIndex(l => l.name === location.name)
  )
  
  const premiumLocations = uniqueLocations.filter(location => 
    premiumSlugs.includes(location.slug)
  )
  
  const remainingLocations = uniqueLocations.filter(location => 
    !premiumSlugs.includes(location.slug)
  )
  
  const filteredLocations = uniqueLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleLocationSelect = (location: typeof locations[0]) => {
    setSearchTerm('')
    setShowDropdown(false)
    window.location.href = `/${lang}/services/locations/${location.slug}`
  }

  const text = {
    en: {
      emergencyHvac: "EMERGENCY HVAC",
      servingAll: "SERVING ALL",
      birminghamMetro: "BIRMINGHAM METRO",
      subtitle: "24/7 Licensed HVAC Contractors • Same-Day Service",
      emergencyResponse: "⚡ EMERGENCY RESPONSE GUARANTEED ⚡",
      premiumAreas: "🏆 PREMIUM SERVICE AREAS",
      findCity: "🔍 FIND YOUR CITY",
      searchPlaceholder: "Enter your city name...",
      emergencyService: "Emergency Service",
      allAreas: "All Birmingham Metro Service Areas",
      dontSeeCity: "Don't See Your City? We Service the Entire Birmingham Metro!",
      callImmediate: "CALL FOR IMMEDIATE SERVICE"
    },
    es: {
      emergencyHvac: "HVAC DE EMERGENCIA",
      servingAll: "SIRVIENDO TODO",
      birminghamMetro: "METRO BIRMINGHAM",
      subtitle: "Contratistas HVAC Licenciados 24/7 • Servicio el Mismo Día",
      emergencyResponse: "⚡ RESPUESTA DE EMERGENCIA GARANTIZADA ⚡",
      premiumAreas: "🏆 ÁREAS DE SERVICIO PREMIUM",
      findCity: "🔍 ENCUENTRA TU CIUDAD",
      searchPlaceholder: "Ingrese el nombre de su ciudad...",
      emergencyService: "Servicio de Emergencia",
      allAreas: "Todas las Áreas de Servicio del Metro Birmingham",
      dontSeeCity: "¿No Ve Su Ciudad? ¡Servimos Todo el Metro Birmingham!",
      callImmediate: "LLAME PARA SERVICIO INMEDIATO"
    }
  }

  const currentText = text[lang]

  return (
    <section className="py-16 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* DOMINATING HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 bg-clip-text text-transparent">
              {currentText.emergencyHvac}
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">
              {currentText.servingAll}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
              {currentText.birminghamMetro}
            </span>
          </h2>
          
          <p className="text-2xl md:text-3xl font-bold mb-8 text-blue-100 drop-shadow-lg max-w-4xl mx-auto">
            {currentText.subtitle}
          </p>
          
          {/* EMERGENCY CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a href="tel:2058350111" className="transform hover:scale-105 transition-all">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-2xl font-black px-12 py-6 rounded-lg shadow-2xl border-4 border-yellow-400 animate-pulse">
                <Phone className="w-8 h-8 mr-3" />
                {lang === 'en' ? 'CALL 205-835-0111' : 'LLAME 205-835-0111'}
              </Button>
            </a>
            <div className="text-yellow-300 font-bold text-lg">
              {currentText.emergencyResponse}
            </div>
          </div>
        </div>

        {/* PREMIUM LOCATIONS GRID */}
        <div className="mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-yellow-300">
            {currentText.premiumAreas}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/${lang}/services/locations/${location.slug}`}
                className="group"
              >
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-6 rounded-xl border-2 border-blue-500 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <h4 className="text-xl font-bold text-center mb-2 group-hover:text-yellow-300 transition-colors">
                    {location.name}
                  </h4>
                  <p className="text-blue-200 text-center text-sm">
                    {currentText.emergencyService}
                  </p>
                  <div className="text-center mt-3">
                    <MapPin className="w-5 h-5 inline text-yellow-400" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SEARCH & FIND YOUR CITY */}
        <div className="mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-yellow-300">
            {currentText.findCity}
          </h3>
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <Input
                type="text"
                placeholder={currentText.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowDropdown(e.target.value.length > 0)
                }}
                className="pl-12 pr-4 py-4 text-lg border-2 border-yellow-400 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            {/* DROPDOWN RESULTS */}
            {showDropdown && filteredLocations.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-2xl border-2 border-yellow-400 mt-2 max-h-60 overflow-y-auto z-50">
                {filteredLocations.slice(0, 10).map((location) => (
                  <button
                    key={location.slug}
                    onClick={() => handleLocationSelect(location)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-900 border-b border-gray-100 last:border-b-0 flex items-center"
                  >
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    {location.name}
                    <span className="ml-auto text-sm text-gray-500">{currentText.emergencyService}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ALL SERVICE AREAS - ALWAYS VISIBLE FOR SEO */}
        {remainingLocations.length > 0 && (
          <div className="mt-12">
            <h4 className="text-2xl md:text-3xl font-bold text-center mb-8 text-yellow-300">
              {currentText.allAreas}
            </h4>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-yellow-400/20">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
                {remainingLocations.map((location) => (
                  <Link
                    key={location.slug}
                    href={`/${lang}/services/locations/${location.slug}`}
                    className="group block"
                  >
                    <div className="text-white hover:text-yellow-300 transition-all duration-200 text-xs sm:text-sm font-medium p-2 sm:p-3 hover:bg-white/10 rounded-lg border border-transparent hover:border-yellow-400/30 text-center">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-1 opacity-60 group-hover:opacity-100" />
                      <div className="leading-tight">{location.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM CTA */}
        <div className="text-center mt-12 pt-8 border-t border-yellow-400/30">
          <p className="text-xl text-yellow-300 font-bold mb-4">
            {currentText.dontSeeCity}
          </p>
          <a href="tel:2058350111">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-black text-xl px-10 py-4">
              <Phone className="w-6 h-6 mr-2" />
              {currentText.callImmediate}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}