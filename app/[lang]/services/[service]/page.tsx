import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceDetail from '@/components/ServiceDetail'
import { translations } from '@/lib/translations'

const serviceData = {
  'same-day-hvac-repair': {
    key: 'sameDayRepair',
    image: '/images/ac-repair.jpg'
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
  
  return {
    title: `${serviceName} | Birmingham HVAC`,
    description: `Professional ${serviceName} services in Birmingham, AL. 24/7 emergency response, licensed technicians, transparent pricing. Call 205-830-1111.`,
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