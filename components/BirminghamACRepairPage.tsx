import Image from 'next/image'
import { Button } from './ui/button'
import { Phone, Clock, Shield, Award, Wrench, Thermometer, Star, MapPin, CheckCircle } from 'lucide-react'

// Content arrays - English and Spanish
const heroContent = {
  en: {
    title: "Expert AC Repair Services in",
    subtitle: "Birmingham, Alabama",
    tagline: "Licensed & Insured • Same Day Service • 100% Satisfaction Guarantee",
    callButton: "Call 205-835-0111",
    available: "Available 24/7"
  },
  es: {
    title: "Servicios Expertos de Reparación de AC en",
    subtitle: "Birmingham, Alabama", 
    tagline: "Con Licencia y Asegurados • Servicio el Mismo Día • Garantía de Satisfacción 100%",
    callButton: "Llame 205-835-0111",
    available: "Disponible 24/7"
  }
}

const problemSection = {
  en: {
    title: "AC Problems in Birmingham?",
    description: "When your AC breaks down in Birmingham's sweltering heat, you need fast, reliable repair service. Our expert technicians have been serving Birmingham families for over 15 years, from downtown lofts near Railroad Park to family homes in Forest Park, understanding exactly how Alabama's humid subtropical climate and frequent summer storms affect your air conditioning system."
  },
  es: {
    title: "¿Problemas con el AC en Birmingham?",
    description: "Cuando su aire acondicionado se descompone en el calor sofocante de Birmingham, necesita un servicio de reparación rápido y confiable. Nuestros técnicos expertos han estado sirviendo a las familias de Birmingham durante más de 15 años, desde apartamentos del centro cerca de Railroad Park hasta casas familiares en Forest Park, entendiendo exactamente cómo el clima subtropical húmedo de Alabama y las frecuentes tormentas de verano afectan su sistema de aire acondicionado."
  }
}

export default function BirminghamACRepairPageComponent({ lang }: { lang: 'en' | 'es' }) {
  const hero = heroContent[lang]
  const problem = problemSection[lang]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/ac-repair.jpg"
          alt="Reparación de Aire Acondicionado Birmingham Alabama"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/85 to-blue-600/65" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {lang === 'es' ? 'Servicios Expertos de Reparación de AC en' : 'Expert AC Repair Services in'}<br />
            <span className="text-blue-300">Birmingham, Alabama</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {lang === 'es' ? 'Con Licencia y Asegurados • Servicio el Mismo Día • Garantía de Satisfacción 100%' : 'Licensed & Insured • Same Day Service • 100% Satisfaction Guarantee'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:2058350111" className="transform hover:scale-105 transition-transform">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-12 py-4 rounded-lg shadow-2xl">
                <Phone className="w-6 h-6 mr-3" />
                {hero.callButton}
              </Button>
            </a>
            <div className="bg-blue-600/90 text-white px-6 py-3 rounded-lg font-semibold backdrop-blur border border-white/20">
              <Clock className="w-5 h-5 inline mr-2" />
              {hero.available}
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Bar */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center transform hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 mr-2" />
              <span className="font-semibold">{lang === 'es' ? 'Con Licencia y Asegurados' : 'Licensed & Insured'}</span>
            </div>
            <div className="flex items-center transform hover:scale-105 transition-transform">
              <Clock className="w-6 h-6 mr-2" />
              <span className="font-semibold">{lang === 'es' ? 'Servicio de Emergencia 24/7' : '24/7 Emergency Service'}</span>
            </div>
            <div className="flex items-center transform hover:scale-105 transition-transform">
              <Award className="w-6 h-6 mr-2" />
              <span className="font-semibold">{lang === 'es' ? '15+ Años de Experiencia' : '15+ Years Experience'}</span>
            </div>
            <div className="flex items-center transform hover:scale-105 transition-transform">
              <Star className="w-6 h-6 mr-2" />
              <span className="font-semibold">{lang === 'es' ? 'Calificación A+ BBB' : 'A+ BBB Rated'}</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Problem Section */}
            <div className="mb-20">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-l-8 border-red-500 border border-gray-200/50">
                <div className="p-12">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-4 rounded-full mr-6 flex-shrink-0">
                      <Wrench className="w-12 h-12 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        {problem.title}
                      </h2>
                      <p className="text-xl text-gray-700 leading-relaxed mb-8">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency CTA Section */}
            <div className="mb-20">
              <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl shadow-2xl text-white overflow-hidden">
                <div className="p-12 text-center relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/90 to-orange-600/90"></div>
                  <div className="relative z-10">
                    <h2 className="text-5xl font-bold mb-6">
                      {lang === 'es' ? '🚨 ¡Reparación de AC de Emergencia Disponible Ahora!' : '🚨 Emergency AC Repair Available Now!'}
                    </h2>
                    <p className="text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
                      {lang === 'es' 
                        ? '¡No sufra en el calor de Birmingham! Nuestros técnicos de emergencia están esperando 24/7 para restaurar la comodidad a su hogar con servicio rápido y profesional.'
                        : "Don't suffer in Birmingham's heat! Our emergency technicians are standing by 24/7 to restore comfort to your home with fast, professional service."
                      }
                    </p>
                    
                    <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-8">
                      <a href="tel:2058350111" className="transform hover:scale-105 transition-transform">
                        <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-2xl font-bold px-16 py-6 rounded-2xl shadow-2xl">
                          <Phone className="w-8 h-8 mr-4" />
                          {lang === 'es' ? '¡Llame 205-835-0111 Ahora!' : 'Call 205-835-0111 Now!'}
                        </Button>
                      </a>
                      <div className="bg-white/20 backdrop-blur border border-white/30 px-8 py-4 rounded-xl">
                        <Clock className="w-6 h-6 inline mr-3" />
                        <span className="text-xl font-bold">
                          {lang === 'es' ? 'Disponible 24/7 • Sin Cargos por Horas Extras' : 'Available 24/7 • No Overtime Charges'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}