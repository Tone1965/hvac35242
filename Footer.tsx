import { translations } from '@/lib/translations'
import Link from 'next/link'

const locations = [
  'Pelham',
  'Hoover', 
  'Homewood',
  'Mountain Brook',
  'River Chase',
  'HWY 280 Corridor',
  'Valleydale',
  'Hwy 119'
]

export default function Footer({ lang }: { lang: 'en' | 'es' }) {
  const t = translations[lang]
  
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Birmingham HVAC</h3>
            <p className="text-slate-300">
              {lang === 'en' 
                ? 'Professional HVAC service you can trust.'
                : 'Servicio HVAC profesional en el que puede confiar.'}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t.nav.services}</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href={`/${lang}/services`} className="hover:text-white transition-colors">
                  {lang === 'en' ? 'All Services' : 'Todos los Servicios'}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t.locations.title}</h4>
            <ul className="space-y-2 text-slate-300">
              {locations.slice(0, 4).map((location) => (
                <li key={location}>
                  <Link 
                    href={`/${lang}/services/locations/${location.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-white transition-colors"
                  >
                    {location}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t.contact.title}</h4>
            <p className="text-slate-300">
              {t.contact.callNow}
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-400">
          <p>&copy; 2024 Birmingham HVAC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}