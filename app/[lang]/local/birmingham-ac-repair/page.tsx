import { Metadata } from 'next'
import LocalPage from '@/components/LocalPage'

// Single test page data
const testArea = {
  name: 'Birmingham',
  slug: 'birmingham',
  zipCodes: ['35203', '35204', '35205', '35206', '35207', '35208', '35210', '35211', '35212', '35213', '35214', '35215', '35217', '35218', '35221', '35222', '35224', '35226', '35228', '35233', '35234', '35235', '35236', '35237', '35238'],
  landmarks: ['Downtown Birmingham', 'UAB Hospital', 'Railroad Park', 'Birmingham Civil Rights Institute', 'Vulcan Park'],
  description: 'Alabama\'s largest city with diverse neighborhoods and urban amenities'
}

const testService = {
  en: { name: 'AC Repair', slug: 'ac-repair' },
  es: { name: 'Reparación de Aire Acondicionado', slug: 'reparacion-aire-acondicionado' }
}

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'es' }
  ]
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es' }
}): Promise<Metadata> {
  const currentService = params.lang === 'en' ? testService.en : testService.es
  
  const title = params.lang === 'en'
    ? `${currentService.name} in ${testArea.name} AL | Local HVAC Experts | 205-835-0111`
    : `${currentService.name} Local en ${testArea.name} AL | Expertos HVAC | 205-835-0111`
    
  const description = params.lang === 'en'
    ? `Local ${currentService.name.toLowerCase()} specialists in ${testArea.name} Alabama. Same-day service, 15+ years experience. Call 205-835-0111 now.`
    : `Especialistas locales en ${currentService.name.toLowerCase()} en ${testArea.name} Alabama. Servicio el mismo día, 15+ años experiencia. Llame 205-835-0111.`

  return {
    title,
    description,
    keywords: params.lang === 'en'
      ? `local AC repair, Birmingham HVAC, Birmingham AC repair, ${testArea.zipCodes.join(', ')}, local HVAC contractors`
      : `reparación aire acondicionado local, HVAC Birmingham, reparación AC Birmingham, ${testArea.zipCodes.join(', ')}, contratistas HVAC locales`,
    alternates: {
      languages: {
        'en': '/en/local/birmingham-ac-repair',
        'es': '/es/local/birmingham-reparacion-aire-acondicionado',
      }
    }
  }
}

export default function BirminghamACRepairLocalPage({ 
  params 
}: { 
  params: { lang: 'en' | 'es' } 
}) {
  return (
    <LocalPage 
      area={testArea}
      service={testService}
      lang={params.lang}
    />
  )
}