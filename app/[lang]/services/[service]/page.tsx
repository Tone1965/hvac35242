import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceDetail from '@/components/ServiceDetail'
import { translations } from '@/lib/translations'

const serviceData = {
  'same-day-hvac-repair': {
    key: 'sameDayRepair',
    image: '/images/same-day-hvac-repair.png'
  },
  'weekend-emergency-service': {
    key: 'weekendService',
    image: '/images/hvac-tech.jpg'
  },
  'holiday-hvac-emergency': {
    key: 'holidayResponse',
    image: '/images/emergency-service.jpg'
  },
  'night-emergency-hvac': {
    key: 'nightCalls',
    image: '/images/ac-unit.jpg'
  },
  'emergency-ac-heatwave': {
    key: 'acHeatwave',
    image: '/images/ac-repair.jpg'
  },
  'emergency-heating-winter': {
    key: 'heatingWinter',
    image: '/images/hvac-tech.jpg'
  },
  'commercial-emergency-hvac': {
    key: 'commercial',
    image: '/images/ac-unit.jpg'
  },
  'emergency-pricing-transparency': {
    key: 'pricing',
    image: '/images/emergency-service.jpg'
  },
  'response-time-guarantees': {
    key: 'guarantees',
    image: '/images/hvac-hero.jpg'
  }
}

export async function generateStaticParams() {
  const services = Object.keys(serviceData)
  const langs = ['en', 'es']
  
  return langs.flatMap(lang => 
    services.map(service => ({
      lang,
      service
    }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es', service: string }
}): Promise<Metadata> {
  const t = translations[params.lang]
  const serviceInfo = serviceData[params.service as keyof typeof serviceData]
  
  if (!serviceInfo) {
    return {
      title: 'Service Not Found',
      description: 'The requested service was not found.'
    }
  }
  
  const service = t.services[serviceInfo.key as keyof typeof t.services];
  const serviceName = typeof service === 'object' && service.title ? service.title : serviceInfo.key;
  
  // Create SEO-optimized metadata for each service
  const seoTitles: { [key: string]: string } = {
    'same-day-hvac-repair': 'Same-Day HVAC Repair Birmingham AL | Emergency AC & Heating Service',
    'weekend-emergency-service': 'Weekend Emergency HVAC Service Birmingham | 24/7 AC & Heating Repair',
    'holiday-hvac-emergency': 'Holiday Emergency HVAC Service Birmingham AL | Christmas & Holiday Repairs',
    'night-emergency-hvac': '24/7 Night Emergency HVAC Service Birmingham AL | After Hours AC Repair',
    'emergency-ac-heatwave': 'Emergency AC Repair During Heatwaves Birmingham AL | Beat Alabama Heat',
    'emergency-heating-winter': 'Emergency Heating Repair Birmingham AL | Winter Furnace & Heat Pump Service',
    'commercial-emergency-hvac': 'Commercial Emergency HVAC Service Birmingham AL | Business AC & Heating',
    'emergency-pricing-transparency': 'Transparent Emergency HVAC Pricing Birmingham AL | No Hidden Fees',
    'response-time-guarantees': 'Fast Emergency HVAC Response Birmingham AL | Guaranteed Service Times'
  }
  
  const seoDescriptions: { [key: string]: string } = {
    'same-day-hvac-repair': 'Same-day HVAC repair in Birmingham, Alabama. Emergency AC and heating service with licensed technicians. Call 205-835-0111 for immediate service.',
    'weekend-emergency-service': 'Weekend emergency HVAC service in Birmingham, AL. Professional AC and heating repairs available Saturdays and Sundays. Call 205-835-0111.',
    'holiday-hvac-emergency': 'Holiday emergency HVAC service in Birmingham, Alabama. Available Christmas, New Year\'s, and all major holidays. Call 205-835-0111.',
    'night-emergency-hvac': 'Night emergency HVAC service in Birmingham, AL. Professional after-hours AC and heating repairs available 24/7. Call 205-835-0111.',
    'emergency-ac-heatwave': 'Emergency AC repair during Alabama heatwaves in Birmingham. Fast air conditioning service when temperatures soar. Call 205-835-0111.',
    'emergency-heating-winter': 'Emergency heating repair in Birmingham, Alabama. Professional furnace and heat pump service during winter. Call 205-835-0111.',
    'commercial-emergency-hvac': 'Commercial emergency HVAC service in Birmingham, AL. Business AC and heating repairs for offices and facilities. Call 205-835-0111.',
    'emergency-pricing-transparency': 'Transparent emergency HVAC pricing in Birmingham, Alabama. Clear, upfront pricing with no hidden fees. Call 205-835-0111.',
    'response-time-guarantees': 'Fast emergency HVAC response in Birmingham, AL. Guaranteed response times for AC and heating emergencies. Call 205-835-0111.'
  }

  return {
    title: seoTitles[params.service] || `${serviceName} | Birmingham HVAC`,
    description: seoDescriptions[params.service] || `Professional ${serviceName} services in Birmingham, AL. 24/7 emergency response, licensed technicians, transparent pricing. Call 205-835-0111.`,
    keywords: `emergency HVAC repair Birmingham, AC repair Birmingham Alabama, heating repair Birmingham, HVAC service Birmingham, ${params.service} Birmingham`,
    alternates: {
      languages: {
        'en': `/en/services/${params.service}`,
        'es': `/es/services/${params.service}`,
      }
    }
  }
}

export default function ServicePage({ 
  params 
}: { 
  params: { lang: 'en' | 'es', service: string } 
}) {
  const serviceInfo = serviceData[params.service as keyof typeof serviceData]
  
  if (!serviceInfo) {
    return (
      <div className="min-h-screen">
        <Header lang={params.lang} />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <p>The requested service was not found.</p>
          </div>
        </main>
        <Footer lang={params.lang} />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen">
      <Header lang={params.lang} />
      <ServiceDetail 
        lang={params.lang} 
        serviceKey={serviceInfo.key}
        serviceImage={serviceInfo.image}
      />
      <Footer lang={params.lang} />
    </div>
  )
}