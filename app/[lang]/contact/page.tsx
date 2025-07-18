import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { translations } from '@/lib/translations'
import { Phone, MapPin, Clock, Mail } from 'lucide-react'
import Image from 'next/image'

export default function ContactPage({ params }: { params: { lang: 'en' | 'es' } }) {
  const t = translations[params.lang]
  
  return (
    <div className="min-h-screen">
      <Header lang={params.lang} />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/emergency-service.jpg"
            alt="Contact Birmingham HVAC"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{t.contact.title}</h1>
            <p className="text-xl">
              {params.lang === 'en' 
                ? '24/7 Emergency Service Available'
                : 'Servicio de Emergencia 24/7 Disponible'}
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
                    <Phone className="w-6 h-6 text-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {params.lang === 'en' ? 'Phone' : 'Teléfono'}
                      </h3>
                      <p className="text-slate-600">205-835-0111</p>
                      <p className="text-sm text-slate-500">
                        {params.lang === 'en' 
                          ? '24/7 Emergency Service'
                          : 'Servicio de Emergencia 24/7'}
                      </p>
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
                <div className="bg-gradient-emergency text-white p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">
                    {params.lang === 'en' 
                      ? 'HVAC Emergency?'
                      : '¿Emergencia HVAC?'}
                  </h3>
                  <p className="mb-4">
                    {params.lang === 'en' 
                      ? "Don't wait! Call us now for immediate assistance."
                      : "¡No espere! Llámenos ahora para asistencia inmediata."}
                  </p>
                  <a href="tel:2058350111" className="inline-block">
                    <div className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      <Phone className="inline-block w-5 h-5 mr-2" />
                      205-835-0111
                    </div>
                  </a>
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
      
      <Footer lang={params.lang} />
    </div>
  )
}