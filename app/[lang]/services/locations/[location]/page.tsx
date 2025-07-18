import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LocationServicePage from '@/components/LocationServicePage'

const locations = [
  { slug: 'pelham', name: 'Pelham' },
  { slug: 'hoover', name: 'Hoover' },
  { slug: 'homewood', name: 'Homewood' },
  { slug: 'mountain-brook', name: 'Mountain Brook' },
  { slug: 'river-chase', name: 'River Chase' },
  { slug: 'htw-280-corridor', name: 'HWY 280 Corridor' },
  { slug: 'hwy-280-corridor', name: 'HWY 280 Corridor' },
  { slug: 'valleydale', name: 'Valleydale' },
  { slug: 'hwy-119', name: 'Hwy 119' }
]

export async function generateStaticParams() {
  const langs = ['en', 'es']
  
  return langs.flatMap(lang => 
    locations.map(location => ({
      lang,
      location: location.slug
    }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es', location: string }
}): Promise<Metadata> {
  const locationData = locations.find(l => l.slug === params.location)
  const locationName = locationData?.name || params.location
  
  const title = params.lang === 'en' 
    ? `Emergency HVAC Repair ${locationName} AL | Birmingham AC & Heating Contractors`
    : `Reparación HVAC de Emergencia ${locationName} AL | Contratistas AC y Calefacción Birmingham`
    
  const description = params.lang === 'en'
    ? `Emergency HVAC repair in ${locationName}, Alabama. Licensed Birmingham contractors provide same-day AC & heating service, 24/7 emergency repairs. Call 205-835-0111 for immediate service.`
    : `Reparación HVAC de emergencia en ${locationName}, Alabama. Contratistas licenciados de Birmingham proporcionan servicio AC y calefacción el mismo día, reparaciones de emergencia 24/7. Llame 205-835-0111 para servicio inmediato.`
  
  return {
    title,
    description,
    alternates: {
      languages: {
        'en': `/en/services/locations/${params.location}`,
        'es': `/es/services/locations/${params.location}`,
      }
    }
  }
}

export default function LocationPage({ 
  params 
}: { 
  params: { lang: 'en' | 'es', location: string } 
}) {
  const locationData = locations.find(l => l.slug === params.location)
  
  if (!locationData) {
    return (
      <div className="min-h-screen">
        <Header lang={params.lang} />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Location Not Found</h1>
            <p>The requested location was not found.</p>
          </div>
        </main>
        <Footer lang={params.lang} />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen">
      <Header lang={params.lang} />
      <LocationServicePage 
        lang={params.lang} 
        location={locationData.name}
      />
      <Footer lang={params.lang} />
    </div>
  )
}