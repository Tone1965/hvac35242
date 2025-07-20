import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LocationServicePage from '@/components/LocationServicePage'

export async function generateStaticParams() {
  const langs = ['en', 'es']
  
  return langs.map(lang => ({
    lang
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es' }
}): Promise<Metadata> {
  const locationName = 'Alabaster'
  
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
        'en': '/en/services/locations/alabaster',
        'es': '/es/services/locations/alabaster',
      }
    }
  }
}

export default function AlabasterLocationPage({ 
  params 
}: { 
  params: { lang: 'en' | 'es' } 
}) {
  const locationName = 'Alabaster'
  
  return (
    <div className="min-h-screen">
      <Header lang={params.lang} />
      <LocationServicePage 
        lang={params.lang} 
        location={locationName}
      />
      <Footer lang={params.lang} />
    </div>
  )
}