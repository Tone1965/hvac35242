import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LocationServicePage from '@/components/LocationServicePage'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export async function generateMetadata({ params }: { params: { lang: 'en' | 'es' } }): Promise<Metadata> {
  const isSpanish = params.lang === 'es'
  
  return {
    title: isSpanish 
      ? 'Reparación de AC en Birmingham AL | Servicio el Mismo Día | 205-835-0111'
      : 'AC Repair in Birmingham AL | Same Day Service | 205-835-0111',
    description: isSpanish
      ? 'Reparación profesional de aire acondicionado en Birmingham Alabama. 15+ años de experiencia, calificación A+ BBB.'
      : 'Professional AC repair in Birmingham Alabama. 15+ years experience, A+ BBB rated. Call 205-835-0111 for same-day service.',
    keywords: isSpanish
      ? 'reparación AC Birmingham, reparación aire acondicionado Birmingham AL, reparación HVAC Birmingham'
      : 'AC repair Birmingham, air conditioning repair Birmingham AL, HVAC repair Birmingham',
  }
}

export default function BirminghamACRepairPage({ params }: { params: { lang: 'en' | 'es' } }) {
  return (
    <div className="min-h-screen">
      <Header lang={params.lang} />
      <LocationServicePage 
        lang={params.lang} 
        location="Birmingham"
      />
      <Footer lang={params.lang} />
    </div>
  )
}