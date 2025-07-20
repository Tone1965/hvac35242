import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { translations } from '@/lib/translations'
import { Phone, CheckCircle, Clock, Shield, Award } from 'lucide-react'

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

// Function to convert location names to proper URL slugs
const getLocationSlug = (location: string) => {
  // Handle special cases for consistent URL generation
  const specialCases: { [key: string]: string } = {
    'HWY 280 Corridor': 'hwy-280-corridor',
    'HTW 280 Corridor': 'hwy-280-corridor', // Handle legacy references
    'River Chase': 'river-chase',
    'Mountain Brook': 'mountain-brook',
    'Hwy 119': 'hwy-119'
  }
  
  return specialCases[location] || location.toLowerCase().replace(/\s+/g, '-')
}

export default function ServiceDetail({ 
  lang, 
  serviceKey, 
  serviceImage 
}: { 
  lang: 'en' | 'es'
  serviceKey: string
  serviceImage: string 
}) {
  const t = translations[lang]
  const serviceData = t.services[serviceKey as keyof typeof t.services]
  
  // Type guard to ensure we have a service object with title and desc
  const service = typeof serviceData === 'object' && serviceData !== null && 'title' in serviceData && 'desc' in serviceData 
    ? serviceData as { title: string; desc: string }
    : { title: serviceKey, desc: '' }
  
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src={serviceImage}
          alt={service.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl max-w-3xl mx-auto">{service.desc}</p>
        </div>
      </section>
      
      {/* Service Details */}
      <section className="py-16 bg-gradient-to-br from-slate-100 via-blue-100 to-red-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {lang === 'en' ? 'Professional Service You Can Trust' : 'Servicio Profesional en el que Puede Confiar'}
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">
                      {lang === 'en' ? 'Licensed & Insured Technicians' : 'Técnicos Licenciados y Asegurados'}
                    </h3>
                    <p className="text-slate-600">
                      {lang === 'en' 
                        ? 'All our technicians are fully licensed, insured, and background checked for your peace of mind.'
                        : 'Todos nuestros técnicos están completamente licenciados, asegurados y verificados para su tranquilidad.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">
                      {lang === 'en' ? 'Fast Response Time' : 'Tiempo de Respuesta Rápido'}
                    </h3>
                    <p className="text-slate-600">
                      {lang === 'en' 
                        ? 'We guarantee fast response for emergency calls, with quick arrival times.'
                        : 'Garantizamos respuesta rápida para llamadas de emergencia, con tiempos de llegada rápidos.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">
                      {lang === 'en' ? 'Quality Guarantee' : 'Garantía de Calidad'}
                    </h3>
                    <p className="text-slate-600">
                      {lang === 'en' 
                        ? 'We stand behind our work with a comprehensive warranty on all repairs and installations.'
                        : 'Respaldamos nuestro trabajo con una garantía completa en todas las reparaciones e instalaciones.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Award className="w-6 h-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">
                      {lang === 'en' ? 'Award-Winning Service' : 'Servicio Galardonado'}
                    </h3>
                    <p className="text-slate-600">
                      {lang === 'en' 
                        ? 'Recognized as Birmingham\'s top HVAC service provider for customer satisfaction.'
                        : 'Reconocido como el mejor proveedor de servicios HVAC de Birmingham por satisfacción del cliente.'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary text-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">
                  {lang === 'en' ? 'Need Immediate Service?' : '¿Necesita Servicio Inmediato?'}
                </h3>
                <p className="mb-4">
                  {lang === 'en' 
                    ? 'Our emergency team is standing by 24/7'
                    : 'Nuestro equipo de emergencia está disponible 24/7'}
                </p>
                <a href="tel:2058350111">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full">
                    <Phone className="w-5 h-5 mr-2" />
                    205-835-0111
                  </Button>
                </a>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {lang === 'en' ? 'Service Areas' : 'Áreas de Servicio'}
              </h2>
              <p className="text-slate-600 mb-6">
                {lang === 'en' 
                  ? 'We proudly serve Birmingham and all surrounding communities with fast, reliable HVAC service.'
                  : 'Orgullosamente servimos a Birmingham y todas las comunidades circundantes con servicio HVAC rápido y confiable.'}
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {locations.map((location) => (
                  <Link
                    key={location}
                    href={`/${lang}/services/locations/${getLocationSlug(location)}`}
                    className="bg-slate-100 hover:bg-slate-200 p-3 rounded-lg text-center transition-colors"
                  >
                    {location}
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-slate-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">
                  {lang === 'en' ? 'Why Choose Us?' : '¿Por Qué Elegirnos?'}
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {lang === 'en' ? 'No hidden fees or surprises' : 'Sin tarifas ocultas ni sorpresas'}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {lang === 'en' ? 'Upfront, transparent pricing' : 'Precios transparentes y por adelantado'}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {lang === 'en' ? 'Same-day service available' : 'Servicio el mismo día disponible'}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {lang === 'en' ? 'Emergency service 24/7/365' : 'Servicio de emergencia 24/7/365'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}