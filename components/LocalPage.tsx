import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import Header from './Header'
import Footer from './Footer'
import { Phone, MapPin, Clock, Shield, Award, CheckCircle, Star } from 'lucide-react'

interface LocalPageProps {
  area: {
    name: string
    slug: string
    zipCodes: string[]
    landmarks: string[]
    description: string
  }
  service: {
    en: { name: string; slug: string }
    es: { name: string; slug: string }
  }
  lang: 'en' | 'es'
}

export default function LocalPage({ area, service, lang }: LocalPageProps) {
  const currentService = lang === 'en' ? service.en : service.es
  
  const content = {
    en: {
      metaTitle: `${currentService.name} in ${area.name} AL | Local HVAC Experts | 205-835-0111`,
      metaDescription: `Local ${currentService.name.toLowerCase()} specialists in ${area.name} Alabama. Same-day service, 15+ years experience. Call 205-835-0111 now.`,
      h1: `Local ${currentService.name} Experts in ${area.name}, Alabama`,
      h2: `Why ${area.name} Residents Choose Local HVAC Specialists`,
      h3: `Licensed Local ${currentService.name} Contractors`,
      problemHeading: `${currentService.name} Problems in ${area.name}?`,
      localExpertsHeading: `Your LOCAL ${area.name} HVAC Specialists`,
      serviceHeading: `LOCAL ${currentService.name} Services in ${area.name}`,
      emergencyHeading: `24/7 LOCAL Emergency Service`,
      ctaHeading: `Choose LOCAL. Choose Trusted.`,
      callNow: 'CALL NOW: 205-835-0111',
      getQuote: 'GET FREE QUOTE',
      available24_7: 'Available 24/7',
      sameDay: 'Same-Day Service',
      licensed: 'Licensed & Insured',
      experience: '15+ Years Experience',
      localResponse: 'LOCAL Response Team',
      noHiddenFees: 'No Hidden Fees',
      satisfaction: '100% Satisfaction',
      aPlus: 'A+ BBB Rating'
    },
    es: {
      metaTitle: `${currentService.name} Local en ${area.name} AL | Expertos HVAC | 205-835-0111`,
      metaDescription: `Especialistas locales en ${currentService.name.toLowerCase()} en ${area.name} Alabama. Servicio el mismo día, 15+ años experiencia. Llame 205-835-0111.`,
      h1: `Expertos Locales en ${currentService.name} en ${area.name}, Alabama`,
      h2: `Por Qué los Residentes de ${area.name} Eligen Especialistas HVAC Locales`,
      h3: `Contratistas Locales de ${currentService.name} con Licencia`,
      problemHeading: `¿Problemas de ${currentService.name} en ${area.name}?`,
      localExpertsHeading: `Sus Especialistas HVAC LOCALES de ${area.name}`,
      serviceHeading: `Servicios LOCALES de ${currentService.name} en ${area.name}`,
      emergencyHeading: `Servicio de Emergencia LOCAL 24/7`,
      ctaHeading: `Elija LOCAL. Elija Confianza.`,
      callNow: 'LLAME AHORA: 205-835-0111',
      getQuote: 'COTIZACIÓN GRATUITA',
      available24_7: 'Disponible 24/7',
      sameDay: 'Servicio el Mismo Día',
      licensed: 'Con Licencia y Asegurados',
      experience: '15+ Años de Experiencia',
      localResponse: 'Equipo de Respuesta LOCAL',
      noHiddenFees: 'Sin Cargos Ocultos',
      satisfaction: '100% Satisfacción',
      aPlus: 'Calificación A+ BBB'
    }
  }

  const t = content[lang]

  // Local Psychology Formula Content
  const generateLocalContent = () => {
    if (lang === 'en') {
      return {
        paragraph1: `When your ${currentService.name.toLowerCase()} needs attention in ${area.name}, you need LOCAL experts who understand the unique challenges of Alabama's climate and the specific needs of ${area.description}. Our LOCAL team knows exactly how the weather patterns around ${area.landmarks[0]} and throughout the ${area.zipCodes.join(', ')} zip codes affect your HVAC system.`,
        
        paragraph2: `As your LOCAL ${area.name} HVAC specialists, we've served this community for over 15 years, building relationships with families throughout ${area.landmarks.slice(0, 2).join(' and ')}. Our LOCAL expertise means we understand the common ${currentService.name.toLowerCase()} issues specific to homes in ${area.name}, from the older neighborhoods near ${area.landmarks[0]} to the newer developments throughout the area.`,
        
        paragraph3: `Our LOCAL ${area.name} team knows the neighborhoods, the homes, and the common issues in zip codes ${area.zipCodes.join(', ')}. When you call for ${currentService.name.toLowerCase()}, you're not getting a distant contractor – you're getting your LOCAL neighbors who live and work right here in the Birmingham Metro area. We understand the specific challenges that Alabama's humid subtropical climate presents to HVAC systems in ${area.name}.`,
        
        paragraph4: `Your LOCAL experts are standing by right now. Don't wait when your comfort is on the line – our LOCAL ${area.name} team can respond quickly because we're already in your neighborhood. Call NOW: 205-835-0111 for immediate LOCAL service that you can trust.`,
        
        paragraph5: `Choose LOCAL. Choose trusted. Choose Birmingham HVAC Experts – your LOCAL ${area.name} HVAC specialists who understand your community, your climate, and your needs.`
      }
    } else {
      return {
        paragraph1: `Cuando su ${currentService.name.toLowerCase()} necesita atención en ${area.name}, necesita expertos LOCALES que entiendan los desafíos únicos del clima de Alabama y las necesidades específicas de ${area.description}. Nuestro equipo LOCAL sabe exactamente cómo los patrones climáticos alrededor de ${area.landmarks[0]} y en toda la zona de códigos postales ${area.zipCodes.join(', ')} afectan su sistema HVAC.`,
        
        paragraph2: `Como sus especialistas HVAC LOCALES de ${area.name}, hemos servido esta comunidad por más de 15 años, construyendo relaciones con familias en ${area.landmarks.slice(0, 2).join(' y ')}. Nuestra experiencia LOCAL significa que entendemos los problemas comunes de ${currentService.name.toLowerCase()} específicos de las casas en ${area.name}, desde los vecindarios más antiguos cerca de ${area.landmarks[0]} hasta los nuevos desarrollos en toda el área.`,
        
        paragraph3: `Nuestro equipo LOCAL de ${area.name} conoce los vecindarios, las casas y los problemas comunes en los códigos postales ${area.zipCodes.join(', ')}. Cuando llama para ${currentService.name.toLowerCase()}, no está obteniendo un contratista distante – está obteniendo a sus vecinos LOCALES que viven y trabajan aquí mismo en el área metropolitana de Birmingham. Entendemos los desafíos específicos que el clima subtropical húmedo de Alabama presenta a los sistemas HVAC en ${area.name}.`,
        
        paragraph4: `Sus expertos LOCALES están esperando ahora mismo. No espere cuando su comodidad está en juego – nuestro equipo LOCAL de ${area.name} puede responder rápidamente porque ya estamos en su vecindario. Llame AHORA: 205-835-0111 para servicio LOCAL inmediato en el que puede confiar.`,
        
        paragraph5: `Elija LOCAL. Elija confianza. Elija Birmingham HVAC Experts – sus especialistas HVAC LOCALES de ${area.name} que entienden su comunidad, su clima y sus necesidades.`
      }
    }
  }

  const localContent = generateLocalContent()

  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="keywords" content={`local ${currentService.name.toLowerCase()}, ${area.name} HVAC, Birmingham HVAC, ${area.zipCodes.join(', ')}`} />
        <link rel="canonical" href={`https://www.hvac35242.com/${lang}/local/${area.slug}-${currentService.slug}`} />
      </head>

      <Header lang={lang} />
      
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hvac-hero.jpg"
          alt={`${currentService.name} ${area.name} Alabama`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/70" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            LOCAL {currentService.name} EXPERTS<br />
            <span className="text-yellow-300">in {area.name}, Alabama</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto font-semibold">
            {t.licensed} • {t.sameDay} • {t.experience}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <a href="tel:2058350111" className="transform hover:scale-105 transition-all">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-2xl font-black px-12 py-6 rounded-lg shadow-2xl border-4 border-yellow-400">
                <Phone className="w-8 h-8 mr-3 animate-pulse" />
                {t.callNow}
              </Button>
            </a>
            <div className="bg-blue-600/90 text-white px-6 py-3 rounded-lg font-bold backdrop-blur border border-white/20">
              <Clock className="w-5 h-5 inline mr-2" />
              {t.available24_7}
            </div>
          </div>

          {/* Local Landmarks */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-3xl mx-auto border border-white/20">
            <p className="text-lg font-semibold mb-2">Serving All {area.name} Area Including:</p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              {area.landmarks.map((landmark, index) => (
                <span key={index} className="bg-yellow-400/20 text-yellow-200 px-3 py-1 rounded-full border border-yellow-400/30">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Shield className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="font-bold">{t.licensed}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Clock className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="font-bold">{t.localResponse}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Award className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="font-bold">{t.experience}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Star className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="font-bold">{t.aPlus}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Local Psychology Formula */}
      <section className="py-20 bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            
            {/* Problem Section - Paragraph 1 */}
            <div className="mb-16">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-l-8 border-red-500 border border-gray-200/50">
                <div className="p-12">
                  <h2 className="text-4xl font-black text-gray-800 mb-6 flex items-center">
                    <MapPin className="w-10 h-10 text-red-600 mr-4" />
                    {t.problemHeading}
                  </h2>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {localContent.paragraph1}
                  </p>
                </div>
              </div>
            </div>

            {/* Local Authority - Paragraph 2 */}
            <div className="mb-16">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-l-8 border-blue-500 border border-gray-200/50">
                <div className="p-12">
                  <h2 className="text-4xl font-black text-gray-800 mb-6 flex items-center">
                    <Shield className="w-10 h-10 text-blue-600 mr-4" />
                    {t.localExpertsHeading}
                  </h2>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {localContent.paragraph2}
                  </p>
                </div>
              </div>
            </div>

            {/* Local Service Benefits - Paragraph 3 */}
            <div className="mb-16">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-l-8 border-green-500 border border-gray-200/50">
                <div className="p-12">
                  <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                    {t.h3}
                  </h3>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {localContent.paragraph3}
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency CTA - Paragraph 4 */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl shadow-2xl text-white overflow-hidden">
                <div className="p-12 text-center">
                  <h2 className="text-5xl font-black mb-6">
                    {t.emergencyHeading}
                  </h2>
                  <p className="text-2xl mb-8 leading-relaxed max-w-4xl mx-auto">
                    {localContent.paragraph4}
                  </p>
                  
                  <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
                    <a href="tel:2058350111" className="transform hover:scale-105 transition-all">
                      <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-2xl font-black px-16 py-6 rounded-2xl shadow-2xl">
                        <Phone className="w-8 h-8 mr-4" />
                        {t.callNow}
                      </Button>
                    </a>
                    <Link href={`/${lang}/quote`}>
                      <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 text-xl font-bold px-12 py-4 rounded-xl">
                        {t.getQuote}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Local CTA - Paragraph 5 */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl shadow-2xl text-white p-12">
                <h2 className="text-4xl font-black mb-6">{t.ctaHeading}</h2>
                <p className="text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
                  {localContent.paragraph5}
                </p>
                <div className="text-yellow-300 font-bold text-lg">
                  Your LOCAL {area.name} HVAC Experts Since 2009
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  )
}