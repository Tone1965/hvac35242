import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { translations } from '@/lib/translations'
import { Phone, MapPin, Clock, Mail, AlertTriangle, Zap, Thermometer, Fan, Wrench } from 'lucide-react'
import Image from 'next/image'

export default async function ContactPage({ params }: { params: Promise<{ lang: 'en' | 'es' }> }) {
  const { lang } = await params
  const t = translations[lang]
  
  return (
    <div className="min-h-screen">
      <Header lang={lang} />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/emergency-service.jpg"
            alt="Contact Birmingham HVAC"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
          
          {/* Floating HVAC Icons */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 animate-bounce">
              <Thermometer className="w-8 h-8 text-blue-400 opacity-60" />
            </div>
            <div className="absolute top-32 right-16 animate-pulse">
              <Fan className="w-10 h-10 text-blue-300 opacity-50" />
            </div>
            <div className="absolute bottom-24 left-20 animate-ping">
              <Wrench className="w-6 h-6 text-yellow-400 opacity-70" />
            </div>
            <div className="absolute bottom-40 right-10 animate-bounce" style={{animationDelay: '0.5s'}}>
              <Zap className="w-8 h-8 text-red-400 opacity-60" />
            </div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            {/* Emergency Alert Banner */}
            <div className="mb-6 flex items-center justify-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-red-400 animate-pulse" />
              <div className="bg-red-600/90 px-4 py-2 rounded-full animate-pulse">
                <span className="text-sm font-bold uppercase tracking-wide">
                  {params.lang === 'en' ? 'HVAC EMERGENCY?' : '¿EMERGENCIA HVAC?'}
                </span>
              </div>
              <AlertTriangle className="w-6 h-6 text-red-400 animate-pulse" />
            </div>
            
            <h1 className="text-6xl font-bold mb-4 animate-fade-in">{t.contact.title}</h1>
            
            {/* Pulsing Emergency Hotline */}
            <div className="mb-6">
              <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform animate-pulse">
                <div className="flex items-center space-x-4">
                  <Phone className="w-8 h-8 text-white animate-bounce" />
                  <div>
                    <p className="text-sm uppercase tracking-wide font-semibold text-red-100">
                      {params.lang === 'en' ? 'EMERGENCY HOTLINE' : 'LÍNEA DE EMERGENCIA'}
                    </p>
                    <a href="tel:2058350111" className="text-4xl font-bold text-white hover:text-red-100 transition-colors">
                      (205) 835-0111
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dynamic 24/7 Available */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent animate-pulse">
                {params.lang === 'en' ? '24/7 AVAILABLE NOW' : '24/7 DISPONIBLE AHORA'}
              </span>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            <p className="text-xl text-gray-200">
              {params.lang === 'en' 
                ? 'Immediate Response • Professional Service • Licensed Technicians'
                : 'Respuesta Inmediata • Servicio Profesional • Técnicos Licenciados'}
            </p>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  {params.lang === 'en' 
                    ? 'Get in Touch'
                    : 'Póngase en Contacto'}
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <Phone className="w-8 h-8 text-red-600 mr-4 mt-1 animate-pulse" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {params.lang === 'en' ? 'Phone' : 'Teléfono'}
                      </h3>
                      <a href="tel:2058350111" className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors">
                        (205) 835-0111
                      </a>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-medium text-green-600">
                          {params.lang === 'en' 
                            ? '24/7 Emergency Service'
                            : 'Servicio de Emergencia 24/7'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {params.lang === 'en' ? 'Email' : 'Correo Electrónico'}
                      </h3>
                      <p className="text-slate-600">service@birminghamhvac.com</p>
                      <p className="text-sm text-slate-500">
                        {params.lang === 'en' 
                          ? 'Fast response guaranteed'
                          : 'Respuesta rápida garantizada'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {params.lang === 'en' ? 'Service Area' : 'Área de Servicio'}
                      </h3>
                      <p className="text-slate-600">
                        {params.lang === 'en' 
                          ? 'Birmingham, AL and surrounding areas'
                          : 'Birmingham, AL y áreas circundantes'}
                      </p>
                      <p className="text-sm text-slate-500">
                        {params.lang === 'en' 
                          ? 'Including Pelham, Hoover, Homewood, and more'
                          : 'Incluyendo Pelham, Hoover, Homewood, y más'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {params.lang === 'en' ? 'Business Hours' : 'Horario de Atención'}
                      </h3>
                      <p className="text-slate-600">
                        {params.lang === 'en' 
                          ? 'Monday - Friday: 7:00 AM - 8:00 PM'
                          : 'Lunes - Viernes: 7:00 AM - 8:00 PM'}
                      </p>
                      <p className="text-slate-600">
                        {params.lang === 'en' 
                          ? 'Saturday - Sunday: 8:00 AM - 6:00 PM'
                          : 'Sábado - Domingo: 8:00 AM - 6:00 PM'}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        {params.lang === 'en' 
                          ? 'Emergency service available 24/7'
                          : 'Servicio de emergencia disponible 24/7'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Emergency CTA */}
                <div className="bg-gradient-emergency text-white p-8 rounded-xl shadow-2xl animate-emergency-pulse border-2 border-red-400">
                  <div className="flex items-center mb-3">
                    <AlertTriangle className="w-8 h-8 text-yellow-300 mr-3 animate-bounce" />
                    <h3 className="text-2xl font-bold uppercase tracking-wide">
                      {params.lang === 'en' 
                        ? 'HVAC EMERGENCY?'
                        : '¿EMERGENCIA HVAC?'}
                    </h3>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-lg font-semibold mb-2">
                      {params.lang === 'en' 
                        ? "DON'T WAIT! Call us NOW for immediate assistance."
                        : "¡NO ESPERE! Llámenos AHORA para asistencia inmediata."}
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                      <span className="font-medium">
                        {params.lang === 'en' 
                          ? 'Technicians available now'
                          : 'Técnicos disponibles ahora'}
                      </span>
                    </div>
                  </div>
                  
                  <a href="tel:2058350111" className="inline-block group">
                    <div className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      <Phone className="inline-block w-6 h-6 mr-3 animate-phone-ring" />
                      (205) 835-0111
                      <span className="block text-sm font-medium mt-1 text-red-500">
                        {params.lang === 'en' ? 'Tap to call now' : 'Toca para llamar ahora'}
                      </span>
                    </div>
                  </a>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm opacity-90">
                      {params.lang === 'en' 
                        ? 'Average response time: 30 minutes'
                        : 'Tiempo promedio de respuesta: 30 minutos'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <ContactForm lang={params.lang} />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer lang={lang} />
    </div>
  )
}