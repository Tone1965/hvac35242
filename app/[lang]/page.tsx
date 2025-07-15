import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { translations } from '@/lib/translations'
import { 
  Clock, Shield, Award, ThermometerSun, 
  Snowflake, Building2, DollarSign, Timer, Phone
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
  'HTW 280 Corridor',
  'Valleydale',
  'Hwy 119'
]

export default function HomePage({ params }: { params: { lang: 'en' | 'es' } }) {
  const t = translations[params.lang]
  
  return (
    <div className="min-h-screen">
      <Header lang={params.lang} />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hvac-hero.jpg"
          alt="HVAC Service Birmingham"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${params.lang}/contact`}>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-lg px-8">
                {t.hero.cta}
              </Button>
            </Link>
            <a href="tel:2058301111">
              <Button size="lg" variant="destructive" className="text-lg px-8">
                <Phone className="w-5 h-5 mr-2" />
                {t.hero.emergency}
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      {/* Trust Indicators */}
      <section className="py-8 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm">{params.lang === 'en' ? 'Emergency Service' : 'Servicio de Emergencia'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm">{params.lang === 'en' ? 'Years Experience' : 'Años de Experiencia'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm">{params.lang === 'en' ? 'Satisfaction' : 'Satisfacción'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold">A+</div>
              <div className="text-sm">{params.lang === 'en' ? 'BBB Rating' : 'Calificación BBB'}</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">{t.services.title}</h2>
          <p className="text-xl text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            {t.services.subtitle}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, key }) => {
              const service = t.services[key as keyof typeof t.services];
              if (typeof service === 'object' && service.title && service.desc) {
                return (
                  <div 
                    key={key}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-slate-200"
                  >
                    <Icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-600">
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
              <Button size="lg" variant="outline">
                {params.lang === 'en' ? 'View All Services' : 'Ver Todos los Servicios'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Locations Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">{t.locations.title}</h2>
          <p className="text-xl text-center text-slate-600 mb-12">
            {t.locations.subtitle}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {locations.map((location) => (
              <Link
                key={location}
                href={`/${params.lang}/services/locations/${location.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-primary text-white p-4 rounded-lg text-center hover:bg-primary/90 transition-colors"
              >
                {location}
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {params.lang === 'en' 
              ? 'Need Emergency HVAC Service?' 
              : '¿Necesita Servicio HVAC de Emergencia?'}
          </h2>
          <p className="text-xl mb-8">
            {params.lang === 'en'
              ? 'Available 24/7 for all your heating and cooling emergencies'
              : 'Disponible 24/7 para todas sus emergencias de calefacción y refrigeración'}
          </p>
          <a href="tel:2058301111">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
              <Phone className="w-5 h-5 mr-2" />
              {params.lang === 'en' ? 'Call Now: 205-830-1111' : 'Llame Ahora: 205-830-1111'}
            </Button>
          </a>
        </div>
      </section>
      
      <Footer lang={params.lang} />
    </div>
  )
}