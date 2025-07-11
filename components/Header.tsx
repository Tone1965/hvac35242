'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { translations } from '@/lib/translations'
import { Phone } from 'lucide-react'

export default function Header({ lang }: { lang: 'en' | 'es' }) {
  const pathname = usePathname()
  const t = translations[lang]
  
  const switchLang = lang === 'en' ? 'es' : 'en'
  const newPath = pathname.replace(`/${lang}`, `/${switchLang}`)
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href={`/${lang}`} className="text-2xl font-bold text-primary">
              Birmingham HVAC
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href={`/${lang}`} className="text-sm font-medium hover:text-primary transition-colors">
                {t.nav.home}
              </Link>
              <Link href={`/${lang}/services`} className="text-sm font-medium hover:text-primary transition-colors">
                {t.nav.services}
              </Link>
              <Link href={`/${lang}/contact`} className="text-sm font-medium hover:text-primary transition-colors">
                {t.nav.contact}
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center text-sm font-medium text-destructive">
              <Phone className="w-4 h-4 mr-1" />
              {t.nav.emergency}
            </div>
            
            <Link href={newPath}>
              <Button variant="outline" size="sm">
                {lang === 'en' ? 'ES' : 'EN'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}