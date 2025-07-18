import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { translations } from '@/lib/translations'
import ServiceList from '@/components/ServiceList'

export default function ServicesPage({ params }: { params: { lang: 'en' | 'es' } }) {
  const t = translations[params.lang]
  
  return (
    <div className="min-h-screen">
      <Header lang={params.lang} />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-4">{t.services.title}</h1>
          <p className="text-xl text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            {t.services.subtitle}
          </p>
          
          <ServiceList lang={params.lang} />
        </div>
      </main>
      
      <Footer lang={params.lang} />
    </div>
  )
}