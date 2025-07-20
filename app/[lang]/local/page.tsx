import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { birminghamMetroAreas, localServices } from '@/lib/local-pages-data'
import { Phone, MapPin, Clock, Shield, Award, CheckCircle, Star, Building2 } from 'lucide-react'

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'es' }
  ]
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es' }
}): Promise<Metadata> {
  const title = params.lang === 'en'
    ? 'Local HVAC Services Birmingham AL | Area-Specific AC & Heating Experts'
    : 'Servicios HVAC Locales Birmingham AL | Expertos AC y Calefacción por Área'
    
  const description = params.lang === 'en'
    ? 'Local HVAC specialists serving all Birmingham Metro areas. Area-specific AC repair, heating installation, and HVAC services. 15+ years local experience. Call 205-835-0111.'
    : 'Especialistas HVAC locales sirviendo todas las áreas del Metro Birmingham. Reparación AC, instalación de calefacción y servicios HVAC específicos por área. 15+ años experiencia local. Llame 205-835-0111.'

  return {
    title,
    description,
    keywords: params.lang === 'en'
      ? 'local HVAC services, Birmingham local AC repair, area HVAC contractors, neighborhood HVAC specialists'
      : 'servicios HVAC locales, reparación AC local Birmingham, contratistas HVAC por área, especialistas HVAC vecindario',
    alternates: {
      languages: {
        'en': '/en/local',
        'es': '/es/local',
      }
    }
  }
}

export default function LocalCategoryPage({ 
  params 
}: { 
  params: { lang: 'en' | 'es' } 
}) {
  const content = {
    en: {
      heroTitle: 'LOCAL HVAC EXPERTS',
      heroSubtitle: 'Area-Specific Service Throughout Birmingham Metro',
      heroDescription: 'Choose your neighborhood for specialized local HVAC service',
      servicesTitle: 'LOCAL HVAC SERVICES',
      servicesSubtitle: 'Complete range of local HVAC solutions for every Birmingham area',
      areasTitle: 'SERVICE AREAS',
      areasSubtitle: 'Local HVAC experts in your neighborhood',
      whyLocalTitle: 'Why Choose Local HVAC Specialists?',
      whyLocalSubtitle: 'Local expertise means faster response and better service',
      callNow: 'CALL NOW: 205-835-0111',
      getQuote: 'GET FREE QUOTE',
      available247: 'Available 24/7',
      localResponse: 'Local Response Team',
      areaKnowledge: 'Area Knowledge',
      fasterService: 'Faster Service',
      communityTrust: 'Community Trust'
    },
    es: {
      heroTitle: 'EXPERTOS HVAC LOCALES',
      heroSubtitle: 'Servicio Específico por Área en Todo el Metro Birmingham',
      heroDescription: 'Elija su vecindario para servicio HVAC local especializado',
      servicesTitle: 'SERVICIOS HVAC LOCALES',
      servicesSubtitle: 'Gama completa de soluciones HVAC locales para cada área de Birmingham',
      areasTitle: 'ÁREAS DE SERVICIO',
      areasSubtitle: 'Expertos HVAC locales en su vecindario',
      whyLocalTitle: '¿Por Qué Elegir Especialistas HVAC Locales?',
      whyLocalSubtitle: 'La experiencia local significa respuesta más rápida y mejor servicio',
      callNow: 'LLAME AHORA: 205-835-0111',
      getQuote: 'COTIZACIÓN GRATUITA',
      available247: 'Disponible 24/7',
      localResponse: 'Equipo de Respuesta Local',
      areaKnowledge: 'Conocimiento del Área',
      fasterService: 'Servicio Más Rápido',
      communityTrust: 'Confianza Comunitaria'
    }
  }

  const t = content[params.lang]

  // Group areas by region for better organization
  const premiumAreas = birminghamMetroAreas.slice(0, 8)
  const centralAreas = birminghamMetroAreas.slice(8, 16) 
  const expandedAreas = birminghamMetroAreas.slice(16)

  // Featured local services
  const featuredServices = localServices.slice(0, 9)

  return (
    <div className="min-h-screen">
      <Header lang={params.lang} />
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hvac-hero.jpg"
          alt="Local HVAC Services Birmingham"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/80" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-300 via-green-300 to-blue-300 bg-clip-text text-transparent">
              {t.heroTitle}
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-200">
            {t.heroSubtitle}
          </h2>
          
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
            {t.heroDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a href="tel:2058350111" className="transform hover:scale-105 transition-all">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-2xl font-black px-12 py-6 rounded-lg shadow-2xl border-4 border-yellow-400">
                <Phone className="w-8 h-8 mr-3 animate-pulse" />
                {t.callNow}
              </Button>
            </a>
            <div className="bg-green-600/90 text-white px-6 py-3 rounded-lg font-bold backdrop-blur border border-white/20">
              <MapPin className="w-5 h-5 inline mr-2" />
              {t.localResponse}
            </div>
          </div>

          {/* Local Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <MapPin className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="font-bold text-lg">{t.areaKnowledge}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Clock className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="font-bold text-lg">{t.fasterService}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Shield className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="font-bold text-lg">{t.communityTrust}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Services Section */}
      <section className="py-20 bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-gray-900">
              {t.servicesTitle}
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              {t.servicesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => {
              const currentService = params.lang === 'en' ? service.en : service.es
              // Link to Birmingham as example area for service
              const exampleLink = `/${params.lang}/local/birmingham-${currentService.slug}`
              
              return (
                <Link key={index} href={exampleLink} className="group">
                  <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-300 hover:border-green-400 transform hover:scale-105">
                    <Building2 className="w-16 h-16 text-green-600 mb-6 group-hover:text-green-700 transition-colors" />
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-green-700 transition-colors">
                      {currentService.name}
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed mb-4">
                      {params.lang === 'en' 
                        ? `Local ${currentService.name.toLowerCase()} specialists in your Birmingham area neighborhood.`
                        : `Especialistas locales en ${currentService.name.toLowerCase()} en su vecindario del área de Birmingham.`
                      }
                    </p>
                    <div className="flex items-center text-green-600 font-semibold">
                      <MapPin className="w-4 h-4 mr-2" />
                      {params.lang === 'en' ? 'All Local Areas' : 'Todas las Áreas Locales'}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 bg-gradient-to-b from-green-900 via-green-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              {t.areasTitle}
            </h2>
            <p className="text-xl text-green-200 max-w-4xl mx-auto">
              {t.areasSubtitle}
            </p>
          </div>

          {/* Premium Areas */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8 text-yellow-300">
              {params.lang === 'en' ? 'Premium Service Areas' : 'Áreas de Servicio Premium'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {premiumAreas.map((area) => {
                // Link to AC repair as example service
                const exampleService = params.lang === 'en' ? 'ac-repair' : 'reparacion-aire-acondicionado'
                const areaLink = `/${params.lang}/local/${area.slug}-${exampleService}`
                
                return (
                  <Link key={area.slug} href={areaLink} className="group">
                    <div className="bg-gradient-to-br from-green-700 to-green-900 p-6 rounded-xl border-2 border-green-500 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                      <h4 className="text-xl font-bold text-center mb-2 group-hover:text-yellow-300 transition-colors">
                        {area.name}
                      </h4>
                      <p className="text-green-200 text-center text-sm mb-3">
                        {params.lang === 'en' ? 'Local HVAC Experts' : 'Expertos HVAC Locales'}
                      </p>
                      <div className="text-center">
                        <MapPin className="w-5 h-5 inline text-yellow-400" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* All Other Areas */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8 text-yellow-300">
              {params.lang === 'en' ? 'All Birmingham Metro Areas' : 'Todas las Áreas del Metro Birmingham'}
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {expandedAreas.map((area) => {
                const exampleService = params.lang === 'en' ? 'ac-repair' : 'reparacion-aire-acondicionado'
                const areaLink = `/${params.lang}/local/${area.slug}-${exampleService}`
                
                return (
                  <Link key={area.slug} href={areaLink} className="group">
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:bg-white/20 transition-all text-center">
                      <MapPin className="w-4 h-4 mx-auto mb-1 text-yellow-400 group-hover:text-yellow-300" />
                      <div className="text-sm font-medium group-hover:text-yellow-300 transition-colors">
                        {area.name}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Local CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            {t.whyLocalTitle}
          </h2>
          <p className="text-2xl mb-12 max-w-4xl mx-auto">
            {t.whyLocalSubtitle}
          </p>
          
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
            <a href="tel:2058350111" className="transform hover:scale-105 transition-all">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-2xl font-black px-16 py-6 rounded-2xl shadow-2xl">
                <Phone className="w-8 h-8 mr-4" />
                {t.callNow}
              </Button>
            </a>
            <Link href={`/${params.lang}/quote`}>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 text-xl font-bold px-12 py-4 rounded-xl">
                {t.getQuote}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer lang={params.lang} />
    </div>
  )
}