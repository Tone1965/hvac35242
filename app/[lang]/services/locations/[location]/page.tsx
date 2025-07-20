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
  { slug: 'hwy-119', name: 'Hwy 119' },
  { slug: 'vestavia-hills', name: 'Vestavia Hills' },
  { slug: 'alabaster', name: 'Alabaster' },
  { slug: 'bessemer', name: 'Bessemer' },
  { slug: 'birmingham', name: 'Birmingham' },
  { slug: 'chelsea', name: 'Chelsea' },
  { slug: 'columbiana', name: 'Columbiana' },
  { slug: 'helena', name: 'Helena' },
  { slug: 'english-village', name: 'English Village' },
  { slug: 'cahaba-heights', name: 'Cahaba Heights' },
  { slug: 'trussville', name: 'Trussville' },
  { slug: 'irondale', name: 'Irondale' },
  { slug: 'springville', name: 'Springville' },
  { slug: 'gardendale', name: 'Gardendale' },
  { slug: 'fultondale', name: 'Fultondale' },
  { slug: 'clay', name: 'Clay' },
  // SET 1: Middle-Tier Locations
  { slug: 'pinson', name: 'Pinson' },
  { slug: 'center-point', name: 'Center Point' },
  { slug: 'warrior', name: 'Warrior' },
  { slug: 'hueytown', name: 'Hueytown' },
  { slug: 'leeds', name: 'Leeds' },
  { slug: 'moody', name: 'Moody' },
  { slug: 'odenville', name: 'Odenville' },
  { slug: 'riverside', name: 'Riverside' },
  // SET 2: Extended Locations
  { slug: 'kimberly', name: 'Kimberly' },
  { slug: 'locust-fork', name: 'Locust Fork' },
  { slug: 'blountsville', name: 'Blountsville' },
  { slug: 'cleveland', name: 'Cleveland' },
  { slug: 'steele', name: 'Steele' },
  { slug: 'ashville', name: 'Ashville' },
  { slug: 'riverchase', name: 'Riverchase' },
  { slug: 'bessemer-west', name: 'Bessemer West' },
  // SET 3: Extended Birmingham Areas
  { slug: 'forestdale', name: 'Forestdale' },
  { slug: 'west-end', name: 'West End' },
  { slug: 'north-birmingham', name: 'North Birmingham' },
  { slug: 'east-birmingham', name: 'East Birmingham' },
  { slug: 'smithfield', name: 'Smithfield' },
  { slug: 'ensley', name: 'Ensley' },
  { slug: 'fairfield', name: 'Fairfield' },
  { slug: 'wylam', name: 'Wylam' },
  // SET 4: Final Coverage Areas
  { slug: 'tarrant', name: 'Tarrant' },
  { slug: 'center-point-south', name: 'Center Point South' },
  { slug: 'homewood-south', name: 'Homewood South' },
  { slug: 'homewood-west', name: 'Homewood West' },
  { slug: 'forestdale-north', name: 'Forestdale North' },
  { slug: 'eastwood', name: 'Eastwood' },
  { slug: 'fultondale-south', name: 'Fultondale South' },
  { slug: 'clay-north', name: 'Clay North' }
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
  
  // For new locations not yet in static generation, use the slug as name
  const locationName = locationData?.name || params.location
  
  if (!locationData) {
    // Create temporary location data for new locations
    const tempLocationData = { slug: params.location, name: locationName }
    return (
      <div className="min-h-screen">
        <Header lang={params.lang} />
        <LocationServicePage 
          lang={params.lang} 
          location={tempLocationData.name}
        />
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