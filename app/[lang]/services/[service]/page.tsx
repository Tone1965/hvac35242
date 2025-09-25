import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceDetail from '@/components/ServiceDetail'
import { translations } from '@/lib/translations'

const serviceData = {
  'ac-repair': {
    key: 'acRepair',
    image: '/images/ac-repair.jpg'
  },
  'heating-repair': {
    key: 'heatingRepair',
    image: '/images/heating.jpg'
  },
  'ac-installation': {
    key: 'acInstallation',
    image: '/images/ac-unit.jpg'
  },
  'hvac-maintenance': {
    key: 'maintenance',
    image: '/images/maintenance.jpg'
  },
  'ductwork-repair': {
    key: 'ductwork',
    image: '/images/ductwork.jpg'
  },
  'heat-pump-services': {
    key: 'heatPump',
    image: '/images/heat-pump.jpg'
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
    'ac-repair': 'AC Repair Birmingham AL | Professional Air Conditioning Service',
    'heating-repair': 'Heating Repair Birmingham AL | Furnace & Heat Pump Service',
    'ac-installation': 'AC Installation Birmingham AL | New Air Conditioning Systems',
    'hvac-maintenance': 'HVAC Maintenance Birmingham AL | Preventive AC & Heating Service',
    'ductwork-repair': 'Ductwork Repair Birmingham AL | Air Duct Service & Replacement',
    'heat-pump-services': 'Heat Pump Service Birmingham AL | Installation & Repair'
  }
  
  const seoDescriptions: { [key: string]: string } = {
    'ac-repair': 'Professional AC repair in Birmingham, Alabama. Expert air conditioning service with licensed technicians. Call 205-835-0111 for fast service.',
    'heating-repair': 'Heating repair in Birmingham, AL. Professional furnace and heat pump repair service. Call 205-835-0111 for expert technicians.',
    'ac-installation': 'AC installation in Birmingham, Alabama. New air conditioning system installation by certified professionals. Call 205-835-0111.',
    'hvac-maintenance': 'HVAC maintenance in Birmingham, AL. Preventive AC and heating service to keep your system running efficiently. Call 205-835-0111.',
    'ductwork-repair': 'Ductwork repair in Birmingham, Alabama. Professional air duct service, repair, and replacement. Call 205-835-0111.',
    'heat-pump-services': 'Heat pump service in Birmingham, AL. Expert heat pump installation, repair, and maintenance. Call 205-835-0111.'
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