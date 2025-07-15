/**
 * Birmingham HVAC Empire Page Generator
 * Generates 1,000+ SEO-optimized pages for total market domination
 */

interface ServiceKeyword {
  service: string
  location: string
  zipCode?: string
  modifier?: string
  problemType?: string
  season?: string
  emergency?: boolean
  commercial?: boolean
  brand?: string
  questionType?: string
}

interface PageData {
  url: string
  title: string
  metaDescription: string
  h1: string
  hero: {
    headline: string
    subheadline: string
    cta: string
    emergencyCta: string
  }
  content: {
    introduction: string
    serviceDescription: string
    localBenefits: string
    problemSolution?: string
    pricing: string
    emergencyInfo: string
    testimonial: string
    faq: Array<{question: string, answer: string}>
  }
  schema: any
}

// Core services for HVAC domination
const CORE_SERVICES = [
  'hvac-repair', 'ac-repair', 'heating-repair', 'furnace-repair',
  'heat-pump-repair', 'ductwork-repair', 'thermostat-repair',
  'hvac-installation', 'ac-installation', 'heating-installation',
  'furnace-installation', 'heat-pump-installation', 'ductwork-installation',
  'hvac-maintenance', 'ac-maintenance', 'heating-maintenance',
  'emergency-hvac', '24-7-hvac', 'same-day-hvac', 'weekend-hvac'
]

// All Birmingham metro locations for total coverage
const BIRMINGHAM_LOCATIONS = [
  // Primary affluent areas
  { name: 'hoover', zipCode: '35242', area: 'Hoover', income: 'medium-high' },
  { name: 'mountain-brook', zipCode: '35223', area: 'Mountain Brook', income: 'high' },
  { name: 'vestavia-hills', zipCode: '35213', area: 'Vestavia Hills', income: 'high' },
  { name: 'homewood', zipCode: '35209', area: 'Homewood', income: 'high' },
  { name: 'irondale', zipCode: '35216', area: 'Irondale', income: 'medium' },
  { name: 'pelham', zipCode: '35124', area: 'Pelham', income: 'medium-high' },
  { name: 'alabaster', zipCode: '35007', area: 'Alabaster', income: 'medium' },
  { name: 'helena', zipCode: '35080', area: 'Helena', income: 'medium-high' },
  
  // Extended Birmingham metro
  { name: 'trussville', zipCode: '35173', area: 'Trussville', income: 'medium-high' },
  { name: 'springville', zipCode: '35146', area: 'Springville', income: 'medium' },
  { name: 'cahaba-heights', zipCode: '35243', area: 'Cahaba Heights', income: 'high' },
  { name: 'chelsea', zipCode: '35043', area: 'Chelsea', income: 'medium-high' },
  { name: 'gardendale', zipCode: '35071', area: 'Gardendale', income: 'medium' },
  { name: 'fultondale', zipCode: '35068', area: 'Fultondale', income: 'medium' },
  { name: 'clay', zipCode: '35048', area: 'Clay', income: 'medium' },
  { name: 'pinson', zipCode: '35126', area: 'Pinson', income: 'medium' },
  { name: 'center-point', zipCode: '35215', area: 'Center Point', income: 'medium' },
  { name: 'warrior', zipCode: '35180', area: 'Warrior', income: 'medium' },
  { name: 'bessemer', zipCode: '35020', area: 'Bessemer', income: 'medium' },
  { name: 'hueytown', zipCode: '35023', area: 'Hueytown', income: 'medium' },
  
  // Affluent neighborhoods
  { name: 'liberty-park', zipCode: '35213', area: 'Liberty Park', income: 'high' },
  { name: 'shades-crest', zipCode: '35213', area: 'Shades Crest', income: 'high' },
  { name: 'valleydale', zipCode: '35242', area: 'Valleydale', income: 'medium-high' },
  { name: 'overton', zipCode: '35242', area: 'Overton', income: 'medium-high' },
  { name: 'english-village', zipCode: '35209', area: 'English Village', income: 'very-high' },
  { name: 'crestline-village', zipCode: '35223', area: 'Crestline Village', income: 'high' },
  { name: 'brookwood-village', zipCode: '35223', area: 'Brookwood Village', income: 'high' },
  { name: 'riverchase', zipCode: '35244', area: 'Riverchase', income: 'medium-high' },
  
  // Extended coverage areas
  { name: 'leeds', zipCode: '35094', area: 'Leeds', income: 'medium' },
  { name: 'moody', zipCode: '35004', area: 'Moody', income: 'medium' },
  { name: 'odenville', zipCode: '35120', area: 'Odenville', income: 'medium' },
  { name: 'riverside', zipCode: '35135', area: 'Riverside', income: 'medium' },
  { name: 'steele', zipCode: '35987', area: 'Steele', income: 'medium' },
  { name: 'ashville', zipCode: '35953', area: 'Ashville', income: 'medium' },
  { name: 'kimberly', zipCode: '35091', area: 'Kimberly', income: 'medium' },
  { name: 'locust-fork', zipCode: '35097', area: 'Locust Fork', income: 'medium' },
  { name: 'blountsville', zipCode: '35031', area: 'Blountsville', income: 'medium' },
  { name: 'cleveland', zipCode: '35049', area: 'Cleveland', income: 'medium' }
]

// Service modifiers for keyword expansion
const SERVICE_MODIFIERS = [
  'emergency', 'professional', 'licensed', 'affordable', 'experienced',
  'certified', 'reliable', 'fast', 'same-day', '24-7', 'weekend',
  'commercial', 'residential', 'expert', 'quality', 'trusted'
]

// HVAC problems for solution pages
const HVAC_PROBLEMS = [
  'ac-not-cooling', 'furnace-not-heating', 'high-energy-bills',
  'strange-noises', 'poor-air-quality', 'frozen-ac-unit',
  'thermostat-problems', 'ductwork-leaks', 'hot-cold-spots',
  'system-wont-start', 'dirty-filters', 'refrigerant-leaks',
  'compressor-issues', 'blower-motor-problems', 'electrical-issues',
  'gas-line-problems', 'ventilation-issues', 'humidity-problems',
  'carbon-monoxide-concerns', 'energy-efficiency-issues'
]

// Question types for FAQ pages
const QUESTION_TYPES = [
  'how-much-does-cost', 'when-should-replace', 'what-size-need',
  'how-often-service', 'why-not-working', 'what-are-signs',
  'how-to-choose', 'what-is-maintenance-cost', 'how-to-improve-efficiency',
  'what-is-best-brand', 'how-long-should-last', 'when-call-emergency'
]

// HVAC brands for equipment pages
const HVAC_BRANDS = [
  'carrier', 'trane', 'lennox', 'rheem', 'goodman', 'york',
  'american-standard', 'bryant', 'ruud', 'daikin', 'mitsubishi', 'armstrong'
]

/**
 * Generate page data for any HVAC service keyword combination
 */
export function generatePageData(keyword: ServiceKeyword): PageData {
  const location = BIRMINGHAM_LOCATIONS.find(loc => loc.name === keyword.location)
  const isEmergency = keyword.emergency || keyword.service.includes('emergency') || keyword.service.includes('24-7')
  const isCommercial = keyword.commercial || keyword.modifier === 'commercial'
  
  // Create URL-friendly slug
  const urlParts = [
    keyword.service,
    keyword.location,
    keyword.zipCode || location?.zipCode,
    keyword.modifier
  ].filter(Boolean)
  
  const url = `/${urlParts.join('-').toLowerCase()}`
  
  // Generate dynamic title and meta
  const serviceDisplay = keyword.service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const locationDisplay = location?.area || keyword.location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const title = isEmergency 
    ? `Emergency ${serviceDisplay} ${locationDisplay} AL | 24/7 Service | Call Now`
    : `${serviceDisplay} ${locationDisplay} Alabama | Licensed & Insured | Free Quotes`
  
  const metaDescription = isEmergency
    ? `Emergency ${serviceDisplay.toLowerCase()} in ${locationDisplay}! Available 24/7. Licensed technicians. Call (205) 830-1111 for immediate service.`
    : `Professional ${serviceDisplay.toLowerCase()} in ${locationDisplay}, Alabama. Licensed, insured, and experienced. Free estimates. Call (205) 830-1111 today!`
  
  const h1 = isEmergency
    ? `Emergency ${serviceDisplay} in ${locationDisplay}, Alabama`
    : `${serviceDisplay} Services in ${locationDisplay}, Alabama`
  
  // Generate dynamic content based on keyword type
  const content = generateDynamicContent(keyword, location, serviceDisplay, locationDisplay, isEmergency, isCommercial)
  
  // Generate schema markup
  const schema = generateLocalBusinessSchema(keyword, location, serviceDisplay, locationDisplay)
  
  return {
    url,
    title,
    metaDescription,
    h1,
    hero: {
      headline: isEmergency 
        ? `🚨 Emergency ${serviceDisplay} in ${locationDisplay}`
        : `#1 ${serviceDisplay} Company in ${locationDisplay}`,
      subheadline: isEmergency
        ? `Available 24/7 • Same Day Service • Licensed Technicians`
        : `Licensed & Insured • Free Estimates • 100% Satisfaction Guarantee`,
      cta: 'Get Free Quote',
      emergencyCta: 'Call Now: (205) 830-1111'
    },
    content,
    schema
  }
}

/**
 * Generate dynamic content based on service type and location
 */
function generateDynamicContent(
  keyword: ServiceKeyword, 
  location: any, 
  serviceDisplay: string, 
  locationDisplay: string, 
  isEmergency: boolean, 
  isCommercial: boolean
) {
  const zipCode = keyword.zipCode || location?.zipCode
  const incomeLevel = location?.income || 'medium'
  
  // Customize messaging based on income level
  const pricingMessage = incomeLevel === 'high' || incomeLevel === 'very-high'
    ? 'Premium service with luxury comfort solutions and concierge-level care.'
    : incomeLevel === 'medium-high'
    ? 'Professional service with value-focused solutions and flexible payment options.'
    : 'Affordable, honest pricing with payment plans available for working families.'
  
  const localBenefits = `
    Serving ${locationDisplay} (${zipCode}) with:
    • Local Birmingham technicians who know Alabama climate
    • Fast response times in the ${locationDisplay} area
    • Familiar with ${locationDisplay} neighborhoods and homes
    • Understanding of local building codes and requirements
    • Relationships with ${locationDisplay} suppliers for fast parts
  `
  
  const emergencyInfo = isEmergency ? `
    🚨 EMERGENCY ${serviceDisplay.toUpperCase()} IN ${locationDisplay.toUpperCase()}
    
    When your HVAC system fails in ${locationDisplay}, every minute counts. Our emergency technicians are standing by 24/7 to restore comfort to your home.
    
    ⚡ Same-day emergency service
    ⚡ No overtime charges for ${locationDisplay} residents
    ⚡ Emergency parts inventory
    ⚡ Licensed emergency technicians
    
    Don't suffer in the Alabama heat or cold - call now!
  ` : `
    Reliable ${serviceDisplay} service in ${locationDisplay}. We understand the unique challenges of Alabama's humid subtropical climate and how it affects HVAC systems in the ${locationDisplay} area.
  `
  
  return {
    introduction: `
      Need ${serviceDisplay.toLowerCase()} in ${locationDisplay}, Alabama? You've found the right team. 
      We're local Birmingham HVAC experts who've been serving ${locationDisplay} families and businesses 
      for over 15 years. Our licensed technicians understand Alabama's unique climate challenges and 
      how they affect HVAC systems in the ${locationDisplay} area.
    `,
    serviceDescription: `
      Our ${serviceDisplay.toLowerCase()} services in ${locationDisplay} include complete diagnosis, 
      professional repair or installation, and ongoing maintenance to keep your system running efficiently 
      in Alabama's demanding climate. We work on all major brands and provide upfront pricing with 
      no hidden fees.
    `,
    localBenefits,
    problemSolution: keyword.problemType ? `
      If you're experiencing ${keyword.problemType.replace(/-/g, ' ')} in ${locationDisplay}, 
      you're not alone. This is a common issue in Alabama due to our humid climate and temperature extremes. 
      Our experienced technicians have solved this exact problem hundreds of times in the ${locationDisplay} area.
    ` : undefined,
    pricing: pricingMessage,
    emergencyInfo,
    testimonial: `
      "Outstanding service in ${locationDisplay}! They fixed our AC on the hottest day of summer. 
      Professional, honest, and fairly priced. Highly recommend for any HVAC needs in the ${locationDisplay} area."
      - Sarah M., ${locationDisplay} Resident
    `,
    faq: generateFAQ(serviceDisplay, locationDisplay, zipCode)
  }
}

/**
 * Generate FAQ based on service and location
 */
function generateFAQ(serviceDisplay: string, locationDisplay: string, zipCode?: string) {
  return [
    {
      question: `How much does ${serviceDisplay.toLowerCase()} cost in ${locationDisplay}?`,
      answer: `${serviceDisplay} costs in ${locationDisplay} vary based on the specific issue and system type. We provide free, upfront estimates with no hidden fees. Most repairs range from $150-$800, while installations vary based on system size and efficiency level.`
    },
    {
      question: `Do you offer emergency ${serviceDisplay.toLowerCase()} in ${locationDisplay}?`,
      answer: `Yes! We provide 24/7 emergency ${serviceDisplay.toLowerCase()} throughout ${locationDisplay} and surrounding areas. Call (205) 830-1111 for immediate assistance.`
    },
    {
      question: `Are you licensed for ${serviceDisplay.toLowerCase()} in Alabama?`,
      answer: `Absolutely. We're fully licensed, bonded, and insured for all HVAC work in Alabama. Our technicians receive ongoing training and certification to ensure quality service in ${locationDisplay}.`
    },
    {
      question: `How quickly can you respond to ${locationDisplay}${zipCode ? ` (${zipCode})` : ''}?`,
      answer: `We typically respond to service calls in ${locationDisplay} within 2-4 hours during business hours, and within 1 hour for emergencies. Our local Birmingham location allows us to serve ${locationDisplay} quickly.`
    }
  ]
}

/**
 * Generate local business schema markup
 */
function generateLocalBusinessSchema(keyword: ServiceKeyword, location: any, serviceDisplay: string, locationDisplay: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.hvac35242.com${keyword.service}-${keyword.location}`,
    "name": `Birmingham HVAC ${serviceDisplay} - ${locationDisplay}`,
    "url": `https://www.hvac35242.com/${keyword.service}-${keyword.location}`,
    "telephone": "(205) 830-1111",
    "email": "service@hvac35242.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Service Area",
      "addressLocality": locationDisplay,
      "addressRegion": "AL",
      "postalCode": keyword.zipCode || location?.zipCode,
      "addressCountry": "US"
    },
    "geo": location?.coordinates || {
      "latitude": 33.5186,
      "longitude": -86.8104
    },
    "areaServed": [
      {
        "@type": "City",
        "name": locationDisplay
      },
      {
        "@type": "State",
        "name": "Alabama"
      }
    ],
    "serviceType": serviceDisplay,
    "description": `Professional ${serviceDisplay.toLowerCase()} services in ${locationDisplay}, Alabama. Licensed, insured, and experienced HVAC technicians.`,
    "priceRange": "$$",
    "openingHours": [
      "Mo-Fr 07:00-19:00",
      "Sa 08:00-17:00",
      "Su 08:00-17:00"
    ],
    "availableService": {
      "@type": "Service",
      "name": serviceDisplay,
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": location?.coordinates || {
          "latitude": 33.5186,
          "longitude": -86.8104
        },
        "geoRadius": "50 miles"
      }
    }
  }
}

/**
 * Generate all keyword combinations for Birmingham HVAC domination
 */
export function generateAllKeywords(): ServiceKeyword[] {
  const keywords: ServiceKeyword[] = []
  
  // Tier 1: Core Services × Locations
  CORE_SERVICES.forEach(service => {
    BIRMINGHAM_LOCATIONS.forEach(location => {
      keywords.push({
        service,
        location: location.name,
        zipCode: location.zipCode
      })
      
      // Add emergency variations
      keywords.push({
        service,
        location: location.name,
        zipCode: location.zipCode,
        emergency: true
      })
      
      // Add commercial variations for business areas
      if (location.income === 'high' || location.income === 'medium-high') {
        keywords.push({
          service,
          location: location.name,
          zipCode: location.zipCode,
          commercial: true
        })
      }
    })
  })
  
  // Tier 2: Problem-based pages
  HVAC_PROBLEMS.forEach(problem => {
    BIRMINGHAM_LOCATIONS.slice(0, 20).forEach(location => { // Top 20 locations only
      keywords.push({
        service: 'hvac-repair',
        location: location.name,
        zipCode: location.zipCode,
        problemType: problem
      })
    })
  })
  
  // Tier 3: Question-based pages
  QUESTION_TYPES.forEach(questionType => {
    BIRMINGHAM_LOCATIONS.slice(0, 15).forEach(location => { // Top 15 locations
      keywords.push({
        service: 'hvac-service',
        location: location.name,
        zipCode: location.zipCode,
        questionType
      })
    })
  })
  
  // Tier 4: Brand-specific pages
  HVAC_BRANDS.forEach(brand => {
    BIRMINGHAM_LOCATIONS.slice(0, 10).forEach(location => { // Top 10 locations
      ['installation', 'repair', 'maintenance'].forEach(service => {
        keywords.push({
          service: `${brand}-${service}`,
          location: location.name,
          zipCode: location.zipCode,
          brand
        })
      })
    })
  })
  
  return keywords
}

/**
 * Generate page file for Next.js dynamic routing
 */
export function generatePageFile(pageData: PageData): string {
  return `
import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Phone, Clock, Shield, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: '${pageData.title}',
  description: '${pageData.metaDescription}',
  keywords: '${pageData.url.replace(/\//g, '').replace(/-/g, ', ')}, Birmingham HVAC, Alabama heating cooling',
  openGraph: {
    title: '${pageData.title}',
    description: '${pageData.metaDescription}',
    url: 'https://www.hvac35242.com${pageData.url}',
    type: 'website'
  }
}

export default function ServicePage() {
  const jsonLd = ${JSON.stringify(pageData.schema, null, 2)}
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen">
        <Header lang="en" />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">${pageData.h1}</h1>
              <p className="text-xl mb-8">${pageData.hero.subheadline}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  ${pageData.hero.cta}
                </Button>
                <a href="tel:2058301111">
                  <Button size="lg" variant="destructive">
                    <Phone className="w-5 h-5 mr-2" />
                    ${pageData.hero.emergencyCta}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trust Indicators */}
        <section className="py-8 bg-slate-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                <span className="font-semibold">24/7 Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-semibold">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                <span className="font-semibold">15+ Years Experience</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl leading-relaxed mb-8">${pageData.content.introduction}</p>
                
                <h2 className="text-3xl font-bold mb-6">Professional Service Description</h2>
                <p className="mb-8">${pageData.content.serviceDescription}</p>
                
                <h2 className="text-3xl font-bold mb-6">Local Benefits</h2>
                <div className="bg-slate-50 p-6 rounded-lg mb-8">
                  <pre className="whitespace-pre-wrap font-sans">${pageData.content.localBenefits}</pre>
                </div>
                
                ${pageData.content.problemSolution ? `
                <h2 className="text-3xl font-bold mb-6">Problem Solution</h2>
                <p className="mb-8">${pageData.content.problemSolution}</p>
                ` : ''}
                
                <h2 className="text-3xl font-bold mb-6">Pricing & Value</h2>
                <p className="mb-8">${pageData.content.pricing}</p>
                
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-8">
                  <pre className="whitespace-pre-wrap font-sans text-red-800">${pageData.content.emergencyInfo}</pre>
                </div>
                
                <h2 className="text-3xl font-bold mb-6">Customer Testimonial</h2>
                <blockquote className="bg-blue-50 border-l-4 border-primary p-6 italic">
                  ${pageData.content.testimonial}
                </blockquote>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="space-y-6">
                ${pageData.content.faq.map(item => `
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-3">${item.question}</h3>
                  <p className="text-gray-700">${item.answer}</p>
                </div>
                `).join('')}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Contact us today for fast, professional service!</p>
            <a href="tel:2058301111">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8">
                <Phone className="w-5 h-5 mr-2" />
                Call Now: (205) 830-1111
              </Button>
            </a>
          </div>
        </section>
        
        <Footer lang="en" />
      </div>
    </>
  )
}
`.trim()
}