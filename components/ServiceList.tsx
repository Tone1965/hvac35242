import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { translations } from '@/lib/translations'
import { 
  Clock, Shield, Award, ThermometerSun, 
  Snowflake, Building2, DollarSign, Timer, Phone
} from 'lucide-react'

const services = [
  { 
    icon: Clock, 
    key: 'sameDayRepair',
    image: '/images/ac-repair.jpg',
    slug: 'same-day-hvac-repair'
  },
  { 
    icon: Shield, 
    key: 'weekendService',
    image: '/images/hvac-tech.jpg',
    slug: 'weekend-emergency-service'
  },
  { 
    icon: Award, 
    key: 'holidayResponse',
    image: '/images/emergency-service.jpg',
    slug: 'holiday-hvac-emergency'
  },
  { 
    icon: Timer, 
    key: 'nightCalls',
    image: '/images/ac-unit.jpg',
    slug: 'night-emergency-hvac'
  },
  { 
    icon: ThermometerSun, 
    key: 'acHeatwave',
    image: '/images/ac-repair.jpg',
    slug: 'emergency-ac-heatwave'
  },
  { 
    icon: Snowflake, 
    key: 'heatingWinter',
    image: '/images/hvac-tech.jpg',
    slug: 'emergency-heating-winter'
  },
  { 
    icon: Building2, 
    key: 'commercial',
    image: '/images/ac-unit.jpg',
    slug: 'commercial-emergency-hvac'
  },
  { 
    icon: DollarSign, 
    key: 'pricing',
    image: '/images/emergency-service.jpg',
    slug: 'emergency-pricing-transparency'
  },
  { 
    icon: Timer, 
    key: 'guarantees',
    image: '/images/hvac-hero.jpg',
    slug: 'response-time-guarantees'
  }
]

export default function ServiceList({ lang }: { lang: 'en' | 'es' }) {
  const t = translations[lang]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map(({ icon: Icon, key, image, slug }) => (
        <div key={key} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-48">
            <Image
              src={image}
              alt={t.services[key as keyof typeof t.services].title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Icon className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">
                {t.services[key as keyof typeof t.services].title}
              </h3>
            </div>
            
            <p className="text-slate-600 mb-6">
              {t.services[key as keyof typeof t.services].desc}
            </p>
            
            <Link href={`/${lang}/services/${slug}`}>
              <Button className="w-full">
                {lang === 'en' ? 'Learn More' : 'Más Información'}
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}