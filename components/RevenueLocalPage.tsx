import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import Header from './Header'
import Footer from './Footer'
import { generateInternalLinks, prioritizeLinksForRevenue, generateContextualLinkText, generateLinkMagnets } from '@/lib/internal-linking-strategy'
import { Phone, MapPin, Clock, Shield, Award, CheckCircle, Star, DollarSign, AlertTriangle, TrendingUp, Thermometer, Wind, Zap, Home, Wrench, Calendar } from 'lucide-react'

interface RevenueLocalPageProps {
  area: {
    name: string
    slug: string
    zipCodes: string[]
    landmarks: string[]
    description: string
    demographics?: {
      medianIncome: number
      homeAge: string
      familyType: string
    }
    hvacChallenges?: string[]
    psychologyProfile?: string
    averageHVACSpend?: number
    emergencyRate?: string
    uniqueFactors?: string[]
    climateChallenges?: string[]
    demographicInsights?: string[]
  }
  service: {
    en: { name: string; slug: string }
    es: { name: string; slug: string }
  }
  lang: 'en' | 'es'
}

export default function RevenueLocalPage({ area, service, lang }: RevenueLocalPageProps) {
  const currentService = lang === 'en' ? service.en : service.es
  
  // EUGENE SCHWARTZ AWARENESS LEVEL DETECTION
  const getAwarenessLevel = () => {
    if (currentService.name.toLowerCase().includes('emergency') || currentService.name.toLowerCase().includes('repair')) {
      return 'problem_aware' // They know they have a problem
    }
    if (currentService.name.toLowerCase().includes('installation') || currentService.name.toLowerCase().includes('replacement')) {
      return 'solution_aware' // They know they need a solution
    }
    return 'product_aware' // They're researching options
  }

  // GARY HALBERT EMOTIONAL TRIGGERS
  const getEmotionalTriggers = () => {
    const income = area.demographics?.medianIncome || 50000
    const avgSpend = area.averageHVACSpend || 3500
    
    if (income > 80000) {
      return {
        primary: 'premium_authority',
        secondary: 'exclusivity',
        urgency: 'luxury_protection'
      }
    } else if (income > 60000) {
      return {
        primary: 'smart_investment',
        secondary: 'family_protection',
        urgency: 'cost_savings'
      }
    } else {
      return {
        primary: 'value_reliability',
        secondary: 'emergency_help',
        urgency: 'immediate_relief'
      }
    }
  }

  const awareness = getAwarenessLevel()
  const triggers = getEmotionalTriggers()
  const avgSpend = area.averageHVACSpend || 3500
  const income = area.demographics?.medianIncome || 50000

  // SEMANTIC CONTENT VARIATION SYSTEM
  const generateSemanticVariation = () => {
    const uniqueFactors = area.uniqueFactors || [
      `${area.name} specific HVAC requirements`,
      `Local climate considerations for ${area.name}`,
      `${area.name} neighborhood characteristics`
    ]
    
    const climateChallenges = area.climateChallenges || [
      `${area.name} seasonal weather patterns`,
      `Local humidity and temperature variations`,
      `${area.name} specific installation challenges`
    ]
    
    const demographicInsights = area.demographicInsights || [
      `${area.name} homeowner preferences`,
      `Local family and lifestyle needs`,
      `${area.name} community expectations`
    ]

    return { uniqueFactors, climateChallenges, demographicInsights }
  }

  const semanticContent = generateSemanticVariation()

  // REVENUE-FOCUSED CONTENT GENERATION
  const generateRevenueContent = () => {
    if (lang === 'en') {
      // PROBLEM AWARE - High urgency, immediate pain
      if (awareness === 'problem_aware') {
        return {
          headline: `Professional ${currentService.name} in ${area.name}, Alabama`,
          subheadline: `Licensed HVAC contractors serving ${area.name} residents`,
          
          paragraph1: `When you need ${currentService.name.toLowerCase()} in ${area.name}, you need experienced professionals who understand local conditions. Alabama's climate creates specific challenges:
          • ${semanticContent.climateChallenges[0] || 'Local weather patterns affecting HVAC systems'}
          • ${semanticContent.uniqueFactors[0] || 'Area-specific installation requirements'}
          • Equipment strain from regional humidity and temperature variations
          • ${area.description} home construction requiring specialized knowledge
          
          ${semanticContent.demographicInsights[0] || 'Local families'} choose experienced contractors who understand these challenges.`,

          paragraph2: `Our team has provided ${currentService.name.toLowerCase()} services in ${area.name} for over 15 years. Our local expertise includes:
          • Understanding ${area.landmarks[0]} area home construction
          • Experience with ${area.description} property types
          • Knowledge of local building codes and requirements
          • Familiarity with ${semanticContent.climateChallenges[1] || 'regional HVAC challenges'}
          • Expertise in ${semanticContent.uniqueFactors[1] || 'local installation requirements'}
          
          ${semanticContent.demographicInsights[1] || 'Local homeowners'} value our proven track record and professional service.`,

          paragraph3: `Professional ${currentService.name.toLowerCase()} service in ${area.name}:
          • Emergency service available to ${area.zipCodes.join(', ')} zip codes
          • Licensed and insured HVAC contractors
          • Experience with ${area.demographics?.homeAge || 'various home types'} in ${area.name}
          • Transparent pricing with no hidden fees
          • Local technicians familiar with ${area.name} area
          
          We focus on providing reliable, professional service to ${area.name} residents.`,

          paragraph4: `Contact us for ${currentService.name.toLowerCase()} service in ${area.name}:
          • Call: 205-835-0111
          • Emergency service available
          • Licensed HVAC professionals
          • Serving ${area.name} and surrounding areas
          
          We're here to help ${area.name} residents with their HVAC needs.`,

          paragraph5: `${area.name} homeowners choose experienced local HVAC contractors for reliable service. Call 205-835-0111 for professional ${currentService.name.toLowerCase()} service.`
        }
      }
      
      // SOLUTION AWARE - They know they need a solution, focus on smart investment
      else if (awareness === 'solution_aware') {
        return {
          headline: `Smart ${area.name} Homeowners Choose Premium ${currentService.name}`,
          subheadline: `Average ${area.name} investment: $${avgSpend} - Average savings: $${Math.round(avgSpend * 2)} annually`,
          
          paragraph1: `${area.name} homeowners planning ${currentService.name.toLowerCase()} know the difference between cheap installations and smart investments. In ${area.description}, where ${area.hvacChallenges?.[0] || 'HVAC systems work hard year-round'}, the wrong choice costs thousands:
          • Cheap installation = $${Math.round(avgSpend * 2)} in repairs within 2 years
          • Wrong equipment sizing = $${Math.round(avgSpend * 0.8)} annually in wasted energy
          • Inexperienced installers = voided warranties worth $${Math.round(avgSpend * 1.5)}
          
          Smart ${area.name} homeowners invest in proper ${currentService.name.toLowerCase()} once, then enjoy decades of comfort.`,

          paragraph2: `Why ${area.name} premium homeowners choose our ${currentService.name.toLowerCase()} expertise:
          • 15+ years mastering ${area.description} installation challenges
          • We understand ${area.landmarks[0]} area home construction intimately
          • Proper equipment sizing for ${area.zipCodes.join(', ')} zip code climate zones
          • ${area.hvacChallenges?.[1] || 'Local expertise'} ensures optimal performance
          • $${Math.round(avgSpend * 0.3)} additional investment saves $${Math.round(avgSpend * 2)} long-term
          
          Result: ${area.name} clients enjoy 18+ years of reliable comfort with minimal repairs.`,

          paragraph3: `Premium ${area.name} ${currentService.name.toLowerCase()} that pays for itself:
          • Energy savings: $${Math.round(avgSpend * 0.4)} annually vs standard installation
          • Extended warranty coverage: $${Math.round(avgSpend * 1.2)} protection value
          • Zero callback repairs: saves $${Math.round(avgSpend * 0.6)} typical first-year costs
          • Property value increase: $${Math.round(avgSpend * 1.8)} ROI on premium installation
          • 25% longer equipment life than industry standard
          
          Smart investment today = thousands saved over equipment lifetime.`,

          paragraph4: `Your ${area.name} ${currentService.name.toLowerCase()} investment deserves expert execution:
          • Call 205-835-0111 for premium consultation
          • Free detailed estimate with energy savings projection
          • $${Math.round(avgSpend * 0.2)} deposit secures your installation date
          • Most ${area.name} installations completed in 1 day
          
          Join hundreds of satisfied ${area.name} homeowners who chose quality.`,

          paragraph5: `Premium ${area.name} ${currentService.name.toLowerCase()} from local experts who understand your investment. Call 205-835-0111 for your consultation.`
        }
      }
      
      // PRODUCT AWARE - They're comparing options, emphasize authority and social proof
      else {
        return {
          headline: `${area.name}'s #1 Rated ${currentService.name} Specialists`,
          subheadline: `Why ${area.name} homeowners choose us over 47 other HVAC companies`,
          
          paragraph1: `Researching ${currentService.name.toLowerCase()} options in ${area.name}? Smart homeowners in ${area.description} areas know that choosing the wrong HVAC company costs thousands in:
          • Botched installations requiring expensive corrections
          • Inadequate service leading to premature equipment failure
          • Hidden costs and surprise charges during projects
          • ${area.hvacChallenges?.[0] || 'Local challenges'} that generic companies can't solve
          
          That's why discerning ${area.name} homeowners research thoroughly before choosing their HVAC partner.`,

          paragraph2: `What sets us apart in ${area.name}'s competitive HVAC market:
          • 15+ years exclusive focus on ${area.description} HVAC challenges
          • Master technicians who live and work in ${area.name}
          • Intimate knowledge of ${area.landmarks[0]} area construction types
          • Proven solutions for ${area.hvacChallenges?.[1] || 'local HVAC issues'}
          • 97% customer satisfaction rate among ${area.name} clients
          
          We don't just service ${area.name} - we're part of the community.`,

          paragraph3: `${area.name} ${currentService.name.toLowerCase()} expertise that delivers results:
          • Customized solutions for ${area.zipCodes.join(', ')} zip code requirements
          • Average project value: $${avgSpend} with $${Math.round(avgSpend * 2)} long-term savings
          • Zero-surprise pricing with detailed estimates
          • Same-day service availability for urgent needs
          • Comprehensive warranties protecting your investment
          
          See why ${area.name} homeowners consistently rate us #1 for ${currentService.name.toLowerCase()}.`,

          paragraph4: `Ready to experience ${area.name}'s premier ${currentService.name.toLowerCase()} service?
          • Call 205-835-0111 for expert consultation
          • Free estimate with detailed project timeline
          • Most ${area.name} projects start within 3-5 days
          • Financing available for qualified homeowners
          
          Join the hundreds of satisfied ${area.name} families who chose expertise.`,

          paragraph5: `${area.name} homeowners trust local expertise for their ${currentService.name.toLowerCase()} needs. Call 205-835-0111 - your comfort specialists are ready.`
        }
      }
    } else {
      // Spanish versions with same psychology
      return {
        headline: `Expertos en ${currentService.name} #1 de ${area.name}`,
        subheadline: `Por qué los propietarios de ${area.name} nos eligen`,
        paragraph1: `Cuando necesita ${currentService.name.toLowerCase()} en ${area.name}, necesita expertos LOCALES...`,
        paragraph2: `Como especialistas LOCALES de ${area.name}...`,
        paragraph3: `Nuestro equipo LOCAL de ${area.name}...`,
        paragraph4: `Sus expertos LOCALES están esperando...`,
        paragraph5: `Elija LOCAL. Elija confianza...`
      }
    }
  }

  const content = generateRevenueContent()

  // GENERATE STRATEGIC INTERNAL LINKS
  const currentService = lang === 'en' ? service.en : service.es
  const allInternalLinks = generateInternalLinks(area.slug, currentService.slug, lang)
  const prioritizedLinks = prioritizeLinksForRevenue(allInternalLinks)
  const linkMagnets = generateLinkMagnets(area.slug, currentService.slug, lang)

  const metaContent = {
    en: {
      metaTitle: `${currentService.name} ${area.name} Alabama | Licensed HVAC Experts | 15+ Years | 205-835-0111`,
      metaDescription: `Expert ${currentService.name.toLowerCase()} in ${area.name}, AL. Licensed, insured HVAC contractors. ${semanticContent.uniqueFactors[0]?.substring(0, 80) || 'Specialized local service'}. Same-day emergency service. Call 205-835-0111.`,
      callNow: 'CALL NOW: 205-835-0111',
      getQuote: 'GET FREE ESTIMATE',
      available247: 'Available 24/7',
      localExperts: 'Local Experts',
      guaranteedService: 'Guaranteed Service',
      noHiddenFees: 'No Hidden Fees'
    },
    es: {
      metaTitle: `${currentService.name} ${area.name} Alabama | Expertos HVAC Licenciados | 15+ Años | 205-835-0111`,
      metaDescription: `Expertos en ${currentService.name.toLowerCase()} en ${area.name}, AL. Contratistas HVAC licenciados y asegurados. ${semanticContent.uniqueFactors[0]?.substring(0, 80) || 'Servicio local especializado'}. Servicio de emergencia el mismo día. Llame 205-835-0111.`,
      callNow: 'LLAME AHORA: 205-835-0111',
      getQuote: 'COTIZACIÓN GRATUITA',
      available247: 'Disponible 24/7',
      localExperts: 'Expertos Locales',
      guaranteedService: 'Servicio Garantizado',
      noHiddenFees: 'Sin Cargos Ocultos'
    }
  }

  const t = metaContent[lang]

  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="keywords" content={`${currentService.name.toLowerCase()}, ${area.name} HVAC, Birmingham HVAC, licensed HVAC contractors, ${area.zipCodes.join(', ')}, emergency HVAC repair, EEAT HVAC experts, ${semanticContent.uniqueFactors[0]?.split(' ').slice(0, 3).join(' ') || 'local HVAC'}`} />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-AL" />
        <meta name="geo.placename" content={`${area.name}, Alabama`} />
        <meta name="geo.position" content="33.5207;-86.8025" />
        <meta name="ICBM" content="33.5207, -86.8025" />
        <link rel="canonical" href={`https://www.hvac35242.com/${lang}/local/${area.slug}-${currentService.slug}`} />
      </head>

      <Header lang={lang} variant="location" locationName={area.name} />
      
      {/* URGENT HERO SECTION - GARY HALBERT STYLE */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hvac-hero.jpg"
          alt={`${currentService.name} ${area.name} Alabama`}
          fill
          className="object-cover"
          priority
        />
        {/* Darker overlay for urgency */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/95 to-orange-900/85" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          {/* ATTENTION-GRABBING HEADLINE */}
          <div className="bg-yellow-400 text-black px-6 py-3 rounded-lg inline-block mb-6 font-black text-lg animate-pulse">
            ⚡ URGENT: {area.name} {currentService.name} Emergency ⚡
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-yellow-300 drop-shadow-2xl">
            {currentService.name} in {area.name}, Alabama
          </h1>
          
          <h2 className="text-xl md:text-2xl mb-6 max-w-4xl mx-auto font-bold text-orange-200">
            Licensed HVAC Contractors Serving {area.name} Since 2009
          </h2>
          
          {/* SOCIAL PROOF BAR */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-4xl mx-auto mb-8 border-2 border-yellow-400/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-black text-yellow-300">Licensed</div>
                <div className="text-sm">Alabama HVAC</div>
              </div>
              <div>
                <div className="text-2xl font-black text-yellow-300">Insured</div>
                <div className="text-sm">Bonded Service</div>
              </div>
              <div>
                <div className="text-2xl font-black text-yellow-300">15+</div>
                <div className="text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-black text-yellow-300">Local</div>
                <div className="text-sm">{area.name} Experts</div>
              </div>
            </div>
          </div>
          
          {/* URGENT CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <a href="tel:2058350111" className="transform hover:scale-105 transition-all">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black text-2xl font-black px-12 py-6 rounded-lg shadow-2xl border-4 border-white animate-pulse">
                <Phone className="w-8 h-8 mr-3" />
                {t.callNow}
              </Button>
            </a>
            <div className="bg-red-600/90 text-white px-6 py-3 rounded-lg font-bold backdrop-blur border border-white/20">
              <Clock className="w-5 h-5 inline mr-2" />
              {t.available247}
            </div>
          </div>

          {/* TRUST FACTORS */}
          <div className="text-yellow-300 font-bold text-lg">
            Licensed & Insured HVAC Service in {area.name}
          </div>
        </div>
      </section>

      {/* STUNNING VISUAL AREA-SPECIFIC SECTION */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-green-900 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                {area.name} HVAC SPECIALISTS
              </span>
            </h2>
            <p className="text-2xl text-blue-200 max-w-4xl mx-auto">
              {lang === 'en' 
                ? `Mastering ${area.name}'s unique climate challenges since 2009`
                : `Dominando los desafíos climáticos únicos de ${area.name} desde 2009`
              }
            </p>
          </div>

          {/* UNIQUE FACTORS SHOWCASE */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {semanticContent.uniqueFactors.slice(0, 3).map((factor, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:scale-105 hover:rotate-1">
                  <div className="flex items-center mb-6">
                    {index === 0 && <Home className="w-12 h-12 text-yellow-400 mr-4" />}
                    {index === 1 && <Wind className="w-12 h-12 text-blue-400 mr-4" />}
                    {index === 2 && <Thermometer className="w-12 h-12 text-red-400 mr-4" />}
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors">
                      {lang === 'en' ? 'Local Expertise' : 'Experiencia Local'}
                    </h3>
                  </div>
                  <p className="text-gray-200 leading-relaxed text-lg">
                    {factor}
                  </p>
                  <div className="mt-6 flex items-center text-yellow-400 font-semibold">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {lang === 'en' ? 'Specialized Solution' : 'Solución Especializada'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* INTERACTIVE CLIMATE CHALLENGES WHEEL */}
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
            <h3 className="text-4xl font-black text-center text-white mb-12">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                {lang === 'en' ? `${area.name} Climate Challenges We Solve` : `Desafíos Climáticos de ${area.name} Que Resolvemos`}
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {semanticContent.climateChallenges.map((challenge, index) => (
                <div key={index} className="group flex items-start space-x-4 p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl border border-red-400/30 hover:border-yellow-400/70 transition-all duration-300 hover:scale-105">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                      {lang === 'en' ? 'Challenge' : 'Desafío'} #{index + 1}
                    </h4>
                    <p className="text-gray-200 leading-relaxed">
                      {challenge}
                    </p>
                    <div className="mt-3 text-green-400 font-semibold text-sm">
                      ✓ {lang === 'en' ? 'SOLVED BY OUR TEAM' : 'RESUELTO POR NUESTRO EQUIPO'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DEMOGRAPHIC INSIGHTS SECTION */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-white mb-8">
              {lang === 'en' ? `Understanding ${area.name} Homeowners` : `Entendiendo a los Propietarios de ${area.name}`}
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {semanticContent.demographicInsights.map((insight, index) => (
                <div key={index} className="bg-gradient-to-br from-green-500/30 to-blue-500/30 backdrop-blur-sm px-6 py-4 rounded-full border border-green-400/40 hover:border-yellow-400/60 transition-all duration-300 transform hover:scale-110">
                  <span className="text-white font-medium text-lg">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST INDICATORS - REVENUE FOCUSED */}
      <section className="py-12 bg-gradient-to-r from-green-700 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <DollarSign className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="font-bold text-lg">{t.noHiddenFees}</div>
              <div className="text-sm opacity-90">Upfront Pricing</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Shield className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="font-bold text-lg">{t.guaranteedService}</div>
              <div className="text-sm opacity-90">100% Satisfaction</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <MapPin className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="font-bold text-lg">{t.localExperts}</div>
              <div className="text-sm opacity-90">{area.name} Specialists</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="font-bold text-lg">ROI Guaranteed</div>
              <div className="text-sm opacity-90">Investment Pays Back</div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT - EUGENE SCHWARTZ PSYCHOLOGY */}
      <section className="py-20 bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Problem Agitation - Paragraph 1 */}
            <div className="mb-16">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-l-8 border-red-500 border border-gray-200/50">
                <div className="p-12">
                  <div className="flex items-start">
                    <AlertTriangle className="w-16 h-16 text-red-600 mr-6 flex-shrink-0" />
                    <div className="flex-1">
                      <h2 className="text-3xl font-black text-gray-800 mb-6">
                        {currentService.name} Challenges in {area.name}
                      </h2>
                      <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                        {content.paragraph1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Authority Building - Paragraph 2 */}
            <div className="mb-16">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-l-8 border-blue-500 border border-gray-200/50">
                <div className="p-12">
                  <div className="flex items-start">
                    <Award className="w-16 h-16 text-blue-600 mr-6 flex-shrink-0" />
                    <div className="flex-1">
                      <h2 className="text-3xl font-black text-gray-800 mb-6">
                        Local HVAC Expertise in {area.name}
                      </h2>
                      <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                        {content.paragraph2}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit Stacking - Paragraph 3 */}
            <div className="mb-16">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-l-8 border-green-500 border border-gray-200/50">
                <div className="p-12">
                  <div className="flex items-start">
                    <CheckCircle className="w-16 h-16 text-green-600 mr-6 flex-shrink-0" />
                    <div className="flex-1">
                      <h2 className="text-3xl font-black text-gray-800 mb-6">
                        Professional {currentService.name} Service
                      </h2>
                      <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                        {content.paragraph3}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Urgent CTA - Paragraph 4 */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl shadow-2xl text-white overflow-hidden">
                <div className="p-12 text-center">
                  <div className="flex items-center justify-center mb-6">
                    <Phone className="w-16 h-16 mr-4" />
                    <h2 className="text-4xl font-black">
                      Time Is Money
                    </h2>
                  </div>
                  <div className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto whitespace-pre-line">
                    {content.paragraph4}
                  </div>
                  
                  <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
                    <a href="tel:2058350111" className="transform hover:scale-105 transition-all">
                      <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black text-2xl font-black px-16 py-6 rounded-2xl shadow-2xl">
                        <Phone className="w-8 h-8 mr-4" />
                        {t.callNow}
                      </Button>
                    </a>
                    <Link href={`/${lang}/quote`}>
                      <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-xl font-bold px-12 py-4 rounded-xl">
                        {t.getQuote}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Authority Close - Paragraph 5 */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-800 to-green-800 rounded-3xl shadow-2xl text-white p-12">
                <div className="flex items-center justify-center mb-6">
                  <Star className="w-12 h-12 mr-3 text-yellow-300" />
                  <h2 className="text-3xl font-black">Your Local Choice</h2>
                  <Star className="w-12 h-12 ml-3 text-yellow-300" />
                </div>
                <div className="text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
                  {content.paragraph5}
                </div>
                <div className="text-yellow-300 font-bold text-lg">
                  Serving {area.name} with pride since 2009
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STRATEGIC INTERNAL LINKING SECTION */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* UPSELL LINKS */}
            {prioritizedLinks.filter(link => link.category === 'upsell').length > 0 && (
              <div className="mb-12">
                <h3 className="text-3xl font-black text-center mb-8 text-gray-800">
                  {generateContextualLinkText('upsell', area.slug, currentService.slug, lang)}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {prioritizedLinks.filter(link => link.category === 'upsell').slice(0, 4).map((link, index) => (
                    <Link key={index} href={link.url} className="group">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-yellow-400">
                        <div className="flex items-center">
                          <TrendingUp className="w-8 h-8 mr-4 text-yellow-300" />
                          <div>
                            <div className="text-lg font-bold group-hover:text-yellow-300 transition-colors">
                              {link.text}
                            </div>
                            <div className="text-sm opacity-90">
                              {lang === 'en' ? 'Smart Investment Option' : 'Opción de Inversión Inteligente'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* LEAD MAGNETS SECTION */}
            <div className="mb-12">
              <h3 className="text-3xl font-black text-center mb-8 text-gray-800">
                {lang === 'en' 
                  ? `🎁 FREE Resources for ${area.name} Homeowners`
                  : `🎁 Recursos GRATUITOS para Propietarios de ${area.name}`
                }
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-green-500">
                  <h4 className="text-xl font-bold mb-3 text-gray-800">{linkMagnets.costCalculator.title}</h4>
                  <p className="text-gray-600 mb-4">{linkMagnets.costCalculator.description}</p>
                  <Link href={`/${lang}/calculator`} className="inline-flex items-center text-green-600 font-semibold hover:text-green-700">
                    {linkMagnets.costCalculator.cta}
                  </Link>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500">
                  <h4 className="text-xl font-bold mb-3 text-gray-800">{linkMagnets.energySavings.title}</h4>
                  <p className="text-gray-600 mb-4">{linkMagnets.energySavings.description}</p>
                  <Link href={`/${lang}/savings`} className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                    {linkMagnets.energySavings.cta}
                  </Link>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-red-500">
                  <h4 className="text-xl font-bold mb-3 text-gray-800">{linkMagnets.emergencyGuide.title}</h4>
                  <p className="text-gray-600 mb-4">{linkMagnets.emergencyGuide.description}</p>
                  <Link href={`/${lang}/emergency-guide`} className="inline-flex items-center text-red-600 font-semibold hover:text-red-700">
                    {linkMagnets.emergencyGuide.cta}
                  </Link>
                </div>
              </div>
            </div>

            {/* CROSS-SELL AND RELATED LINKS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* CROSS-SELL SERVICES */}
              {prioritizedLinks.filter(link => link.category === 'cross_sell').length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">
                    {generateContextualLinkText('cross_sell', area.slug, currentService.slug, lang)}
                  </h3>
                  <div className="space-y-4">
                    {prioritizedLinks.filter(link => link.category === 'cross_sell').slice(0, 3).map((link, index) => (
                      <Link key={index} href={link.url} className="group">
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-blue-500 mr-3 group-hover:text-blue-600" />
                            <span className="text-gray-700 group-hover:text-blue-700 transition-colors font-medium">
                              {link.text}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* NEARBY AREAS */}
              {prioritizedLinks.filter(link => link.category === 'related').length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">
                    {generateContextualLinkText('related', area.slug, currentService.slug, lang)}
                  </h3>
                  <div className="space-y-4">
                    {prioritizedLinks.filter(link => link.category === 'related').slice(0, 4).map((link, index) => (
                      <Link key={index} href={link.url} className="group">
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all">
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 text-green-500 mr-3 group-hover:text-green-600" />
                            <span className="text-gray-700 group-hover:text-green-700 transition-colors font-medium">
                              {link.text}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AUTHORITY LINKS */}
            {prioritizedLinks.filter(link => link.category === 'authority').length > 0 && (
              <div className="mt-12 text-center">
                <h3 className="text-xl font-bold mb-6 text-gray-800">
                  {generateContextualLinkText('authority', area.slug, currentService.slug, lang)}
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {prioritizedLinks.filter(link => link.category === 'authority').map((link, index) => (
                    <Link key={index} href={link.url} className="group">
                      <div className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all">
                        <span className="text-sm font-medium group-hover:text-gray-200">
                          {link.text}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  )
}