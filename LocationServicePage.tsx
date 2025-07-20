import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { translations } from '@/lib/translations'
import { Phone, MapPin, Clock, CheckCircle, Star, Shield, Award } from 'lucide-react'

const services = [
  'Same-Day HVAC Repair',
  'Weekend Emergency Service',
  'Holiday HVAC Emergency Response',
  'Night Emergency HVAC Calls',
  'Emergency AC Repair During Heatwaves',
  'Emergency Heating Repair Winter',
  'Commercial Emergency HVAC Service',
  'Emergency Service Pricing Transparency',
  'Fast Emergency Response Guarantees'
]

const servicesEs = [
  'Reparación HVAC el Mismo Día',
  'Servicio de Emergencia Fin de Semana',
  'Respuesta de Emergencia HVAC en Días Festivos',
  'Llamadas de Emergencia HVAC Nocturnas',
  'Reparación AC de Emergencia Durante Olas de Calor',
  'Reparación de Calefacción de Emergencia en Invierno',
  'Servicio HVAC de Emergencia Comercial',
  'Transparencia de Precios de Servicio de Emergencia',
  'Garantías de Respuesta Rápida de Emergencia'
]

export default function LocationServicePage({ 
  lang, 
  location 
}: { 
  lang: 'en' | 'es'
  location: string
}) {
  const t = translations[lang]
  const serviceList = lang === 'en' ? services : servicesEs
  
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden hvac-section-location">
          <Image
            src="/images/hvac-hero.jpg"
            alt={`HVAC Service ${location}`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight">
              {lang === 'en' 
                ? `Emergency HVAC Repair ${location} AL - 24/7 AC & Heating Service Birmingham`
                : `Reparación HVAC de Emergencia ${location} AL - Servicio AC y Calefacción 24/7 Birmingham`}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-lg max-w-4xl mx-auto">
              {lang === 'en'
                ? `Licensed HVAC Contractors Serving ${location} - Same Day Repairs, Emergency Service & Free Estimates`
                : `Contratistas HVAC Licenciados Sirviendo ${location} - Reparaciones el Mismo Día, Servicio de Emergencia y Estimados Gratis`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a href="tel:2058350111">
                <Button size="lg" className="hvac-cta-emergency w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  {lang === 'en' ? 'Call Now: 205-835-0111' : 'Llame Ahora: 205-835-0111'}
                </Button>
              </a>
              <Link href={`/${lang}/quote`}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                  {lang === 'en' ? 'Get Free Quote' : 'Cotización Gratis'}
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Local Trust Indicators */}
        <section className="py-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 text-center">
              <div className="flex items-center">
                <MapPin className="w-8 h-8 mr-2" />
                <div>
                  <span className="text-lg font-semibold block">
                    {lang === 'en' ? `Serving ${location} Since 2009` : `Sirviendo ${location} Desde 2009`}
                  </span>
                  <span className="text-sm opacity-90">
                    {lang === 'en' ? 'Local Birmingham HVAC Experts' : 'Expertos HVAC Locales de Birmingham'}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-8 h-8 mr-2" />
                <div>
                  <span className="text-lg font-semibold block">
                    {lang === 'en' ? 'Average 45-Min Response' : 'Respuesta Promedio 45 Min'}
                  </span>
                  <span className="text-sm opacity-90">
                    {lang === 'en' ? '24/7 Emergency Service' : 'Servicio de Emergencia 24/7'}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="w-8 h-8 mr-2" />
                <div>
                  <span className="text-lg font-semibold block">
                    {lang === 'en' ? '500+ 5-Star Reviews' : '500+ Reseñas 5 Estrellas'}
                  </span>
                  <span className="text-sm opacity-90">
                    {lang === 'en' ? 'Verified Local Reviews' : 'Reseñas Locales Verificadas'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Grid */}
        <section className="hvac-section">
          <div className="container mx-auto px-4">
            <h2 className="hvac-title-service">
              {lang === 'en' 
                ? `HVAC Services Available in ${location}`
                : `Servicios HVAC Disponibles en ${location}`}
            </h2>
            <p className="hvac-subtitle">
              {lang === 'en'
                ? `Fast, reliable HVAC repair and maintenance services for ${location} residents and businesses`
                : `Servicios rápidos y confiables de reparación y mantenimiento HVAC para residentes y negocios de ${location}`}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceList.map((service, index) => (
                <div key={index} className="hvac-card hvac-float">
                  <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">{service}</h3>
                  <p className="text-gray-600 mb-4">
                    {lang === 'en' 
                      ? `Professional ${service.toLowerCase()} service in ${location} with guaranteed satisfaction.`
                      : `Servicio profesional de ${service.toLowerCase()} en ${location} con satisfacción garantizada.`}
                  </p>
                  <Link href={`/${lang}/quote`}>
                    <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                      {lang === 'en' ? 'Get Quote' : 'Cotización'}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Local SEO Content */}
        <section className="hvac-section-location">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">
                {lang === 'en' 
                  ? `Why ${location} Residents Choose Birmingham HVAC`
                  : `Por Qué los Residentes de ${location} Eligen Birmingham HVAC`}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="hvac-card">
                  <Shield className="w-12 h-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">
                    {lang === 'en' ? 'Licensed & Insured' : 'Licenciado y Asegurado'}
                  </h3>
                  <p className="text-gray-600">
                    {lang === 'en'
                      ? 'Fully licensed Alabama HVAC contractors with comprehensive insurance coverage for your peace of mind.'
                      : 'Contratistas HVAC de Alabama completamente licenciados con cobertura de seguro integral para su tranquilidad.'}
                  </p>
                </div>
                
                <div className="hvac-card">
                  <Award className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">
                    {lang === 'en' ? 'Award-Winning Service' : 'Servicio Galardonado'}
                  </h3>
                  <p className="text-gray-600">
                    {lang === 'en'
                      ? 'Recognized by Birmingham business community for exceptional HVAC service and customer satisfaction.'
                      : 'Reconocido por la comunidad empresarial de Birmingham por el servicio HVAC excepcional y la satisfacción del cliente.'}
                  </p>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-4">
                  {lang === 'en'
                    ? `When your HVAC system breaks down in ${location}, you need a reliable service provider who understands the unique climate challenges of Alabama. Our team has been serving ${location} for over 15 years, providing fast, efficient, and affordable HVAC repairs and installations.`
                    : `Cuando su sistema HVAC se descompone en ${location}, necesita un proveedor de servicios confiable que comprenda los desafíos climáticos únicos de Alabama. Nuestro equipo ha estado sirviendo a ${location} durante más de 15 años, proporcionando reparaciones e instalaciones HVAC rápidas, eficientes y asequibles.`}
                </p>
                
                <h3 className="text-2xl font-semibold mt-8 mb-4">
                  {lang === 'en' 
                    ? `Common HVAC Issues in ${location}`
                    : `Problemas Comunes de HVAC en ${location}`}
                </h3>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">
                      {lang === 'en'
                        ? 'High humidity causing system strain and mold growth'
                        : 'Alta humedad causando tensión en el sistema y crecimiento de moho'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">
                      {lang === 'en'
                        ? 'Frequent temperature fluctuations requiring system adjustments'
                        : 'Fluctuaciones frecuentes de temperatura que requieren ajustes del sistema'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">
                      {lang === 'en'
                        ? 'Seasonal allergies requiring improved air filtration'
                        : 'Alergias estacionales que requieren mejor filtración de aire'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">
                      {lang === 'en'
                        ? 'Power outages from storms affecting HVAC systems'
                        : 'Cortes de energía por tormentas que afectan los sistemas HVAC'}
                    </span>
                  </li>
                </ul>
                
                <div className="hvac-card-service mt-8">
                  <h3 className="text-xl font-semibold mb-3">
                    {lang === 'en' 
                      ? `Schedule Your ${location} HVAC Service Today`
                      : `Programe Su Servicio HVAC en ${location} Hoy`}
                  </h3>
                  <p className="mb-4">
                    {lang === 'en'
                      ? `Don't wait for a complete breakdown. Regular maintenance can prevent costly repairs and keep your ${location} home comfortable year-round.`
                      : `No espere a una avería completa. El mantenimiento regular puede prevenir reparaciones costosas y mantener su hogar en ${location} cómodo todo el año.`}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="tel:2058350111">
                      <Button size="lg" className="hvac-cta-primary w-full sm:w-auto">
                        <Phone className="w-5 h-5 mr-2" />
                        {lang === 'en' ? 'Call 205-835-0111' : 'Llame 205-835-0111'}
                      </Button>
                    </a>
                    <Link href={`/${lang}/quote`}>
                      <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white">
                        {lang === 'en' ? 'Get Free Quote' : 'Cotización Gratis'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}