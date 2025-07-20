import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { translations } from '@/lib/translations'
import ServiceList from '@/components/ServiceList'
import { Phone, Clock, Shield, Award, Users, Star, CheckCircle, Timer } from 'lucide-react'

export default function ServicesPage({ params }: { params: { lang: 'en' | 'es' } }) {
  const t = translations[params.lang]
  
  return (
    <div className="min-h-screen">
      <Header lang={params.lang} />
      
      {/* Massive Prominent Header Section */}
      <section className="relative py-32 bg-gradient-to-br from-red-600 via-orange-600 to-red-700 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-800/20 via-orange-700/20 to-red-900/20 animate-pulse"></div>
        
        {/* Emergency Pulse Animation */}
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-4 border-yellow-400 animate-ping opacity-30"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full border-4 border-white animate-ping opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Massive Headline */}
          <div className="text-center mb-12">
            <h1 className="text-7xl md:text-8xl font-black text-white mb-6 leading-tight transform hover:scale-105 transition-all duration-300 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-pulse">
                EMERGENCY
              </span>
              <br />
              <span className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg">
                HVAC SERVICES
              </span>
              <br />
              <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
                NEAR YOU
              </span>
            </h1>
            
            {/* Urgency Subtitle */}
            <p className="text-3xl md:text-4xl font-bold text-yellow-300 mb-8 drop-shadow-lg animate-bounce">
              ⚡ RESPONSE TIME: UNDER 60 MINUTES ⚡
            </p>
            
            {/* Trust Signals Bar */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12 bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center text-white text-xl font-semibold">
                <Award className="w-8 h-8 text-yellow-400 mr-3" />
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center text-white text-xl font-semibold">
                <Users className="w-8 h-8 text-yellow-400 mr-3" />
                <span>5,000+ Satisfied Customers</span>
              </div>
              <div className="flex items-center text-white text-xl font-semibold">
                <Shield className="w-8 h-8 text-yellow-400 mr-3" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center text-white text-xl font-semibold">
                <Star className="w-8 h-8 text-yellow-400 mr-3" />
                <span>5-Star Rated</span>
              </div>
            </div>
          </div>
          
          {/* Massive Call-to-Action */}
          <div className="text-center mb-16">
            <a href="tel:205-835-0111" className="inline-block group">
              <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-2 rounded-3xl shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse">
                <div className="bg-white rounded-2xl px-12 py-8 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Phone className="w-12 h-12 text-red-600 mr-4 animate-bounce" />
                    <span className="text-5xl font-black text-red-600">(205) 835-0111</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 mb-2">CALL NOW FOR EMERGENCY SERVICE</p>
                  <p className="text-lg text-gray-600 font-semibold">Available 24/7 • Same-Day Service</p>
                </div>
              </div>
            </a>
          </div>
          
          {/* Urgent Service Promises */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <Timer className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">IMMEDIATE RESPONSE</h3>
              <p className="text-white/90 text-lg">We answer calls within 2 rings and dispatch techs in under 60 minutes</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <CheckCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">SAME-DAY REPAIRS</h3>
              <p className="text-white/90 text-lg">Most emergency repairs completed the same day, guaranteed</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <Clock className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">24/7 AVAILABILITY</h3>
              <p className="text-white/90 text-lg">Nights, weekends, holidays - we're always here for you</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Services Section */}
      <main className="py-24 bg-gradient-to-br from-slate-100 via-blue-100 to-red-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-600 via-red-500 to-orange-500 bg-clip-text text-transparent leading-tight drop-shadow-sm">
              Our Emergency HVAC Services
            </h2>
            <p className="text-2xl text-center text-slate-700 mb-12 max-w-4xl mx-auto font-medium leading-relaxed bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              {t.services.subtitle}
            </p>
          </div>
          
          <ServiceList lang={params.lang} />
        </div>
      </main>
      
      <Footer lang={params.lang} />
    </div>
  )
}