import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LocationsFramework from '@/components/LocationsFramework'
import { translations } from '@/lib/translations'
import { 
  Clock, Shield, Award, ThermometerSun, 
  Snowflake, Building2, DollarSign, Timer, Phone, Zap
} from 'lucide-react'

const services = [
  { icon: Clock, key: 'sameDayRepair' },
  { icon: Shield, key: 'weekendService' },
  { icon: Award, key: 'holidayResponse' },
  { icon: Timer, key: 'nightCalls' },
  { icon: ThermometerSun, key: 'acHeatwave' },
  { icon: Snowflake, key: 'heatingWinter' },
  { icon: Building2, key: 'commercial' },
  { icon: DollarSign, key: 'pricing' },
  { icon: Timer, key: 'guarantees' }
]

const locations = [
  'Pelham',
  'Hoover', 
  'Homewood',
  'Mountain Brook',
  'River Chase',
  'HWY 280 Corridor',
  'Valleydale',
  'Hwy 119'
]

export default function HomePage({ params }: { params: { lang: 'en' | 'es' } }) {
  const t = translations[params.lang]
  
  return (
    <div className="min-h-screen">
      <Header lang={params.lang} />
      
      {/* Enhanced Hero Section with Massive Typography */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hvac-hero.jpg"
          alt="HVAC Service Birmingham"
          fill
          className="object-cover scale-105"
          priority
        />
        
        {/* Enhanced Multi-layered Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 via-transparent to-blue-900/20" />
        
        {/* Animated Emergency Pulse */}
        <div className="absolute top-8 right-8 animate-pulse">
          <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
            <Zap className="w-4 h-4 inline mr-1" />
            24/7 EMERGENCY
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          {/* Massive Typography Hero */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-4 leading-none">
              <span className="block text-white drop-shadow-2xl">
                BIRMINGHAM'S
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 drop-shadow-2xl">
                EMERGENCY
              </span>
              <span className="block text-cyan-300 drop-shadow-2xl">
                HVAC EXPERTS
              </span>
            </h1>
          </div>
          
          {/* Dramatic Subtitle */}
          <div className="mb-12 animate-slide-up">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-yellow-300 drop-shadow-lg">
              SAME-DAY REPAIRS • 24/7 EMERGENCY SERVICE
            </p>
            <p className="text-xl md:text-2xl text-blue-200 font-semibold">
              Licensed & Insured • Serving All Birmingham Metro Areas
            </p>
          </div>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8 animate-bounce-in">
            <a href="tel:2058350111" className="group">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white text-2xl px-12 py-6 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-red-400 hover:border-red-300"
              >
                <Phone className="w-8 h-8 mr-3 animate-pulse" />
                CALL NOW: 205-835-0111
              </Button>
            </a>
            
            <Link href={`/${params.lang}/contact`} className="group">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-2xl px-12 py-6 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-blue-400 hover:border-blue-300"
              >
                GET FREE QUOTE
              </Button>
            </Link>
          </div>
          
          {/* Emergency Guarantee Banner */}
          <div className="bg-gradient-to-r from-red-600/90 to-orange-600/90 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto border-2 border-red-400/50 shadow-2xl">
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-black text-yellow-300">2-HOUR</div>
                <div className="text-sm font-semibold">RESPONSE TIME</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-yellow-300">100%</div>
                <div className="text-sm font-semibold">SATISFACTION</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-yellow-300">15+</div>
                <div className="text-sm font-semibold">YEARS EXPERIENCE</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-yellow-300">A+</div>
                <div className="text-sm font-semibold">BBB RATING</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Trust Indicators */}
      <section className="py-12 bg-gradient-to-r from-red-600 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              BIRMINGHAM'S MOST TRUSTED HVAC EXPERTS
            </h2>
            <p className="text-xl opacity-90">
              When your comfort is on the line, trust the professionals
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-5xl font-black text-yellow-300 mb-2">24/7</div>
              <div className="text-lg font-semibold">Emergency Service</div>
              <div className="text-sm opacity-80">Never wait for comfort</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-5xl font-black text-yellow-300 mb-2">15+</div>
              <div className="text-lg font-semibold">Years Experience</div>
              <div className="text-sm opacity-80">Proven Birmingham expertise</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-5xl font-black text-yellow-300 mb-2">100%</div>
              <div className="text-lg font-semibold">Satisfaction</div>
              <div className="text-sm opacity-80">Guaranteed results</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-5xl font-black text-yellow-300 mb-2">A+</div>
              <div className="text-lg font-semibold">BBB Rating</div>
              <div className="text-sm opacity-80">Trusted by thousands</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-4 text-gray-900">
            EMERGENCY HVAC SERVICES
          </h2>
          <p className="text-xl text-center text-slate-600 mb-12 max-w-4xl mx-auto">
            {t.services.subtitle}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map(({ icon: Icon, key }) => {
              const service = t.services[key as keyof typeof t.services];
              if (typeof service === 'object' && service.title && service.desc) {
                return (
                  <div 
                    key={key}
                    className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-300 hover:border-red-400 transform hover:scale-105"
                  >
                    <Icon className="w-16 h-16 text-red-600 mb-6" />
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link href={`/${params.lang}/services`}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-xl px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                VIEW ALL EMERGENCY SERVICES
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Locations Framework */}
      <LocationsFramework lang={params.lang} />
      
      {/* Final Emergency CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              HVAC EMERGENCY?
            </h2>
            <p className="text-2xl md:text-3xl mb-8 text-yellow-200 font-semibold">
              DON'T WAIT - CALL BIRMINGHAM'S EMERGENCY HVAC EXPERTS
            </p>
            <p className="text-xl mb-12 opacity-90">
              Available 24/7 for all your heating and cooling emergencies across Birmingham Metro
            </p>
            
            <a href="tel:2058350111" className="group">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-400 text-black text-3xl px-16 py-8 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-yellow-300 hover:border-yellow-200 font-black"
              >
                <Phone className="w-10 h-10 mr-4 animate-pulse" />
                CALL NOW: 205-835-0111
              </Button>
            </a>
            
            <div className="mt-8 text-lg opacity-90">
              <strong>Average Response Time: 2 Hours or Less</strong>
            </div>
          </div>
        </div>
      </section>
      
      <Footer lang={params.lang} />
    </div>
  )
}