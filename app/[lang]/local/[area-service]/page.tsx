import { Metadata } from 'next'
import RevenueLocalPage from '@/components/RevenueLocalPage'
import { birminghamMetroAreas, localServices, getLocalPageData } from '@/lib/local-pages-data'

export async function generateStaticParams() {
  const langs = ['en', 'es'] as const
  const params: Array<{ lang: string; 'area-service': string }> = []
  
  // Generate all combinations of area-service for both languages
  birminghamMetroAreas.forEach(area => {
    localServices.forEach(service => {
      // English version
      params.push({
        lang: 'en',
        'area-service': `${area.slug}-${service.en.slug}`
      })
      
      // Spanish version
      params.push({
        lang: 'es', 
        'area-service': `${area.slug}-${service.es.slug}`
      })
    })
  })
  
  return params
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es'; 'area-service': string }
}): Promise<Metadata> {
  // Parse the compound slug
  const parts = params['area-service'].split('-')
  
  // Find the area (first part)
  const areaSlug = parts[0]
  const area = birminghamMetroAreas.find(a => a.slug === areaSlug)
  
  if (!area) {
    return {
      title: 'Local Service Not Found',
      description: 'The requested local service was not found.'
    }
  }
  
  // Find the service (remaining parts joined)
  const serviceSlug = parts.slice(1).join('-')
  const service = localServices.find(s => 
    params.lang === 'en' ? s.en.slug === serviceSlug : s.es.slug === serviceSlug
  )
  
  if (!service) {
    return {
      title: 'Local Service Not Found',
      description: 'The requested local service was not found.'
    }
  }
  
  const currentService = params.lang === 'en' ? service.en : service.es
  
  const title = params.lang === 'en'
    ? `${currentService.name} in ${area.name} AL | Local HVAC Experts | 205-835-0111`
    : `${currentService.name} Local en ${area.name} AL | Expertos HVAC | 205-835-0111`
    
  const description = params.lang === 'en'
    ? `Local ${currentService.name.toLowerCase()} specialists in ${area.name} Alabama. Same-day service, 15+ years experience. Call 205-835-0111 now.`
    : `Especialistas locales en ${currentService.name.toLowerCase()} en ${area.name} Alabama. Servicio el mismo día, 15+ años experiencia. Llame 205-835-0111.`
  
  const keywords = params.lang === 'en'
    ? `local ${currentService.name.toLowerCase()}, ${area.name} HVAC, Birmingham HVAC, ${area.zipCodes.join(', ')}, local HVAC contractors`
    : `${currentService.name.toLowerCase()} local, HVAC ${area.name}, HVAC Birmingham, ${area.zipCodes.join(', ')}, contratistas HVAC locales`

  return {
    title,
    description,
    keywords,
    alternates: {
      languages: {
        'en': `/en/local/${area.slug}-${service.en.slug}`,
        'es': `/es/local/${area.slug}-${service.es.slug}`,
      }
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.hvac35242.com/${params.lang}/local/${params['area-service']}`,
      siteName: 'Birmingham HVAC Experts',
      locale: params.lang === 'en' ? 'en_US' : 'es_ES'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  }
}

export default function LocalServicePage({ 
  params 
}: { 
  params: { lang: 'en' | 'es'; 'area-service': string } 
}) {
  // Parse the compound slug
  const parts = params['area-service'].split('-')
  const areaSlug = parts[0]
  const serviceSlug = parts.slice(1).join('-')
  
  // Get the local page data
  const pageData = getLocalPageData(areaSlug, serviceSlug, params.lang)
  
  if (!pageData) {
    return (
      <div className="min-h-screen">
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {params.lang === 'en' ? 'Local Service Not Found' : 'Servicio Local No Encontrado'}
            </h1>
            <p className="text-lg text-gray-600">
              {params.lang === 'en' 
                ? 'The requested local service was not found.' 
                : 'El servicio local solicitado no fue encontrado.'
              }
            </p>
            <div className="mt-8">
              <a 
                href={`/${params.lang}/`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {params.lang === 'en' ? 'Return Home' : 'Volver al Inicio'}
              </a>
            </div>
          </div>
        </main>
      </div>
    )
  }
  
  return (
    <RevenueLocalPage 
      area={pageData.area}
      service={pageData.service}
      lang={pageData.lang}
    />
  )
}