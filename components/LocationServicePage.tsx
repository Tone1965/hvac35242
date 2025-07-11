import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { translations } from '@/lib/translations'
import { Phone, MapPin, Clock, CheckCircle, Star } from 'lucide-react'

const services = [
  'Same-Day HVAC Repair',
  'Weekend Emergency Service',
  'Holiday HVAC Emergency Response',
  'Night Emergency HVAC Calls',
  'Emergency AC Repair During Heatwaves',
  'Emergency Heating Repair Winter',
  'Commercial Emergency HVAC Service',
  'Emergency Service Pricing Transparency',
  'Emergency Response Time Guarantees'
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
  'Garantías de Tiempo de Respuesta de Emergencia'
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
    <main>
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hvac-hero.jpg"
          alt={`HVAC Service ${location}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {lang === 'en' 
              ? `HVAC Repair ${location}, Alabama`
              : `Reparación HVAC ${location}, Alabama`}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {lang === 'en'
              ? `Professional 24/7 Emergency HVAC Service in ${location}`
              : `Servicio HVAC de Emergencia Profesional 24/7 en ${location}`}
          </p>
          <a href="tel:2058301111">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-lg px-8">
              <Phone className="w-5 h-5 mr-2" />
              {lang === 'en' ? 'Call Now: 205-830-1111' : 'Llame Ahora: 205-830-1111'}
            </Button>
          </a>
        </div>
      </section>
      
      {/* Local Trust Indicators */}
      <section className="py-8 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center">
              <MapPin className="w-8 h-8 mr-2" />
              <span className="text-lg font-semibold">
                {lang === 'en' ? `Serving ${location} Since 2009` : `Sirviendo ${location} Desde 2009`}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="w-8 h-8 mr-2" />
              <span className="text-lg font-semibold">
                {lang === 'en' ? 'Average 45-Min Response' : 'Respuesta Promedio 45 Min'}
              </span>
            </div>
            <div className="flex items-center">
              <Star className="w-8 h-8 mr-2" />
              <span className="text-lg font-semibold">
                {lang === 'en' ? '500+ 5-Star Reviews' : '500+ Reseñas 5 Estrellas'}
              </span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            {lang === 'en' 
              ? `HVAC Services Available in ${location}`
              : `Servicios HVAC Disponibles en ${location}`}
          </h2>
          <p className="text-xl text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            {lang === 'en'
              ? `Fast, reliable HVAC repair and maintenance services for ${location} residents and businesses`
              : `Servicios rápidos y confiables de reparación y mantenimiento HVAC para residentes y negocios de ${location}`}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceList.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
                <h3 className="text-lg font-semibold mb-2">{service}</h3>
                <p className="text-slate-600">
                  {lang === 'en' 
                    ? `Professional ${service.toLowerCase()} service in ${location} with guaranteed satisfaction.`
                    : `Servicio profesional de ${service.toLowerCase()} en ${location} con satisfacción garantizada.`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Local SEO Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              {lang === 'en' 
                ? `Why ${location} Residents Choose Birmingham HVAC`
                : `Por Qué los Residentes de ${location} Eligen Birmingham HVAC`}
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-4">
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
                  <span className="text-slate-600">
                    {lang === 'en'
                      ? 'High humidity causing system strain and mold growth'
                      : 'Alta humedad causando tensión en el sistema y crecimiento de moho'}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">
                    {lang === 'en'
                      ? 'Frequent temperature fluctuations requiring system adjustments'
                      : 'Fluctuaciones frecuentes de temperatura que requieren ajustes del sistema'}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">
                    {lang === 'en'
                      ? 'Seasonal allergies requiring improved air filtration'
                      : 'Alergias estacionales que requieren mejor filtración de aire'}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-slate-600">
                    {lang === 'en'
                      ? 'Power outages from storms affecting HVAC systems'
                      : 'Cortes de energía por tormentas que afectan los sistemas HVAC'}
                  </span>
                </li>
              </ul>
              
              <div className="bg-blue-50 p-6 rounded-lg mt-8">
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
                <a href="tel:2058301111">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    {lang === 'en' ? 'Call 205-830-1111' : 'Llame 205-830-1111'}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}